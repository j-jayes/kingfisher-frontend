

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.cd2cb3d3.js","_app/immutable/chunks/index.cd1be5bc.js"];
export const stylesheets = ["_app/immutable/assets/0.2f5401b6.css"];
export const fonts = [];