import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import { N as Navbar } from "../../chunks/Navbar.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".hero.svelte-1vnz0wn{position:relative;height:100vh;background:url('/hero.png') center center/cover no-repeat;display:flex;align-items:center;justify-content:center;text-align:center;color:white}.overlay.svelte-1vnz0wn{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0, 0, 0, 0.5)}.container.svelte-1vnz0wn{position:relative;z-index:2}h1.svelte-1vnz0wn{font-size:3rem;font-weight:700;margin-bottom:1rem}p.lead.svelte-1vnz0wn{font-size:1.5rem;margin-bottom:2rem}.cta.svelte-1vnz0wn{margin-top:2rem}.btn.svelte-1vnz0wn{transition:all 0.3s ease;&:hover {\n			background-color: #fda085 !important;\n			color: white !important;\n			transform: scale(1.05);\n		}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<section class="hero svelte-1vnz0wn"><div class="overlay svelte-1vnz0wn"></div>
	<div class="container svelte-1vnz0wn"><div class="row justify-content-center"><div class="col-md-8 text-center"><h1 class="display-3 text-white mb-4 svelte-1vnz0wn">Welcome to Alcedo</h1>
				<p class="lead text-white mb-5 svelte-1vnz0wn">Don&#39;t get stuck in the reeds.</p>

				<div class="cta mt-5 svelte-1vnz0wn"><button class="btn btn-lg btn-light mr-3 svelte-1vnz0wn">Web Search</button></div></div></div></div>
</section>`;
});
export {
  Page as default
};
