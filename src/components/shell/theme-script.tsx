/**
 * Runs synchronously in <head>, before first paint, so the page never flashes the wrong
 * theme. It also restores the collapsed-sidebar preference for the same reason.
 * Keep the storage keys in sync with lib/theme.ts and lib/sidebar.ts.
 */
const script = `(function(){var d=document.documentElement,p='system',s='';try{p=localStorage.getItem('kuro-docs-theme')||'system';s=localStorage.getItem('kuro-docs-sidebar')||''}catch(e){}if(p!=='light'&&p!=='dark')p='system';var t=p==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;d.dataset.theme=t;d.dataset.themePref=p;if(s==='collapsed')d.dataset.sidebar='collapsed'})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
