/** Fills `{name}` slots in a dictionary string: `fill("{n} of {total}", { n: 1, total: 3 })` is "1 of 3". */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (slot, name: string) => (name in values ? String(values[name]) : slot));
}

/** Escapes text for the few places that build markup as a string (the hero phone's session screen). */
export function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}
