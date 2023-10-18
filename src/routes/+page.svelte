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

<div class="container mt-4">
    <!-- Updated Search Bar -->
    <input 
        type="text" 
        bind:value={searchQuery} 
        placeholder="Search input here" 
        on:input={fetchResults} 
        on:focus={handleFocus} 
        class="form-control mb-4"
        style="color: {searchQuery === 'name here' ? 'grey' : 'black'}"
    >
    <!-- Main Content Area -->
    <div class="row">
        <!-- Results Window -->
        <div class="col-md-8 mb-4">
            <div class="results-window card card-body">
                {#if searchResults.organic_results.length}
                    {#each searchResults.organic_results as result}
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-2">
                                    <img src={result.thumbnail} class="card-img" alt={result.title}>
                                </div>
                                <div class="col-md-10">
                                    <div class="card-body">
                                        <h5 class="card-title"><a href={result.link} target="_blank">{result.title}</a></h5>
                                        <p class="card-text">{result.snippet}</p>
                                        <button class="btn btn-success mr-2" on:click={() => handleRelevance(result)}>Confirm Relevance</button>
                                        <button class="btn btn-warning" on:click={() => handleIrrelevance(result)}>Mark Irrelevant</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p>No results found.</p>
                {/if}
            </div>
        </div>

        <!-- Sidebar for parameters -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Parameters</h3>

                    <!-- Jaro Winkler Distance Slider -->
                    <div class="form-group">
                        <label for="jaro">Jaro Winkler Distance: {jaroWinklerDistance}</label>
                        <input id="jaro" type="range" min="0" max="100" bind:value={jaroWinklerDistance} on:input={fetchResults} class="form-control-range">
                    </div>

                    <!-- Modifiers Checkboxes -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="fraud" bind:checked={modifiers.fraud} on:change={fetchResults}>
                        <label class="form-check-label" for="fraud">Fraud</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="moneyLaundering" bind:checked={modifiers.moneyLaundering} on:change={fetchResults}>
                        <label class="form-check-label" for="moneyLaundering">Money Laundering</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="crime" bind:checked={modifiers.crime} on:change={fetchResults}>
                        <label class="form-check-label" for="crime">Crime</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>