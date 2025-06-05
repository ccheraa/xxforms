import { XFNode, XXForms } from "./xxforms";

export default class XXTheme {
  constructor(private forms: XXForms) {}
  lastThemeName = 'skyblue';
  init(name: string, mode: string) {
    if (name) {
      const nameCallback = (nodes: XFNode[]) => {
        const themeName = nodes[0]?.textContent;
        if (themeName && themeName !== this.lastThemeName) {
          document.body.classList.remove(this.lastThemeName);
          document.body.classList.add(themeName);
          this.lastThemeName = themeName;
        }
      }
      const namePath = this.forms.xformsPath(name);
      if (namePath.length === 1) {
        this.forms.track(namePath[0], nameCallback);
      } else {
        this.forms.track(namePath[0], namePath[1], nameCallback);
      }
    }
    if (mode) {
      const modePath = this.forms.xformsPath(mode);
      const modeCallback = (nodes: XFNode[]) => {
        const mode = nodes[0]?.textContent?.toLowerCase();
        document.body.classList.remove('xx-light');
        document.body.classList.remove('xx-dark');
        if (mode === 'dark') {
          document.body.classList.add('xx-dark');
        } else if (mode === 'light') {
          document.body.classList.add('xx-light');
        }
      }
      if (modePath.length === 1) {
        this.forms.track(modePath[0], modeCallback);
      } else {
        this.forms.track(modePath[0], modePath[1], modeCallback);
      }
    }
  }
}