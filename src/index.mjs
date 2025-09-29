import dictionary from "./dictionary/en/en.json" with { type: "json" };
import core from "./core.js";

const { createWordLib } = core;
const api = createWordLib(dictionary);

export default api;
export const { exists, random } = api;
