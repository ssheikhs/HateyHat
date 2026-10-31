// Runs before React hydrates so the saved theme is applied without a flash
const script = `(function(){try{var t=localStorage.getItem("hateyhat-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"hateyhat-dark":"hateyhat"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","hateyhat")}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
