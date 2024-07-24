

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search_web/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.90a90094.js","_app/immutable/chunks/index.cd1be5bc.js","_app/immutable/chunks/Navbar.59975d7c.js","_app/immutable/chunks/stores.faf25cf7.js","_app/immutable/chunks/singletons.cb8332b0.js"];
export const stylesheets = ["_app/immutable/assets/4.4d18b5be.css","_app/immutable/assets/Navbar.cc457698.css"];
export const fonts = [];
