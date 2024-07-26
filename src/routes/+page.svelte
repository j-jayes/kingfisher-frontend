<script>
	import Navbar from '$lib/Navbar.svelte';
	import { goto } from '$app/navigation';
</script>

<Navbar />

<section class="hero">
	<div class="overlay" />
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8 text-center">
				<h1 class="display-3 text-white mb-4">Welcome to Alcedo</h1>
				<p class="lead text-white mb-5">Don't get stuck in the reeds.</p>

				<div class="cta mt-5">
					<button class="btn btn-lg btn-light mr-3" on:click={() => goto('/search_web')}
						>Web Search</button
					>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		position: relative;
		height: 100vh;
		background: url('/hero.png') center center/cover no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: white;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}

	.container {
		position: relative;
		z-index: 2;
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	p.lead {
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}

	.cta {
		margin-top: 2rem;
	}

	.btn {
		transition: all 0.3s ease;

		&:hover {
			background-color: #fda085 !important;
			color: white !important;
			transform: scale(1.05);
		}
	}
</style>
