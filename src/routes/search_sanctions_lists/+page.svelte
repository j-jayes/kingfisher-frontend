<script>
	import Navbar from '$lib/Navbar.svelte';
	import SanctionsSearch from '$lib/SanctionsSearch.svelte';
	import SanctionsTable from '$lib/SanctionsTable.svelte';
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';
	import ErrorAlert from '$lib/ErrorAlert.svelte';

	let currentDate = new Date().toLocaleString();
	let name = '';
	let threshold = 80; // Default value
	let results = [];
	let loading = false;
	let errorMessage = '';
	let searchInitiated = false; // New state variable to track if a search has been initiated
	let comments = ''; // to bind to the textarea

	const sanctionsListLinks = {
		US: 'https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists',
		UK: 'https://docs.fcdo.gov.uk/docs/UK-Sanctions-List.html'
		// Add more in the future as needed, like:
		// 'CA': 'https://example.com/canada-list',
		// 'EU': 'https://example.com/eu-list',
		// ... and so on.
	};

	function generateCode() {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}

	function autoExpand(element) {
		element.style.height = 'auto';
		element.style.height = element.scrollHeight + 'px';
	}

	async function searchSanctions() {
		loading = true;
		searchInitiated = true; // Mark that a search has been initiated
		errorMessage = ''; // Clear any previous error message

		try {
			const res = await fetch(
				`https://fastapi-project-njro5od4ga-nw.a.run.app/search_sanctions_lists/?name=${name}&threshold=${threshold}`
			);

			if (!res.ok) {
				throw new Error('Failed to fetch from API');
			}

			const data = await res.json();
			// @ts-ignore
			results = data.local_search_results.map((item) => ({
				...item,
				code: generateCode(),
				isConcerning: false
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	}

	function toggleConcern(index) {
		results[index].isConcerning = !results[index].isConcerning;
	}

	function reorderRows() {
		results = results.sort((a, b) => (b.isConcerning ? 1 : 0) - (a.isConcerning ? 1 : 0));
	}

    function handleInputChange(event) {
        ({ name, threshold } = event.detail);
    }

    function handleSearch() {
        searchSanctions();  // assuming searchSanctions is the function to initiate the search
    }
</script>

<Navbar />
<div class="container mt-5">
	<div class="row">
		<div class="col-md-4 bg-light sidebar p-3">
            <SanctionsSearch on:input={handleInputChange} on:search={handleSearch} />
			{#if loading}
				<LoadingSpinner />
			{/if}
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

			<!-- Error Message -->
			{#if errorMessage}
				<ErrorAlert {errorMessage} />
			{/if}

			{#if !loading}
				{#if results.length}
					<SanctionsTable {results} {sanctionsListLinks} {toggleConcern} {reorderRows} />
				{:else if searchInitiated}
					<!-- Display "No Results" message only if a search has been initiated -->
					<div class="alert alert-info" role="alert">No results.</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
