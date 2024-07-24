import { c as create_ssr_component, b as subscribe, e as escape, h as null_to_empty, g as each, f as add_attribute } from "./index.js";
import { p as page } from "./stores.js";
const Navbar_svelte_svelte_type_style_lang = "";
const css = {
  code: "#logo.svelte-bs4hwx.svelte-bs4hwx{height:50px;width:50px}.navbar-nav.svelte-bs4hwx .nav-link.svelte-bs4hwx:hover{color:var(--bs-primary) !important}.navbar-nav.svelte-bs4hwx .active .nav-link.svelte-bs4hwx{color:var(--bs-primary) !important}@media(max-width: 991px){#navbarNav.svelte-bs4hwx.svelte-bs4hwx{margin-left:1rem}.navbar-toggler.svelte-bs4hwx.svelte-bs4hwx{margin-right:1rem}}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<nav class="navbar navbar-expand-lg navbar-light bg-light"><a class="navbar-brand" href="/"><img src="/favicon/favicon.ico" alt="Logo" id="logo" class="svelte-bs4hwx"></a>
	<button class="navbar-toggler svelte-bs4hwx" type="button" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
	<div class="${escape(
    null_to_empty("navbar-collapse collapse"),
    true
  ) + " svelte-bs4hwx"}" id="navbarNav"><ul class="navbar-nav svelte-bs4hwx">${each([{ path: "/", label: "Home" }, { path: "/search_web", label: "Search Web" }], ({ path, label }) => {
    return `<li class="${"nav-item " + escape($page.path === path ? "active" : "", true)}"><a class="nav-link svelte-bs4hwx"${add_attribute("href", path, 0)}>${escape(label)}</a>
				</li>`;
  })}</ul></div>
</nav>`;
});
export {
  Navbar as N
};
