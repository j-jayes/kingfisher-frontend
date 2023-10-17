<script>
	import { onMount } from 'svelte';
    import Navbar from '$lib/Navbar.svelte';

	let name = '';
	let modifier = '';
	let additional_search_terms = '';
	let results = [];
	let loading = false;
    let comments = ''; // to bind to the textarea
    let currentDate = new Date().toLocaleString();

	let modifiers = [
		{ label: 'Fraud', value: 'fraud', checked: false },
		{ label: 'Crime', value: 'crime', checked: false },
		{ label: 'FCA', value: 'FCA', checked: false },
		{ label: 'SEC', value: 'SEC', checked: false },
		{ label: 'Money-laundering', value: 'money-laundering', checked: false },
		{ label: 'Terrorist', value: 'terrorist', checked: false },
		{ label: 'Corruption', value: 'corruption', checked: false },
		{ label: 'PEP', value: 'Politically Exposed Person', checked: false },
		{ label: 'Prosecution', value: 'prosecution', checked: false },
		{ label: 'Penalty', value: 'penalty', checked: false }
		// ... (continue in this manner for all the modifiers)
	];

	async function fetchData() {
		loading = true;

		// Collect selected modifiers
		let selectedModifiers = modifiers.filter((m) => m.checked).map((m) => m.value);
		let modifierQuery = selectedModifiers.join(',');

		try {
			// Construct the fetch URL using the updated modifierQuery
            const url = `https://fastapi-project-njro5od4ga-nw.a.run.app/search_web?name=${name}${
                modifierQuery ? '&modifier=' + modifierQuery : ''
            }&additional_info=${additional_search_terms}`;

			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				results = data.results;

                // Add a random ID code to each result
                results.forEach(result => {
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
        element.style.height = (element.scrollHeight) + 'px';
    }

	function getColor(engine) {
		switch (engine) {
			case 'bing':
				return 'bg-primary';
			case 'yahoo':
				return 'bg-success';
			case 'duckduckgo':
				return 'bg-warning';
			case 'google':
				return 'bg-danger';
			default:
				return 'bg-secondary';
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
</script>

<Navbar />

<div class="container mt-5">
	<div class="row">
		<!-- Sidebar for inputs -->
		<div class="col-md-4">
			<div class="mb-3">
				<label for="nameInput" class="form-label">Search Name:</label>
				<input
					type="text"
					bind:value={name}
					class="form-control"
					id="nameInput"
					placeholder="Enter name..."
				/>
			</div>
            <!-- Modifier Checkboxes -->
            <div class="mb-3">
                <label class="form-label">Modifiers:</label>
                {#each modifiers as modifier (modifier.value)} <!-- using modifier.value as key -->
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            bind:checked={modifier.checked}
                            id="{modifier.value}" 
                        />
                        <label class="form-check-label" for="{modifier.value}"> <!-- and here -->
                            {modifier.label}
                        </label>
                    </div>
                {/each}
            </div>

			<div class="mb-3">
				<label for="additionalSearchTermsInput" class="form-label">Additional Search Terms:</label>
				<input
					type="text"
					bind:value={additional_search_terms}
					class="form-control"
					id="additionalSearchTermsInput"
					placeholder="Enter additional search terms..."
				/>
			</div>

			<div>
				<button class="btn btn-primary" on:click={fetchData}>Search</button>
				<button on:click={reorderRows} class="btn btn-secondary">Reorder Cards</button>
			</div>

			{#if loading}
				<div class="mt-3 d-flex justify-content-center">
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Results -->
		<div class="col-md-8">
            <!-- Date and Time Marker -->
            <div class="mb-3">
                <strong>Date & Time:</strong> {currentDate}
            </div>
        
            <!-- Comments Textbox -->
            <div class="mb-3">
                <label for="analystComments" class="form-label">Analyst Comments:</label>
                <textarea id="analystComments" bind:value={comments} on:input={(e) => autoExpand(e.target)} class="form-control" rows="2" placeholder="Enter your comments here..."></textarea>
            </div>
			{#each results as result, index (result.link)}
				<div class={`card mb-3 ${result.isConcerning ? 'bg-danger text-white' : ''}`}>
					<div class="card-body position-relative">
                        <span class="text-secondary">{result.idCode}</span>
						<h5 class="card-title">{result.title}</h5>
						<a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>
						<p class="card-text mt-2">{result.snippet}</p>

						<!-- Mark Concerning Button in Bottom Right -->
						<button
							on:click={() => toggleConcern(index)}
							class={`btn btn-sm btn-secondary position-absolute bottom-0 end-0 mb-2 me-2 ${
								result.isConcerning ? 'btn-light' : ''
							}`}
						>
							{result.isConcerning ? 'Mark Normal' : 'Mark Concerning'}
						</button>
					</div>
					<div class="card-footer bg-light">
						{#each result.search_engines as engine}
							<span class={`badge ${getColor(engine)} me-1 mb-1`}>{engine}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
