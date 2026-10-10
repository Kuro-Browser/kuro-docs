export const SIDEBAR_KEY = "kuro-docs-sidebar";

/** Collapse or expand the desktop sidebar, persist the choice, and keep keyboard focus on a visible control. */
export function setSidebarCollapsed(collapsed: boolean) {
  const root = document.documentElement;
  if (collapsed) root.dataset.sidebar = "collapsed";
  else delete root.dataset.sidebar;

  try {
    if (collapsed) localStorage.setItem(SIDEBAR_KEY, "collapsed");
    else localStorage.removeItem(SIDEBAR_KEY);
  } catch {
    /* storage unavailable: applies for this page view only */
  }

  const target = document.getElementById(collapsed ? "sidebar-open" : "sidebar-collapse");
  target?.focus();
}
