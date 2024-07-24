

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.593b4bd9.js","_app/immutable/chunks/index.cd1be5bc.js","_app/immutable/chunks/Navbar.59975d7c.js","_app/immutable/chunks/stores.faf25cf7.js","_app/immutable/chunks/singletons.cb8332b0.js"];
export const stylesheets = ["_app/immutable/assets/Navbar.cc457698.css"];
export const fonts = [];
