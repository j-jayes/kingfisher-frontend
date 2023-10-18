<!-- Header using Bootstrap styling -->
<div class="jumbotron jumbotron-fluid bg-primary text-white">
    <div class="container">
        <h1 class="display-4">Welcome to Alcedo KYC</h1>
        <p class="lead">The leading know your customer tool</p>
    </div>
</div>

<!-- Scripts -->
<script context="module">
    export const prerender = true;

    let searchQuery = "";
    let results = []; 
    let jaroWinklerDistance = 75; 
    let wildcard = "";
    let modifiers = {
        financialCrimes: false,
        regulatoryBodies: false,
        lawsAndActs: false,
    };

    function handleFocus() {
        if (searchQuery === "Search input here") {
            searchQuery = "";
        }
    }

    // Fetch the results (a dummy function for now)
    function fetchResults() {
        // Fetch logic here
        results = ["Example Result 1", "Example Result 2"];
    }


    function handleRelevance(result) {
        console.log(`${result.title} is relevant.`);
    }

    function handleIrrelevance(result) {
        console.log(`${result.title} is irrelevant.`);
    }

    let searchResults = {
        "organic_results": [
            {
         "position":1,
         "title":"Bernie Madoff",
         "link":"https://en.wikipedia.org/wiki/Bernie_Madoff",
         "thumbnail":"https://serpapi.com/searches/65008d8d0f9866489c895f70/images/86349b443bf26950aec05738679b6dcddc8c43b7321cf2213ee57bfdc6f0dae8.jpeg",
         "snippet":"Bernard Lawrence Madoff was an American fraudster and financier who was the mastermind of the largest Ponzi scheme in history, worth about $64.8 billion."
      },
      {
         "position":2,
         "title":"Bernie Madoff: Who He Was, How His Ponzi Scheme ...",
         "link":"https://www.investopedia.com/terms/b/bernard-madoff.asp",
         "thumbnail":"https://serpapi.com/searches/65008d8d0f9866489c895f70/images/86349b443bf26950aec05738679b6dcde07c3bdb5c803f3e61be9f6d4c12e8cd.jpeg",
         "snippet":"Bernard Lawrence \"Bernie\" Madoff was an American financier who executed the largest Ponzi scheme in history, defrauding thousands of investors out of tens ..."
      },
      {
         "position":3,
         "title":"'He's a financial serial killer': how Bernie Madoff became ...",
         "link":"https://www.theguardian.com/tv-and-radio/2023/jan/04/netflix-bernie-madoff-monster-of-wall-street",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13--Agn588J_QafBUX4_fn4C1ttCHnKoqV_TSWrC670es-G67aXgT&usqp=CAE&s",
         "snippet":"“Bernie Madoff is largely responsible for legitimising that market, the electronic exchange, that today Google, Microsoft, Apple are part of."
      },
      {
         "position":4,
         "title":"Madoff investment scandal",
         "link":"https://en.wikipedia.org/wiki/Madoff_investment_scandal",
         "thumbnail":"https://serpapi.com/searches/65008d8d0f9866489c895f70/images/86349b443bf26950aec05738679b6dcd855c10ee6dfe98bb8abd6d7a4a7a9d96.png",
         "snippet":"In December of that year, Bernie Madoff, the former Nasdaq chairman and founder of the Wall Street firm Bernard L. Madoff Investment Securities LLC, admitted ..."
      },
      {
         "position":5,
         "title":"Bernie Madoff | Biography, Ponzi Scheme, & Facts",
         "link":"https://www.britannica.com/biography/Bernie-Madoff",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDxxYD26l3A27l98YRoBKMwPwTK-cIY0Hw8zO2jIZruvHrw4946qA&usqp=CAE&s",
         "snippet":"Bernie Madoff was an American hedge-fund investment manager and former chairman of the NASDAQ stock market. He was best known for operating history's ..."
      },
      {
         "position":6,
         "title":"Bernie Madoff, Architect of Largest Ponzi Scheme in ...",
         "link":"https://www.nytimes.com/2021/04/14/business/bernie-madoff-dead.html",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSmslTZts11RvK25xWBI2VmTqq8BPPSQZF9y_2rMeNA93seNCZwvST&usqp=CAE&s",
         "snippet":"Bernard Madoff, Architect of Largest Ponzi Scheme in History, Is Dead at 82 ... His enormous fraud left behind a devastating human toll and paper ..."
      },
      {
         "position":7,
         "title":"Watch MADOFF: The Monster of Wall Street - Netflix",
         "link":"https://www.netflix.com/title/81466159",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU5pfhpiIOPcvFXUpgYXjczFdTYJ_N1aB8X5YnvsJ9YTbvI2iaJ2Wc&usqp=CAE&s",
         "snippet":"This docuseries follows the rise and fall of financier Bernie Madoff, who orchestrated one of the biggest Ponzi schemes in Wall Street history."
      },
      {
         "position":8,
         "title":"Bernie Madoff dies: Mastermind of the nation's biggest ...",
         "link":"https://www.cnbc.com/2021/04/14/bernie-madoff-dies-mastermind-of-the-nations-biggest-investment-fraud-was-82.html",
         "thumbnail":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe1kvjB7c2uT1fUI-pYxr4dOsxkNxUvgxke3YVLgChlz0oHhJk0cFg&usqp=CAE&s",
         "snippet":"Bernard Madoff, mastermind of the biggest investment fraud in U.S. history, ripping off tens of thousands of clients of as much as $65 billion, ..."
      }
        ]
    }
</script>

<!-- Styles -->
<style>
    .results-window {
        height: 800px;
        overflow-y: auto;
    }
</style>

<!-- Main content -->
<div class="container mt-4">
    <!-- Search Bar -->
    <input 
        type="text" 
        bind:value={searchQuery} 
        placeholder="Search input here" 
        on:input={fetchResults} 
        on:focus={handleFocus} 
        class="form-control mb-4"
        style="color: {searchQuery === 'name here' ? 'grey' : 'black'}"
    >

    <!-- Results and Parameters Area -->
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
                                        <h5 class="card-title">
                                            <a href={result.link} target="_blank">{result.title}</a>
                                        </h5>
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

        <!-- Parameters Sidebar -->
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
                    <h5>Areas of interest</h5>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="financialCrimes" bind:checked={modifiers.financialCrimes} on:change={fetchResults}>
                        <label class="form-check-label" for="financialCrimes">Financial Crimes</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="regulatoryBodies" bind:checked={modifiers.regulatoryBodies} on:change={fetchResults}>
                        <label class="form-check-label" for="regulatoryBodies">Regulatory Bodies</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="lawsAndActs" bind:checked={modifiers.lawsAndActs} on:change={fetchResults}>
                        <label class="form-check-label" for="lawsAndActs">Laws and Acts</label>
                    </div>

                        <!-- Wildcard Modifier -->
                    <div class="form-group mt-3">
                        <label for="wildcardModifier">Wildcard Modifier</label>
                        <input type="text" class="form-control" id="wildcardModifier" bind:value={wildcard} placeholder="Enter wildcard">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<br>

<h3> What are the different areas of interest? </h3>

<!-- Terms Section at the bottom -->
<div class="container mt-5">
    <div class="row">
        <!-- Types of Financial Crimes -->
        <div class="col-md-4">
            <h5>Types of Financial Crimes:</h5>
            <ul>
                <li>Tax evasion</li>
                <li>Insider trading</li>
                <li>Bribery</li>
                <li>Embezzlement</li>
                <li>Ponzi schemes</li>
                <li>False accounting</li>
                <li>Credit card fraud</li>
                <li>Identity theft</li>
                <li>Securities fraud</li>
                <li>Market manipulation</li>
            </ul>
        </div>

        <!-- Regulatory Bodies & Entities -->
        <div class="col-md-4">
            <h5>Regulatory Bodies & Entities:</h5>
            <ul>
                <li>Her Majesty's Revenue and Customs (HMRC) – for tax-related crimes</li>
                <li>Serious Fraud Office (SFO)</li>
                <li>The City of London Police's Economic Crime Directorate</li>
                <li>The National Crime Agency (NCA) – especially their Economic Crime Command</li>
            </ul>
        </div>

        <!-- Laws & Acts -->
        <div class="col-md-4">
            <h5>Laws & Acts:</h5>
            <ul>
                <li>Fraud Act 2006</li>
                <li>Proceeds of Crime Act 2002</li>
                <li>Bribery Act 2010</li>
                <li>Money Laundering Regulations 2007 & 2017</li>
                <li>Financial Services and Markets Act 2000</li>
                <li>Company Directors Disqualification Act 1986</li>
                <li>Companies Act 2006 – especially for matters like directorial responsibilities and duties</li>
                <li>Insider Dealing (Criminal Sanctions) Regulations</li>
                <li>Market Abuse Regulation (MAR) – particularly for EU-related matters up to the end of the transition period</li>
            </ul>
        </div>
    </div>
</div>