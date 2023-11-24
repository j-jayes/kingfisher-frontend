<script>
	export let result;
	export let index;
	export let toggleConcern;
	export let getColor;
</script>

<div class={`card mb-3 ${result.isConcerning ? 'bg-danger text-white' : ''}`}>
	<div class="card-body position-relative">
		<span class="text-secondary">{result.idCode}</span>
		<h5 class="card-title">{result.title}</h5>
		<a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>
		<p class="card-text mt-2">{result.snippet}</p>
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

<style>
    .card {
        page-break-inside: avoid;
    }
</style>