import { launch } from 'puppeteer';

export async function POST({ request }) {
    try {
        const { html, css } = await request.json();
        const browser = await launch({ headless: true });
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 1024 });

        // Set HTML content
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Add CSS
        await page.addStyleTag({ content: css });

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        return new Response(pdfBuffer, {
            headers: { 'Content-Type': 'application/pdf' }
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new Response('Error generating PDF', { status: 500 });
    }
}
