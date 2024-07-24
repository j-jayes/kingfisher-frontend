<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
	}
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="/" on:click|preventDefault={() => goto('/')}>
		<img src="/favicon/favicon.ico" alt="Logo" id="logo" />
	</a>
	<button class="navbar-toggler" type="button" on:click={toggleNav} aria-label="Toggle navigation">
		<span class="navbar-toggler-icon" />
	</button>
	<div
		class={isNavOpen ? 'navbar-collapse collapse show' : 'navbar-collapse collapse'}
		id="navbarNav"
	>
		<ul class="navbar-nav">
			{#each [{ path: '/', label: 'Home' }, { path: '/search_web', label: 'Search Web' }] as { path, label }}
				<li class="nav-item {$page.path === path ? 'active' : ''}">
					<a class="nav-link" href={path} on:click|preventDefault={() => goto(path)}>{label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	#logo {
		height: 50px;
		width: 50px;
	}
	.navbar-nav .nav-link:hover {
		color: var(--bs-primary) !important;
	}
	.navbar-nav .active .nav-link {
		color: var(--bs-primary) !important;
	}
	@media (max-width: 991px) {
		#navbarNav {
			margin-left: 1rem;
		}
		.navbar-toggler {
			margin-right: 1rem;
		}
	}
</style>
