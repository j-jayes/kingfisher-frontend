<script>
	import Navbar from '$lib/Navbar.svelte';
	import { goto } from '$app/navigation';
</script>

<Navbar />

<section class="hero d-flex align-items-center" style="background-image: url('/hero.png');">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8 text-center">
				<h1 class="display-3 text-white mb-4">Welcome to Alcedo</h1>
				<p class="lead text-white">Your premier financial screening tool.</p>

				<div class="cta mt-5">
					<button class="btn btn-lg btn-light mr-3" on:click={() => goto('/search_web')}
						>Web Search</button
					>
					<button class="btn btn-lg btn-dark" on:click={() => goto('/search_sanctions_lists')}
						>Sanctions List Search</button
					>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.btn-light:hover {
		background-color: #fda085 !important;
		color: white !important;
	}

	.btn-dark:hover {
		background-color: #343a40 !important; 
		color: white !important;
	}
</style>
