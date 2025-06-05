// declarations
import XXCode from "./code";
import XXMenu from "./menu";
import XXRouter from "./router";
import XXTheme from "./theme";

declare var XsltForms_globals: any;
declare var XsltForms_browser: any;
declare var XsltForms_xmlevents: any;

declare global {
  interface Window {
    XX: XXForms;
    xx: XXForms;
  }
}

export type XFBase = {
  xfElement: {
    doc: Document;
    addChange: (node: XFNode) => void;
  };
}
export type XFNode = Node & XFBase;
export type XFElement = Element & XFNode;
export type XFNodeList = NodeList & {
  item(index: number): XFNode | null;
  forEach(callbackfn: (value: Node, key: number, parent: XFNodeList) => void, thisArg?: any): void;
  [index: number]: XFNode;
  [Symbol.iterator](): ArrayIterator<XFNode>;
  entries(): ArrayIterator<[number, XFNode]>;
  values(): ArrayIterator<XFNode>;
}


// types

export type Handle = {
  id: string;
  modelId: string;
  instanceId: string;
  xpath: string;
  callback: TrackCallback;
  value: string;
}

export type TrackCallback = (value: XFNode[], initial?: boolean) => void;

export type ReadyCallback = () => void;

export type Handles = {
  [id: string]: Handle;
}

// classes

export class XXForms {
  handles: Handles = {};
  readyCallbacks: ReadyCallback[] = [];
  isReady = false;

  menu: XXMenu = new XXMenu(this);
  theme: XXTheme = new XXTheme(this);
  code: XXCode = new XXCode();
  router: XXRouter = new XXRouter(this);

  constructor() {
    document.addEventListener('xforms-ready', () => {
      if (this.isReady) {
        return;
      }
      this.isReady = true;
      this.readyCallbacks.forEach(callback => callback());
      this.readyCallbacks = [];
      this.menu.ready();
      this.code.ready();
      this.router.ready();
    });
    document.addEventListener('xforms-refresh', () => {
      this.checkChanges();
    });
  }

  private checkChanges() {
    for(let id in this.handles) {
      const handle = this.handles[id];
      const nodes = this.getNodes(handle.modelId, handle.instanceId, handle.xpath);
      const newValue = this.toString(nodes);
      if (newValue !== handle.value) {
        handle.value = newValue;
        handle.callback(nodes);
      }
    }
  }

  ready(callback: ReadyCallback): void;
  ready(): boolean;
  ready(callback?: ReadyCallback) {
    if (!callback) {
      return this.isReady;
    }
    if (this.isReady) {
      callback();
    } else {
      this.readyCallbacks.push(callback);
    }
  }

  getPath(args: any[], count?: number): any[] {
    count = count || args.length;
    while (args.length && args[args.length - 1] === undefined) {
      args.pop();
    }
    while (args.length < (count || 3)) {
      args.unshift(false);
    }
    let [modelId, instanceId, selector] = args;
    instanceId = instanceId || this.getInstance(modelId, instanceId)?.getAttribute('id');;
    modelId = modelId || this.getModel(modelId)?.getAttribute('id');
    args[0] = modelId || 'xsltforms-mainform-model-default';
    args[1] = instanceId;
    args[2] = selector;
    return args;
  }

  toString(node: XFNode | XFNode[]): string {
    if (!node) {
      return '';
    }
    if (Array.isArray(node)) {
      return node.map(this.toString).join('\n');
    }
    if (node.nodeType === node.ATTRIBUTE_NODE) {
      return `@${node.nodeName}=${node.textContent}`;
    }
    if (node.nodeType === node.TEXT_NODE) {
      return node.nodeValue ?? '';
    }
    const serializer = new XMLSerializer();
    const str = serializer.serializeToString(node);
    return (new DOMParser()).parseFromString(str, "application/xml").documentElement.outerHTML;
  }

  getModel(modelId?: string): XFElement | null {
    return document.querySelector('xforms-form xforms-model' + (modelId ? '#' + modelId : ''));
  }

  getInstance(instanceId: string): XFElement | undefined;
  getInstance(modelId: string, instanceId: string): XFElement | undefined;
  getInstance(modelId: string, instanceId?: string): XFElement | undefined {
    if (!instanceId) {
      instanceId = modelId;
      modelId = '';
    }
    const model = this.getModel(modelId);
    return model?.querySelector(`xforms-instance${instanceId ? '#' + instanceId : ''}`) || undefined;
  }

  _getNodes(xpath: string): XPathResult | undefined;
  _getNodes(instanceId: string, xpath: string): XPathResult | undefined;
  _getNodes(modelId: string, instanceId: string, xpath: string): XPathResult | undefined;
  _getNodes(modelId: string, instanceId?: string, xpath?: string): XPathResult | undefined {
    [modelId, instanceId, xpath] = this.getPath([modelId, instanceId, xpath]) as [string, string, string];
    const doc = this.getInstance(modelId, instanceId)?.xfElement.doc;
    if (!doc) {
      return;
    }
    return doc.evaluate(xpath.replace(/^\//g, '/*/'), doc.documentElement, null as any, XPathResult.ANY_TYPE, null);
  }

  _selectNodes(selector: string): XFNodeList | undefined;
  _selectNodes(instanceId: string, selector: string): XFNodeList | undefined;
  _selectNodes(modelId: string, instanceId: string, selector: string): XFNodeList | undefined;
  _selectNodes(modelId: string, instanceId?: string, selector?: string): XFNodeList | undefined {
    [modelId, instanceId, selector] = this.getPath([modelId, instanceId, selector]) as [string, string, string];
    return this.getInstance(modelId, instanceId)?.xfElement.doc.querySelectorAll(selector) as unknown as XFNodeList;
  }

  getNodes(xpath: string): XFNode[];
  getNodes(instanceId: string, xpath: string): XFNode[];
  getNodes(modelId: string, instanceId: string, xpath: string): XFNode[];
  getNodes(modelId: string, instanceId?: string, xpath?: string): XFNode[] {
    const evaluated = this._getNodes(modelId, instanceId!, xpath!);
    const result: XFNode[] = [];
    if (!evaluated) {
      return result;
    }
    for (let node = evaluated?.iterateNext(); node; node = evaluated.iterateNext()) {
      if (node.nodeType != node.ATTRIBUTE_NODE || !node.nodeName.startsWith('xsltforms_')) {
        result.push(node as XFNode);
      }
    }
    return result;
  }

  getNode(xpath: string): XFNode | undefined;
  getNode(instanceId: string, xpath: string): XFNode | undefined;
  getNode(modelId: string, instanceId: string, xpath: string): XFNode | undefined;
  getNode(modelId: string, instanceId?: string, xpath?: string): XFNode | undefined {
    const evaluated = this._getNodes(modelId, instanceId!, xpath!);
    return evaluated?.iterateNext() as XFNode ?? undefined;
  }

  selectNodes(selector: string): XFNode[];
  selectNodes(instanceId: string, selector: string): XFNode[];
  selectNodes(modelId: string, instanceId: string, selector: string): XFNode[];
  selectNodes(modelId: string, instanceId?: string, selector?: string): XFNode[] {
    const evaluated = this._selectNodes(modelId, instanceId!, selector!);
    if (!evaluated) {
      return [];
    }
    const result: XFNode[] = [];
    evaluated.forEach(node => result.push(node as XFNode));
    return result;
  }

  selectNode(selector: string): XFNode | undefined;
  selectNode(instanceId: string, selector: string): XFNode | undefined;
  selectNode(modelId: string, instanceId: string, selector: string): XFNode | undefined;
  selectNode(modelId: string, instanceId?: string, selector?: string): XFNode | undefined {
    const evaluated = this._selectNodes(modelId, instanceId!, selector!);
    return (evaluated as NodeList)[0] as XFNode ?? undefined;
  }

  write(xpath: string, value: string): void;
  write(instanceId: string, xpath: string, value: string): void;
  write(modelId: string, instanceId: string, xpath: string, value: string): void;
  write(modelId: string, instanceId?: string, xpath?: string, value?: string): void {
    [modelId, instanceId, xpath, value] = this.getPath([modelId, instanceId, xpath, value]);
    const model = this.getModel(modelId);
    if (!model) {
      return;
    }
    const nodes = this.getNodes(modelId, instanceId!, xpath!);
    XsltForms_globals.openAction("XsltForms_control.prototype.valueChanged");
    nodes.forEach(node => {
      XsltForms_browser.setValue(node, value);
      model.xfElement.addChange(node);
    });
    XsltForms_xmlevents.dispatch(model, "xforms-rebuild");
    XsltForms_globals.refresh();
    XsltForms_globals.closeAction("XsltForms_control.prototype.valueChanged");
  }

  track(xpath: string, callback: TrackCallback): void;
  track(instanceId: string, xpath: string, callback: TrackCallback): void;
  track(modelId: string, instanceId: string, xpath: string, callback: TrackCallback): void;
  track(modelId: string, instanceId: string | TrackCallback, xpath?: string | TrackCallback, callback?: TrackCallback) {
    [modelId, instanceId, xpath, callback] = this.getPath([modelId, instanceId, xpath, callback], 4) as [string, string, string, TrackCallback];
    const id = `${modelId}/${instanceId}/${xpath}`;
    const nodes = this.getNodes(modelId, instanceId, xpath);
    this.handles[id] = {
      id,
      modelId,
      instanceId,
      xpath,
      callback,
      value: this.toString(nodes),
    };
    callback(nodes, true);
  }

  xformsPath(path: string): string[] {
    const result = /instance\('([^']+)'\)(.+)/.exec(path);
    if (result) {
      return [result[1], result[2]];
    }
    return [path];
  }

  fireEvent(target: Node, event: string, context?: Record<string, any>) {
    XsltForms_xmlevents.dispatch(target, event, null, null, null, null, context);
  }
};
