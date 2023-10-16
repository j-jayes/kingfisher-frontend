<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="/" on:click|preventDefault={() => goto('/')}>
		<img src="/favicon/favicon.ico" alt="Logo" id="logo" />
	</a>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			{#each [{path: '/', label: 'Home'}, {path: '/search', label: 'Search'}, {path: '/about', label: 'About'}, {path: '/contact', label: 'Contact'}] as {path, label}}
				<li class="nav-item {($page.path === path) ? 'active' : ''}">
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
</style>
