<script>
  import Navbar from '$lib/Navbar.svelte';    
  import { goto } from '$app/navigation';
</script>

<Navbar />

<div class="landing-container container-fluid bg-gradient text-center py-5">
<div class="header my-5">
  <div class="alcedo-label bg-primary text-white p-3 mb-4 d-inline-block rounded shadow-sm">
    <h1 class="display-3 m-0">Welcome to Alcedo!</h1>
  </div>
  <p class="lead">Your premier financial screening tool.</p>
</div>

<div class="cta my-5">
  <button class="btn btn-lg btn-success" on:click={() => goto('/search_web')}>Get Started with Web Search</button>
  <button class="btn btn-lg btn-dark" on:click={() => goto('/search_sanctions_lists')}>Get Started with Sanctions List Search</button>
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

  .alcedo-label {
    border-radius: 0.75rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>

