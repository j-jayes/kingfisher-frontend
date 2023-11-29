<script>
	export let result;
	export let sanctionsListLinks;
	export let index;
	export let toggleConcern;
</script>

<tr class={result.isConcerning ? 'border-danger-row' : ''}>
	<td>{result.code}</td>
	<td>{result.entity_name}</td>
	<td>{result.search_term}</td>
	<td>{result.entity_type}</td>
	<td>
		{#if sanctionsListLinks[result.sanctions_list]}
			<a href={sanctionsListLinks[result.sanctions_list]} target="_blank" rel="noopener noreferrer"
				>{result.sanctions_list}</a
			>
		{:else}
			{result.sanctions_list}
		{/if}
	</td>
	<td>{result.year_of_birth}</td>
	<td>{result.country_of_birth}</td>
	<td>{result.similarity}%</td>
	<td>
		<button class="btn btn-outline-secondary btn-sm" on:click={() => toggleConcern(index)}>
			{result.isConcerning ? 'Mark Normal' : 'Mark Concerning'}
		</button>
	</td>
</tr>

<!-- style the table rows to avoid breaking e.gc. page-break-inside: avoid; -->

<style>
	tr {
		page-break-inside: avoid;
	}
	.border-danger-row {
		border: 3px solid #dc3545; /* Bootstrap's danger color */
	}
</style>
