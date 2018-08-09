import Vue, { VNode } from "vue";

import utils from './utils';
import KeyboardHandler from './keyboard-handler';

class defineDirective {
  keyboardHandler: KeyboardHandler = new KeyboardHandler();

  kbOptions: object = new Object();

  install(Vue: any, options: any): void {
    const _this = this;
    Vue.directive('keyboard', {
      bind(el: HTMLElement, binding: any): void {
        _this.kbOptions = options;

        const input = utils.getCurrentElement(el);

        if (input === null) {
          utils.warn(`element type is incorrect`);
          return;
        }

        if (!binding.value) {
          utils.warn(`lack of keyboard type`);
          return;
        }

        _this.keyboardHandler.registerEventListener(input, binding.value);
      },
      unbind(el: HTMLElement): void {
        const input = utils.getCurrentElement(el);

        if (input === null) {
          utils.warn(`element type is incorrect`);
          return;
        }

        _this.keyboardHandler.removeEventListener(input);
      }
    })
  }
}

const kbDirective = new defineDirective();

export default kbDirective;