function getPath(args, count) {
  count = count || args.length;
  while (args.length && args[args.length - 1] === undefined) {
    args.pop();
  }
  while (args.length < (count || 3)) {
    args.unshift(false)
  }
  let [modelId, instanceId, selector] = args;
  modelId = modelId || getModel(modelId).id;
  instanceId = instanceId || getInstance(instanceId, modelId).id;
  args[0] = modelId || 'xsltforms-mainform-model-default';
  args[1] = instanceId;
  args[2] = selector;
  return args;
}


/**
 * Gets an XSLTForms model
 * @param {string} [modelId] model ID, omit for getting the first model found
 * @returns {HTMLSpanElement} the model span element
 */
function getModel(modelId) {
  return document.querySelector('xforms-form xforms-model' + (modelId ? '#' + modelId : ''));
}
/**
 * Gets an XSLTForms instance
 * @param {string} instanceId instance ID
 * @param {string} [modelId] model ID, omit for using the first model found
 * @returns {HTMLSpanElement} the instance span element
 */
function getInstance(instanceId, modelId) {
  const model = getModel(modelId);
  return model?.querySelector(`xforms-instance${instanceId ? '#' + instanceId : ''}`);
}
/*
 * Get an XSLTForms node inside an instance
 * @param {string} instanceId instance ID
 * @param {string} modelId model id, omit for first found model
 * @param {string} selector path to the node relative to the instance using CSS selector sintax (not XPath)
 * @returns {Node|undefined} the node if it's found, undefined otherwise
 *//**
 * @type  {{
 *   (instanceId: string, selector: string): Node|undefined;
 *   (instanceId: string, modelId: string, selector: string): Node|undefined;
 * }}
 */
const getNode = function(instanceId, modelId, selector) {
  if (!selector) {
    selector = modelId;
    modelId = false;
  }
  if (!selector) {
    selector = instanceId;
    instanceId = false;
  }
  return getInstance(instanceId, modelId)?.xfElement.doc.querySelector(selector);
}
/*
 * Get the value of a node
 * @param {string} instanceId instance ID
 * @param {string} modelId model id, omit for first model found
 * @param {string} selector path to the node relative to the instance using CSS selector sintax (not XPath)
 * @returns {string|undefined} the value of the node as string, undefined if the node is not found
 *//**
 * @type  {{
 *   (instanceId: string, selector: string): string|undefined;
 *   (instanceId: string, modelId: string, selector: string): string|undefined;
 * }}
 */
const readValue = function(instanceId, modelId, selector) {
  return getNode(instanceId, modelId, selector)?.textContent;
}
/*
 * Insert new nodes
 * @param {string} instanceId instance ID
 * @param {string} modelId model id
 * @param {string} selector path to the node relative to the instance using CSS selector sintax (not XPath)
 * @param {function} a callback that should return the nodes to create, the document will be passed to the callback
 * @returns {void}
 *//**
 * @type  {{
 *   (instanceId: string, selector: string, callback: (document: Document) => void): void;
 *   (instanceId: string, modelId: string, selector: string, callback: (document: Document) => void): void;
 * }}
 */
const insertNode = function(instanceId, modelId, selector, callback) {
  if (!callback) {
    callback = selector;
    selector = modelId;
    modelId = false;
  }
  if (!callback) {
    callback = selector;
    selector = instanceId;
    instanceId = false;
  }
  const parent = getNode(instanceId, modelId, selector);
  if (!parent) {
    return;
  }
  const nodes = callback(parent.ownerDocument);
  nodes.forEach(node => parent.appendChild(node));
  const model=getModel(modelId).xfElement;
  XsltForms_globals.addChange(model);
  model.setRebuilded(true);
  const context = {
    'inserted-nodes': nodes,
    'origin-nodes': nodes,
    'insert-location-node': 1,
    position: 'after',
  };
  XsltForms_xmlevents.dispatch(model.findInstance(parent), 'xforms-insert', null, null, null, null, context);
  XsltForms_xmlevents.dispatch(model, 'xforms-rebuild');
}
/*
 * Set the value of a node
 * @param {string} instanceId instance ID
 * @param {string} modelId model id
 * @param {string} selector path to the node relative to the instance using CSS selector sintax (not XPath)
 * @param {string} value the new value
 * @returns {void}
 *//**
 * @type  {{
 *   (instanceId: string, selector: string, value: string): void;
 *   (instanceId: string, modelId: string, selector: string, value: string): void;
 * }}
 */
const writeValue = function(instanceId, modelId, selector, value) {
  if (!value) {
    value = selector;
    selector = modelId;
    modelId = false;
  }
  if (!value) {
    value = selector;
    selector = instanceId;
    instanceId = false;
  }
  const node = getNode(instanceId, modelId, selector);
  if (!node) {
    return;
  }
  writeValueToNode(node, value);
}
/*
 * Set the value of a node
 * @param {string} instanceId instance ID
 * @param {string} modelId model id
 * @param {string} selector path to the node relative to the instance using CSS selector sintax (not XPath)
 * @param {string} attribute the name of the attribute
 * @param {string} value the new value
 * @returns {void}
 *//**
 * @type  {{
 *   (instanceId: string, selector: string, attribute: string, value: string): void;
 *   (instanceId: string, modelId: string, selector: string, attribute: string, value: string): void;
 * }}
 */
const writeAttributeValue = function(instanceId, modelId, selector, attribute, value) {
  if (!value) {
    value = attribute;
    attribute = selector;
    selector = modelId;
    modelId = false;
  }
  if (!value) {
    value = attribute;
    attribute = selector;
    selector = instanceId;
    instanceId = false;
  }
  const node = getNode(instanceId, modelId, selector)?.attributes[attribute];
  if (!node) {
    return;
  }
  writeValueToNode(node, value);
}
const writeValueToNode = function(node, value) {
  const model = document.getElementById(XsltForms_browser.getDocMeta(node.ownerDocument, "model"))
  XsltForms_globals.openAction("XsltForms_control.prototype.valueChanged");
  XsltForms_browser.setValue(node, value);
  model.xfElement.addChange(node);
	XsltForms_xmlevents.dispatch(model, "xforms-rebuild");
  XsltForms_globals.refresh();
  XsltForms_globals.closeAction("XsltForms_control.prototype.valueChanged");
}
/**
 * Trigger an XSLTForms event
 * @param {string} eventName event name
 * @param {string} [modelId] model name, opmit for first model found
 * @returns {void}
 */
function dispatchEvent(eventName, modelId) {
  XsltForms_xmlevents.dispatch(getModel(modelId), eventName, null, null, null, null, {})
}

/**
 * An object containing all the change handles, each property is a handle
 * @type {{
 *   [handleId: string]: {
 *     id: string,
 *     instanceId: string,
 *     modelId: string,
 *     selector: string,
 *     callback: (value: string, first: boolean) => void,
 *     value: any,
 *   }
 * }}
 */
const changeHandles = {};

/**
 * Listen for changes on a node
 * @param {string} instanceId instance ID
 * @param {string} modelId model id
 * @param {string} selector path to the node relative to the instance using CSS selector sintax (not XPath)
 * @param {function} callback a callback that will be called with the new value whenever the node is changed, the callback will be called once when it's added
 *//**
 * @type  {{
 *   (selector: string, callback: (value: string, first: boolean) => void): void;
 *   (instanceId: string, selector: string, callback: (value: string, first: boolean) => void): void;
 *   (instanceId: string, modelId: string, selector: string, callback: (value: string, first: boolean) => void): void;
 * }}
 */
function onChange(modelId, instanceId, selector, callback) {
  [modelId, instanceId, selector, callback] = getPath([modelId, instanceId, selector, callback], 4)
  const id = `${instanceId}/${modelId}/${selector}`;
  console.log(id)
  const handle = {
    id,
    instanceId,
    modelId,
    selector,
    callback,
  };
  changeHandles[id] = handle;
}
let done = false;
document.addEventListener('xforms-ready', () => {
  if (!done) {
    done = true;
    for(id in changeHandles) {
      changeHandles[id].value = getNode(changeHandles[id].instanceId, changeHandles[id].modelId, changeHandles[id].selector);
      changeHandles[id].callback(changeHandles[id].value, true);
      const observer = new MutationObserver(mutations => {
        changeHandles[id].callback(changeHandles[id].value);
      });
      observer.observe(changeHandles[id].value, {
        subtree: true,
        attributes: true,
      })
    };
  }
});
