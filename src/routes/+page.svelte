
<script>
    import Navbar from '$lib/Navbar.svelte';    
    import { goto } from '$app/navigation';
</script>

<Navbar />

<div class="landing-container container-fluid bg-gradient text-center py-5">
  <div class="header my-5">
    <h1 class="display-3">Welcome to Alcedo!</h1>
    <p class="lead">Your premier financial screening tool.</p>
  </div>
  <div class="features my-5">
    <h2 class="display-5">Key Features</h2>
    <ul class="list-unstyled mt-4">
      <li class="h4 mb-3">User-Friendly Interface</li>
      <li class="h4 mb-3">Comprehensive Sanction Checks</li>
      <li class="h4 mb-3">News Insights</li>
      <li class="h4 mb-3">Efficient Reporting</li>
      <li class="h4 mb-3">Secure Storage</li>
    </ul>
  </div>
  <div class="cta my-5">
    <button class="btn btn-lg btn-success" on:click={() => goto('/search')}>Get Started</button>
  </div>
</div>

<style lang="scss">
  .bg-gradient {
    background: linear-gradient(120deg, #f6d365, #fda085);
  }

  button.btn:hover {
    background-color: #fda085 !important;
    color: white !important;
  }
</style>
