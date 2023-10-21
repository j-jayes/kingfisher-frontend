<script>
	export let comments;
	export let autoExpand;
</script>

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
