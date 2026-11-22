/**
 * dslLoader.js
 *
 * Loads the DSL device definition from data/device_example.txt using
 * Vite's ?raw static import. No async fetch needed — the file content
 * is inlined at build time and parsed synchronously.
 */

import rawDsl from '../../data/device_example.txt?raw'

/**
 * Parse and return the full DSL device object.
 * @returns {Object} The parsed device DSL definition.
 */
export function loadDsl() {
  return JSON.parse(rawDsl)
}

/**
 * Pre-parsed DSL data — ready to import directly in any component.
 * @type {Object}
 */
export const dslData = loadDsl()
