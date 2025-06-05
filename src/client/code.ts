import { XFNode, XXForms } from "./xxforms";
import { highlightAll } from './shj';

export default class XXCode {
  ready() {
    highlightAll({
      hideLineNumbers: false,
    });
  }
}