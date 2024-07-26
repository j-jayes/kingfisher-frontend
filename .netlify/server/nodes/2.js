

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.fc8016ab.js","_app/immutable/chunks/index.06e021cd.js","_app/immutable/chunks/Navbar.3e60906d.js","_app/immutable/chunks/stores.107e3193.js","_app/immutable/chunks/singletons.ab1e5780.js"];
export const stylesheets = ["_app/immutable/assets/2.3992b10a.css","_app/immutable/assets/Navbar.cc457698.css"];
export const fonts = [];
