

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9b293363.js","_app/immutable/chunks/index.06e021cd.js","_app/immutable/chunks/stores.107e3193.js","_app/immutable/chunks/singletons.ab1e5780.js"];
export const stylesheets = [];
export const fonts = [];
