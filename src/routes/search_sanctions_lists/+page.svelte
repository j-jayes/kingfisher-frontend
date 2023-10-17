<script>
    import { onMount } from 'svelte';
    import Navbar from '$lib/Navbar.svelte';

    let currentDate = new Date().toLocaleString();
    let name = '';
    let threshold = 85; // Default value
    // @ts-ignore
    let results = [];
    let loading = false;
    let errorMessage = '';
    let searchInitiated = false;  // New state variable to track if a search has been initiated
    let comments = ''; // to bind to the textarea

    const sanctionsListLinks = {
        'US': 'https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists',
        'UK': 'https://docs.fcdo.gov.uk/docs/UK-Sanctions-List.html',
        // Add more in the future as needed, like:
        // 'CA': 'https://example.com/canada-list',
        // 'EU': 'https://example.com/eu-list',
        // ... and so on.
    };

    function generateCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function autoExpand(element) {
        element.style.height = 'auto';
        element.style.height = (element.scrollHeight) + 'px';
    }

  
    async function searchSanctions() {
        loading = true;
        searchInitiated = true;  // Mark that a search has been initiated
        errorMessage = '';  // Clear any previous error message

        try {
            const res = await fetch(`https://fastapi-project-njro5od4ga-nw.a.run.app/search_sanctions_lists/?name=${name}&threshold=${threshold}`);

            if (!res.ok) {
                throw new Error('Failed to fetch from API');
            }

            const data = await res.json();
            // @ts-ignore
            results = data.local_search_results.map(item => ({
                ...item,
                code: generateCode(),
                isConcerning: false
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            errorMessage = error.message;
        } finally {
            loading = false;
        }
    }

    function toggleConcern(index) {
        results[index].isConcerning = !results[index].isConcerning;
    }

    function reorderRows() {
        results = results.sort((a, b) => (b.isConcerning ? 1 : 0) - (a.isConcerning ? 1 : 0));
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
        
            <!-- Comments Textbox -->
            <div class="mb-3">
                <label for="analystComments" class="form-label">Analyst Comments:</label>
                <textarea id="analystComments" bind:value={comments} on:input={(e) => autoExpand(e.target)} class="form-control" rows="2" placeholder="Enter your comments here..."></textarea>
            </div>
        
            <!-- Error Message -->
            {#if errorMessage}
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            {/if}

            {#if !loading}
                {#if results.length}
                    <div class="mb-2 d-flex justify-content-between">
                        <button class="btn btn-outline-info" on:click={reorderRows}>Reorder Rows</button>
                    <!--  <button class="btn btn-outline-success" on:click={downloadPDF}>Download results to PDF</button> -->
                    </div>

                    <!-- Display Results in a Table format -->
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Sanction Regime</th>
                                <th>Sanctions List</th>
                                <th>Date of Birth</th>
                                <th>Country</th>
                                <th>Similarity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each results as result, index}
                                <tr class="{result.isConcerning ? 'table-danger' : ''}">
                                    <td>{result.code}</td>
                                    <td>{result.full_name}</td>
                                    <td>{result.sanction_regime}</td>
                                    <td>
                                        {#if sanctionsListLinks[result.sanctions_list]}
                                            <a href={sanctionsListLinks[result.sanctions_list]} target="_blank" rel="noopener noreferrer">{result.sanctions_list}</a>
                                        {:else}
                                            {result.sanctions_list}
                                        {/if}
                                    </td>
                                    <td>{result.year_of_birth}</td>
                                    <td>{result.country_of_birth}</td>
                                    <td>{result.similarity}%</td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm" on:click={() => toggleConcern(index)}>
                                            {result.isConcerning ? 'Mark Normal' : 'Mark Concerning'}
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {:else if searchInitiated} 
            <!-- Display "No Results" message only if a search has been initiated -->
                    <div class="alert alert-info" role="alert">
                        No results.
                    </div>
                {/if}
            {/if}
        </div>
    </div>
</div>
