

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.2b26bdbe.js","_app/immutable/chunks/index.06e021cd.js"];
export const stylesheets = ["_app/immutable/assets/0.2f5401b6.css"];
export const fonts = [];
