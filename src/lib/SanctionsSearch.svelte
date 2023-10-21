<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let name = '';
	let threshold = 80;

	function handleInput() {
		dispatch('input', { name, threshold });
	}
</script>

<div class="mb-3">
	<label for="nameInput" class="form-label">Search Name:</label>
	<input
		type="text"
		bind:value={name}
		on:input={handleInput}
		class="form-control"
		id="nameInput"
		placeholder="Enter name..."
	/>
</div>

<div class="mb-3">
	<label for="thresholdSlider" class="form-label">Similarity Threshold ({threshold}%)</label>
	<input
		type="range"
		bind:value={threshold}
		on:input={handleInput}
		min="0"
		max="100"
		class="form-control-range"
		id="thresholdSlider"
	/>
</div>

<button on:click={() => dispatch('search')} class="btn btn-primary mb-3">Search</button>
