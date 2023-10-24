<script>
    import SanctionsTableRow from './SanctionsTableRow.svelte';
    export let results;
    export let sanctionsListLinks;
    export let toggleConcern;
    export let reorderRows;
</script>

<div class="mb-2 d-flex justify-content-between">
    <button class="btn btn-outline-info" on:click={reorderRows}>Reorder Rows</button>
</div>


<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Entity Type</th>
            <th>Sanctions List</th>
            <th>Date of Birth</th>
            <th>Country</th>
            <th>Similarity</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each results as result, index}
            <SanctionsTableRow {result} {sanctionsListLinks} {index} {toggleConcern} />
        {/each}
    </tbody>
</table>
