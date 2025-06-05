import { XFNode, XXForms } from "./xxforms";

export default class XXRouter {
  constructor(private forms: XXForms) {}
  ready() {
    addEventListener('popstate', () => {
      const route = location.hash
        ? location.hash.slice(1)
        : '/';
      this.forms.write('xxforms', '/route', route);
      this.forms.fireEvent(this.forms.getModel()!, 'xx-route-changed', { route });
    });
    this.forms.track('xxforms', '/route', (nodes, initial) => {
      if (initial) {
        const route = location.hash.slice(1) || '/';
        this.forms.write('xxforms', '/route', route);
        this.forms.fireEvent(this.forms.getModel()!, 'xx-route-changed', { route });
        return;
      }
      const newRoute = '#' + nodes[0].textContent;
      if (location.hash !== newRoute) {
        history.pushState(null, '', newRoute);
      }
    });
  }
}