/**
 * Open a URL in a named tab. If a tab with that name already exists,
 * the browser will reuse and focus it instead of opening a duplicate.
 *
 * Note: programmatic focus across tabs is restricted by browsers; calling
 * window.open with the same `name` reliably reuses the same tab/window.
 */
export const openNamedTab = (url: string, name: string) => {
  const win = window.open(url, name);
  if (win) {
    try {
      win.focus();
    } catch {
      /* cross-origin focus may fail silently */
    }
  }
};

/** Stable tab name for a given route/slug. */
export const tabName = (key: string) => `nnnow:${key}`;
