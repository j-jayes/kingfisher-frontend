<script>
	import { onMount } from 'svelte';
	import Navbar from '$lib/Navbar.svelte';
	import SearchInput from '$lib/SearchInput.svelte';
	import ResultsList from '$lib/ResultsList.svelte';
	import PDFDownloadButton from '$lib/PDFDownloadButton.svelte';

	let name = '';
	let additional_search_terms = '';
	let results = [];
	let loading = false;
	let comments = '';
	let currentDate = new Date().toLocaleString();
	let pdfContainer;
	let loadingPDF = false;
	let queryString = '';

	let queryString = '';

	async function fetchData() {
		loading = true;

		try {
			// Construct the fetch URL using the updated modifierQuery
			const encodedName = encodeURIComponent(`"${name}"`); // Enclose name in quotes and encode
			const encodedAdditionalInfo = encodeURIComponent(additional_search_terms); // Encode additional info
			const queryString = `name=${encodedName}&additional_info=${encodedAdditionalInfo}`;
			const url = `https://fastapi-project-njro5od4ga-nw.a.run.app/search_web?${queryString}`;

			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				results = data.results;

				// Add a random ID code to each result
				results.forEach((result) => {
					result.idCode = generateCode();
				});
			} else {
				console.error('Failed to fetch data:', await response.text());
			}
		} catch (err) {
			console.error('Error fetching data:', err);
		} finally {
			loading = false;
		}
	}

	function autoExpand(element) {
		element.style.height = 'auto';
		element.style.height = element.scrollHeight + 'px';
	}

	function getColor(engine) {
		switch (engine) {
			case 'bing':
				return 'border-primary text-primary';
			case 'yahoo':
				return 'border-success text-success';
			case 'duckduckgo':
				return 'border-warning text-warning';
			case 'google':
				return 'border-danger text-danger';
			default:
				return 'border-secondary text-secondary';
		}
	}

	function generateCode() {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	function toggleConcern(index) {
		results[index].isConcerning = !results[index].isConcerning;
	}

	function reorderRows() {
		results = results.sort((a, b) => (b.isConcerning ? 1 : 0) - (a.isConcerning ? 1 : 0));
	}

	function handleInputChange(event) {
		name = event.detail.name;
		additional_search_terms = event.detail.additional_search_terms;
	}
</script>

<Navbar />

<div class="container mt-5">
	<div class="row">
		<div class="col-md-4">
			<SearchInput
				{name}
				{modifiers}
				{additional_search_terms}
				{fetchData}
				{reorderRows}
				{loading}
				on:inputChange={handleInputChange}
			/>
			<PDFDownloadButton {pdfContainer} {queryString} {comments} />
		</div>
		<div class="col-md-8">
			<!-- Comments Textbox -->
			<div class="mb-3">
				<label for="analystComments" class="form-label">Analyst Comments:</label>
				<textarea
					id="analystComments"
					bind:value={comments}
					on:input={(e) => autoExpand(e.target)}
					class="form-control"
					rows="2"
					placeholder="Enter your comments here..."
				/>
			</div>
			<div bind:this={pdfContainer}>
				<ResultsList {results} {toggleConcern} {getColor} />
			</div>
		</div>
	</div>
</div>
