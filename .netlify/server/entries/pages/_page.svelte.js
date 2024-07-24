import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import { N as Navbar } from "../../chunks/Navbar.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".hero.svelte-ncueqy{height:100vh;background-size:cover;background-position:center;background-repeat:no-repeat}.btn-light.svelte-ncueqy:hover{background-color:#fda085 !important;color:white !important}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<section class="hero d-flex align-items-center svelte-ncueqy" style="background-image: url('/hero.png');"><div class="container"><div class="row justify-content-center"><div class="col-md-8 text-center"><h1 class="display-3 text-white mb-4">Welcome to Alcedo</h1>
				<p class="lead text-white">Don&#39;t get stuck in the reeds.</p>

				<div class="cta mt-5"><button class="btn btn-lg btn-light mr-3 svelte-ncueqy">Web Search</button></div></div></div></div>
</section>`;
});
export {
  Page as default
};
