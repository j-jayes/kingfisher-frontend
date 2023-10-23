<script>
	import { onMount } from 'svelte';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';

	export let pdfContainer;
	export let loadingPDF;
	export let queryString; // Accept the queryString prop

	async function downloadPDF() {
		loadingPDF = true; // set to true at the beginning of the function
		if (!pdfContainer) {
			console.error('pdfContainer is not defined');
			return;
		}

		const pdf = new jsPDF('p', 'mm', 'a4');
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = pdf.internal.pageSize.getHeight();
		const marginLeft = 10;
		const marginRight = 10;
		const marginTop = 10;
		const marginBottom = 10;
		const contentWidth = pdfWidth - marginLeft - marginRight;
		const contentHeight = pdfHeight - marginTop - marginBottom;
		let remainingSpaceOnPage = contentHeight;
		let currentPosition = marginTop;

		// Get the current date and time
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

		// Draw the date and time at the top of the PDF
		pdf.text(`Date: ${dateStr}, Time: ${timeStr}`, marginLeft, currentPosition);

		// Update the remaining space on the page and the current position
		remainingSpaceOnPage -= 10; // Assume a line height of 10mm for the text
		currentPosition += 10;

		let queryParamsText = `Search Query:\n${queryString.replace(/&/g, '\n').replace(/=/g, ': ')}`;

		// Set a different font size and style for the query parameters
		pdf.setFontSize(12);
		pdf.setFont('helvetica', 'italic');

		// Draw the query parameters below the date and time
		pdf.text(queryParamsText, marginLeft, currentPosition);

		// Reset the font size and style to default for the rest of the content
		pdf.setFontSize(12);
		pdf.setFont('helvetica', 'normal');

		// Update the remaining space on the page and the current position
		// Assume a line height of 10mm for the text and add extra space for the line breaks in queryParamsText
		const lineBreaks = (queryParamsText.match(/\n/g) || []).length;
		remainingSpaceOnPage -= 10 + lineBreaks * 5;
		currentPosition += 10 + lineBreaks * 5;

		try {
			let currentPageNumber = 1; // Track the current page number

			for (let card of pdfContainer.children) {
				if (currentPageNumber > 3) {
					// Stop adding more content after the third page
					break;
				}

				const canvas = await html2canvas(card);
				const aspectRatio = canvas.width / canvas.height;
				const cardHeightInPDF = contentWidth / aspectRatio;

				if (cardHeightInPDF <= remainingSpaceOnPage) {
					pdf.addImage(
						canvas.toDataURL('image/png', 0.7),
						'PNG',
						marginLeft,
						currentPosition,
						contentWidth,
						cardHeightInPDF
					);
					remainingSpaceOnPage -= cardHeightInPDF;
					currentPosition += cardHeightInPDF;
				} else {
					if (currentPageNumber < 3) {
						// Only add a new page if we are not already on the third page
						pdf.addPage();
						currentPageNumber++; // Increment the page number
						remainingSpaceOnPage = contentHeight;
						currentPosition = marginTop;

						pdf.addImage(
							canvas.toDataURL('image/png', 0.7),
							'PNG',
							marginLeft,
							currentPosition,
							contentWidth,
							cardHeightInPDF
						);

						remainingSpaceOnPage -= cardHeightInPDF;
						currentPosition += cardHeightInPDF;
					} else {
						// We are on the third page and do not have enough space for this card,
						// so we stop adding more content.
						break;
					}
				}
			}

			const filename = `Alcedo-${queryString}.pdf`;

			pdf.save(filename);
		} catch (error) {
			console.error('Error generating PDF:', error);
		} finally {
			loadingPDF = false; // set to false at the end of the function
		}
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
