<script>
    import { onMount } from 'svelte';
    import Navbar from '$lib/Navbar.svelte';

    let currentDate = new Date().toLocaleString();
  
    let name = '';
    let threshold = 85; // Default value
    let results = [];
    let loading = false;
    let errorMessage = '';
  
    async function searchSanctions() {
      loading = true;
      errorMessage = '';  // Clear any previous error message
  
      try {
          const res = await fetch(`https://fastapi-project-njro5od4ga-nw.a.run.app/search_sanctions_lists/?name=${name}&threshold=${threshold}`);
          
          if (!res.ok) {
              throw new Error('Failed to fetch from API');
          }
  
          const data = await res.json();
          results = data.local_search_results;
      } catch (error) {
          console.error("Error fetching data:", error);
          errorMessage = error.message;
      } finally {
          loading = false;
      }
    }

    // This will be invoked when the "mark irrelevant" button is clicked
    function markIrrelevant(index) {
        results[index].isIrrelevant = true;
    }

    function reorderCards() {
        results = [...results].sort((a, b) => (a.isIrrelevant ? 1 : 0) - (b.isIrrelevant ? 1 : 0));
    }

  
    onMount(() => {
      // If you want to do something on component mount.
    });
</script>

<Navbar />
  
<div class="container mt-5">
    <div class="row">
        <!-- Sidebar for inputs -->
        <div class="col-md-4">
            <div class="mb-3">
                <label for="nameInput" class="form-label">Search Name:</label>
                <input type="text" bind:value={name} class="form-control" id="nameInput" placeholder="Enter name...">
            </div>
        
            <div class="mb-3">
                <label for="thresholdSlider" class="form-label">Similarity Threshold ({threshold}%)</label>
                <input type="range" bind:value={threshold} min="0" max="100" class="form-control-range" id="thresholdSlider">
            </div>
        
            <button on:click={searchSanctions} class="btn btn-primary mb-3">Search</button>
        
            <!-- Loading Spinner -->
            {#if loading}
                <div class="mt-3 d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Main content area -->
        <div class="col-md-8">
                <!-- Date and Time Marker -->
            <div class="mb-3">
                <strong>Date & Time:</strong> {currentDate}
            </div>
            <!-- Error Message -->
            {#if errorMessage}
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            {/if}
        
            {#if !loading && results.length}
            <div class="mb-2 d-flex justify-content-between">
                <button class="btn btn-outline-info" on:click={reorderCards}>Reorder Cards</button>
                <button class="btn btn-outline-success" on:click={downloadPDF}>Download results to PDF</button>
            </div>

            <!-- Display Results -->
                <div class="d-flex flex-wrap">
                    {#each results as result, index}
                        <div class="card m-2 {result.isIrrelevant ? 'bg-light' : ''}" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">{result.full_name}</h5>
                                <p class="card-text">
                                    Sanction Regime: {result.sanction_regime} <br>
                                    Sanctions List: {result.sanctions_list} <br>
                                    Year of Birth: {result.year_of_birth} <br>
                                    Country of Birth: {result.country_of_birth} <br>
                                    Similarity: {result.similarity}%
                                </p>
                                {#if !result.isIrrelevant}
                                    <button class="btn btn-secondary btn-sm" on:click={() => markIrrelevant(index)}>Mark irrelevant</button>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

