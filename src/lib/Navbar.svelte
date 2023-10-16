<script>
	import { goto } from '$app/navigation';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="javascript:void(0)" on:click={() => goto('/')}>
		<img src="/favicon/favicon.ico" alt="Logo" id="logo" />
	</a>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="javascript:void(0)" on:click={() => goto('/')}>Home</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="javascript:void(0)" on:click={() => goto('/search')}>Search</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="javascript:void(0)" on:click={() => goto('/about')}>About</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="javascript:void(0)" on:click={() => goto('/contact')}>Contact</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	#logo {
		height: 50px;
		width: 50px;
	}
</style>
