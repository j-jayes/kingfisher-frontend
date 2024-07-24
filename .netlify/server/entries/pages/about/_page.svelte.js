import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}

<div class="container mt-5"><section><h2>Alcedo: A KYC Tool</h2>
		<p>Don&#39;t get stuck in the reeds
		</p></section></div>`;
});
export {
  Page as default
};
