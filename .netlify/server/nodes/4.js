

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search_web/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.fde8a9e9.js","_app/immutable/chunks/index.06e021cd.js","_app/immutable/chunks/Navbar.3e60906d.js","_app/immutable/chunks/stores.107e3193.js","_app/immutable/chunks/singletons.ab1e5780.js"];
export const stylesheets = ["_app/immutable/assets/4.4d18b5be.css","_app/immutable/assets/Navbar.cc457698.css"];
export const fonts = [];
