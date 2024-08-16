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
				<h1 class="display-3 text-white mb-4">Alcedo KYC<br>(alpha version)</h1>
				<p class="lead text-white mb-5">Don't get stuck in the reeds.</p>
				<p class="lead text-white mb-5">Welcome to Alcedo KYC, an easy way to compile and document your web search across four search engines.</p>
				<p class="lead text-white mb-5">
					Alcedo KYC enables you to concurrently conduct a search across Google, Bing, Yahoo and DuckDuckGo. This mitigates the risk of information gaps in search engine results, as search engines prioritise results differently. Alcedo KYC (alpha version) combines the top 20 results from each search engine, and generates a unique six digit alphanumeric reference for each hit for ease of reference.
					<br /><br />
					The search results can then be downloaded into a PDF that includes a time stamp, analyst comments, and the list of search results in flagged or unflagged status, with accessible URLs. Users can evidence and file open source screening and make compliance management easier.
				</p>

				<div class="cta mt-5">
					<button class="btn btn-lg btn-light mr-3" on:click={() => goto('/search_web')}
						>Please try the free to use Alcedo KYC (alpha version)

						</button
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
		animation: fadeInUp 1s ease-in-out;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
	}

	.container {
		position: relative;
		z-index: 2;
		max-width: 1200px;
		padding: 0 15px;
		margin: auto;
	}

	h1 {
		font-size: 4rem;
		font-weight: 800;
		margin-bottom: 1.5rem;
	}

	p.lead {
		font-size: 1.25rem;
		font-weight: 300;
		margin-bottom: 2rem;
	}

	.cta {
		margin-top: 2rem;
	}

	.btn {
		background-color: #007bff; /* Bootstrap primary color */
		color: white;
		padding: 12px 24px;
		font-size: 1.25rem;
		border-radius: 4px;
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: darken(#007bff, 7.5%); /* Darker on hover */
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
