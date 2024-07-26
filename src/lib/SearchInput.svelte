<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let name;
	export let modifiers;
	export let additional_search_terms;
	export let fetchData;
	export let reorderRows;
	export let loading;

	// Functions to handle input changes
	function handleNameChange(event) {
		name = event.target.value;
		dispatch('inputChange', { name, additional_search_terms });
	}

	function handleAdditionalSearchTermsChange(event) {
		additional_search_terms = event.target.value;
		dispatch('inputChange', { name, additional_search_terms });
	}
</script>

<div class="bg-light sidebar p-3">
    <div class="mb-3">
        <label for="nameInput" class="form-label">Search Name:</label>
        <input
            type="text"
            value={name}
            on:input={handleNameChange}
            class="form-control"
            id="nameInput"
            placeholder="Enter name..."
        />
    </div>
    <div class="mb-3">
        <label for="additionalSearchTermsInput" class="form-label">Additional Search Terms:</label>
        <input
            type="text"
            value={additional_search_terms}
            on:input={handleAdditionalSearchTermsChange}
            class="form-control"
            id="additionalSearchTermsInput"
            placeholder="Enter additional search terms..."
        />
    </div>
	<div>
		<button class="btn btn-primary" on:click={fetchData}>Search</button>
		<button on:click={reorderRows} class="btn btn-secondary">Move red cards to top</button>
	</div>
	{#if loading}
		<div class="mt-3 d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	{/if}
</div>
