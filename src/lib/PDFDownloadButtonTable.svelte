<script>
	import { onMount } from 'svelte';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';

	export let pdfContainer;
	export let loadingPDF;
	export let queryString; // Accept the queryString prop

	async function downloadPDF() {
		const headerContent = formatDateAndQueryString(queryString);
		queryString = sanitizeFilename(queryString);
		loadingPDF = true;

		const pdfContent = `<div class="pdf-header">${headerContent}</div>` + pdfContainer.innerHTML;
		const css = extractCSS();

		const response = await fetch('/generate-pdf', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ html: pdfContent, css })
		});

		// Handle the PDF download
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		// Set the filename using the query string
		const filename = `Alcedo-${queryString}.pdf`; // Ensure queryString is safe to use

		// Create a temporary anchor element for the download
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;

		// Append the anchor to the body, trigger click, and then remove it
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		// Optional: Revoke the blob URL to free up resources
		window.URL.revokeObjectURL(url);

		loadingPDF = false;
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
		return styles;
	}

	function sanitizeFilename(filename) {
		return filename
			.replace(/[/\\?%*:|"<>]/g, '-') // Replacing invalid characters with '-'
			.replace(/(\.\.\/)|(\/\.\.)/g, '') // Removing directory traversal attempts
			.substring(0, 255); // Limiting length to 255 characters
	}

	function formatDateAndQueryString(queryString) {
		// Format the current date and time
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

		// Format the query string
		let queryParamsText = `Search Query:\n${queryString.replace(/&/g, '\n').replace(/=/g, ': ')}`;

		// Return formatted date, time, and query string
		return `Date: ${dateStr}, Time: ${timeStr}<br>${queryParamsText}`;
	}
</script>

<button class="btn btn-primary" on:click={downloadPDF}>Download PDF</button>

<!-- Loading overlay -->
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
