<script>
    import ResultCard from './ResultCard.svelte';
    export let results;
    export let toggleConcern;
    export let getColor;
</script>

{#each results as result, index (result.link)}
    <ResultCard {result} {index} {toggleConcern} {getColor} />
{/each}
