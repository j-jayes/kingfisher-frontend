import { c as create_ssr_component, d as createEventDispatcher, f as add_attribute, e as escape, g as null_to_empty, h as each, v as validate_component } from "../../../chunks/index.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
const SearchInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { name } = $$props;
  let { additional_search_terms } = $$props;
  let { fetchData } = $$props;
  let { reorderRows } = $$props;
  let { loading } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.additional_search_terms === void 0 && $$bindings.additional_search_terms && additional_search_terms !== void 0)
    $$bindings.additional_search_terms(additional_search_terms);
  if ($$props.fetchData === void 0 && $$bindings.fetchData && fetchData !== void 0)
    $$bindings.fetchData(fetchData);
  if ($$props.reorderRows === void 0 && $$bindings.reorderRows && reorderRows !== void 0)
    $$bindings.reorderRows(reorderRows);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  return `<div class="bg-light sidebar p-3"><div class="mb-3"><label for="nameInput" class="form-label">Search Name:</label>
        <input type="text"${add_attribute("value", name, 0)} class="form-control" id="nameInput" placeholder="Enter name..."></div>
    <div class="mb-3"><label for="additionalSearchTermsInput" class="form-label">Additional Search Terms:</label>
        <input type="text"${add_attribute("value", additional_search_terms, 0)} class="form-control" id="additionalSearchTermsInput" placeholder="Enter additional search terms..."></div>
	<div><button class="btn btn-primary">Search</button>
		<button class="btn btn-secondary">Move red cards to top</button></div>
	${loading ? `<div class="mt-3 d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>` : ``}</div>`;
});
const ResultCard_svelte_svelte_type_style_lang = "";
const css = {
  code: ".card.svelte-35y2yo{page-break-inside:avoid}@media print{.card.svelte-35y2yo,.btn.svelte-35y2yo,.table.svelte-35y2yo,.badge.svelte-35y2yo{-webkit-print-color-adjust:exact;color-adjust:exact}.bg-danger.svelte-35y2yo{background-color:#dc3545 !important}.text-white.svelte-35y2yo{color:#fff !important}.bg-light.svelte-35y2yo{background-color:#f8f9fa !important}.btn-secondary.svelte-35y2yo{background-color:#6c757d !important;color:#fff !important}.btn-light.svelte-35y2yo{background-color:#f8f9fa !important;color:#212529 !important}}",
  map: null
};
const ResultCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { result } = $$props;
  let { index } = $$props;
  let { toggleConcern } = $$props;
  let { getColor: getColor2 } = $$props;
  if ($$props.result === void 0 && $$bindings.result && result !== void 0)
    $$bindings.result(result);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.toggleConcern === void 0 && $$bindings.toggleConcern && toggleConcern !== void 0)
    $$bindings.toggleConcern(toggleConcern);
  if ($$props.getColor === void 0 && $$bindings.getColor && getColor2 !== void 0)
    $$bindings.getColor(getColor2);
  $$result.css.add(css);
  return `<div class="${escape(null_to_empty(`card mb-3 ${result.isConcerning ? "border-danger" : ""}`), true) + " svelte-35y2yo"}"><div class="card-body position-relative"><span class="text-secondary">${escape(result.idCode)}</span>
		<h5 class="card-title">${escape(result.title)}</h5>
		<a${add_attribute("href", result.link, 0)} target="_blank" rel="noopener noreferrer">${escape(result.link)}</a>
		<p class="card-text mt-2">${escape(result.snippet)}</p>
		<button class="${escape(null_to_empty(`btn btn-outline-secondary position-absolute bottom-0 end-0 mb-2 me-2 ${result.isConcerning ? "btn-light" : ""}`), true) + " svelte-35y2yo"}">${escape(result.isConcerning ? "Mark Normal" : "Mark Concerning")}</button></div>
	<div class="card-footer bg-light svelte-35y2yo">${each(result.search_engines, (engine) => {
    return `<span class="${escape(null_to_empty(`badge ${getColor2(engine)} me-1 mb-1`), true) + " svelte-35y2yo"}">${escape(engine)}</span>`;
  })}</div>
</div>`;
});
const ResultsList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { results } = $$props;
  let { toggleConcern } = $$props;
  let { getColor: getColor2 } = $$props;
  if ($$props.results === void 0 && $$bindings.results && results !== void 0)
    $$bindings.results(results);
  if ($$props.toggleConcern === void 0 && $$bindings.toggleConcern && toggleConcern !== void 0)
    $$bindings.toggleConcern(toggleConcern);
  if ($$props.getColor === void 0 && $$bindings.getColor && getColor2 !== void 0)
    $$bindings.getColor(getColor2);
  return `${each(results, (result, index) => {
    return `${validate_component(ResultCard, "ResultCard").$$render($$result, { result, index, toggleConcern, getColor: getColor2 }, {}, {})}`;
  })}`;
});
const PDFDownloadButton_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".loading-overlay.svelte-ed392d{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0, 0, 0, 0.5);display:flex;align-items:center;justify-content:center;z-index:1000;visibility:hidden;opacity:0;transition:visibility 0s, opacity 0.5s linear}.loading-overlay.show.svelte-ed392d{visibility:visible;opacity:1}.loading-text.svelte-ed392d{color:#fff;font-size:1.5em;margin-top:10px}",
  map: null
};
const PDFDownloadButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pdfContainer } = $$props;
  let { loadingPDF } = $$props;
  let { queryString: queryString2 } = $$props;
  let { comments } = $$props;
  if ($$props.pdfContainer === void 0 && $$bindings.pdfContainer && pdfContainer !== void 0)
    $$bindings.pdfContainer(pdfContainer);
  if ($$props.loadingPDF === void 0 && $$bindings.loadingPDF && loadingPDF !== void 0)
    $$bindings.loadingPDF(loadingPDF);
  if ($$props.queryString === void 0 && $$bindings.queryString && queryString2 !== void 0)
    $$bindings.queryString(queryString2);
  if ($$props.comments === void 0 && $$bindings.comments && comments !== void 0)
    $$bindings.comments(comments);
  $$result.css.add(css$1);
  return `<button class="btn btn-primary">Download PDF</button>

<div class="${"loading-overlay " + escape(loadingPDF ? "show" : "", true) + " svelte-ed392d"}"><div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>
	<div class="loading-text svelte-ed392d">Preparing PDF...</div>
</div>`;
});
let queryString = "";
function getColor(engine) {
  switch (engine) {
    case "bing":
      return "border-primary text-primary";
    case "yahoo":
      return "border-success text-success";
    case "duckduckgo":
      return "border-warning text-warning";
    case "google":
      return "border-danger text-danger";
    default:
      return "border-secondary text-secondary";
  }
}
function generateCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let additional_search_terms = "";
  let results = [];
  let loading = false;
  let comments = "";
  (/* @__PURE__ */ new Date()).toLocaleString();
  let pdfContainer;
  async function fetchData() {
    loading = true;
    try {
      const encodedName = encodeURIComponent(`"${name}"`);
      const encodedAdditionalInfo = encodeURIComponent(additional_search_terms);
      const queryString2 = `name=${encodedName}&additional_info=${encodedAdditionalInfo}`;
      const url = `https://fastapi-project-njro5od4ga-nw.a.run.app/search_web?${queryString2}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        results = data.results;
        results.forEach((result) => {
          result.idCode = generateCode();
        });
      } else {
        console.error("Failed to fetch data:", await response.text());
      }
    } catch (err) {
      console.error("Error fetching data:", err);
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
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<div class="container mt-5"><div class="row"><div class="col-md-4">${validate_component(SearchInput, "SearchInput").$$render(
    $$result,
    {
      name,
      additional_search_terms,
      fetchData,
      reorderRows,
      loading
    },
    {},
    {}
  )}
			${validate_component(PDFDownloadButton, "PDFDownloadButton").$$render($$result, { pdfContainer, queryString, comments }, {}, {})}</div>
		<div class="col-md-8">
			<div class="mb-3"><label for="analystComments" class="form-label">Analyst Comments:</label>
				<textarea id="analystComments" class="form-control" rows="2" placeholder="Enter your comments here...">${escape("")}</textarea></div>
			<div${add_attribute("this", pdfContainer, 0)}>${validate_component(ResultsList, "ResultsList").$$render($$result, { results, toggleConcern, getColor }, {}, {})}</div></div></div></div>`;
});
export {
  Page as default
};
