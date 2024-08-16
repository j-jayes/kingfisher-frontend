<script>
	export let result;
	export let index;
	export let toggleConcern;
	export let getColor;
</script>

<div class={`card mb-3 ${result.isConcerning ? 'border-danger' : ''}`}>
	<div class="card-body position-relative">
		<span class="text-secondary">{result.idCode}</span>
		<h5 class="card-title">{result.title}</h5>
		<a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>
		<p class="card-text mt-2">{result.snippet}</p>
		<button
			on:click={() => toggleConcern(index)}
			class={`btn btn-outline-secondary position-absolute bottom-0 end-0 mb-2 me-2 ${
				result.isConcerning ? 'btn-light' : ''
			}`}
		>
			{result.isConcerning ? 'Unflag' : 'Flag'}
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

	@media print {
		.card,
		.btn,
		.table,
		.badge {
			-webkit-print-color-adjust: exact;
			color-adjust: exact;
		}

		.bg-danger {
			background-color: #dc3545 !important;
		}

		.text-white {
			color: #fff !important;
		}

		.bg-light {
			background-color: #f8f9fa !important;
		}

		.btn-secondary {
			background-color: #6c757d !important;
			color: #fff !important;
		}

		.btn-light {
			background-color: #f8f9fa !important;
			color: #212529 !important;
		}
		/* Add other colors and styles as needed */
	}
</style>
