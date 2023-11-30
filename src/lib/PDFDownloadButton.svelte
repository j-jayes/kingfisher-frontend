<script>
	export let pdfContainer;
	export let loadingPDF;
	export let queryString; // Accept the queryString prop
	export let comments

	async function downloadPDF() {
		const headerContent = formatDateAndQueryString(queryString);
		queryString = sanitizeFilename(queryString);
		loadingPDF = true;

		const externalStylesheets = [
			'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
			'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
		];

		const pdfContent = `<div class="pdf-header">${headerContent}</div>` + `<div class="comments"><strong>Analyst Comments:</strong> ${comments}</div>` + `<br>` + pdfContainer.innerHTML ;
		const css = extractCSS();

		console.log('css', css)

		try {
			const response = await fetch(
				'https://us-central1-kingfisher-backend.cloudfunctions.net/generatePDF',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ html: pdfContent, css, externalStylesheets })
				}
			);

			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const filename = `Alcedo-${queryString}.pdf`; // Ensure queryString is safe to use

				const a = document.createElement('a');
				a.href = url;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			} else {
				console.error('Error:', await response.text());
			}
		} catch (error) {
			console.error('Error downloading PDF:', error);
		} finally {
			loadingPDF = false;
		}
	}

	function extractCSS() {
		let styles = '';
		for (let sheet of document.styleSheets) {
			try {
				for (let rule of sheet.cssRules) {
					styles += rule.cssText;
				}
			} catch (e) {
				console.warn('Could not access stylesheet: ', sheet.href);
			}
		}
		// Extract inline styles
		document.querySelectorAll('style').forEach((style) => {
			styles += style.innerHTML;
		});
		return styles;
	}

	function sanitizeFilename(filename) {
		return filename
			.replace(/[/\\?%*:|"<>]/g, '-')
			.replace(/(\.\.\/)|(\/\.\.)/g, '')
			.substring(0, 255);
	}

	function formatDateAndQueryString(queryString) {
		const now = new Date();
		const dateStr = now.toLocaleDateString('en-GB', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
		const timeStr = now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
		let queryParamsText = `<strong>Search Query:</strong  >\n${queryString.replace(/&/g, '\n').replace(/=/g, ': ')}`;
		return `<strong>Date:</strong> ${dateStr}, <strong>Time:</strong> ${timeStr}<br>${queryParamsText}`;
	}
</script>

<button class="btn btn-primary" on:click={downloadPDF}>Download PDF</button>

<div class="loading-overlay {loadingPDF ? 'show' : ''}">
	<div class="spinner-border text-light" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
	<div class="loading-text">Preparing PDF...</div>
</div>

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		visibility: hidden;
		opacity: 0;
		transition: visibility 0s, opacity 0.5s linear;
	}

	.loading-overlay.show {
		visibility: visible;
		opacity: 1;
	}

	.loading-text {
		color: #fff;
		font-size: 1.5em;
		margin-top: 10px;
	}
</style>
