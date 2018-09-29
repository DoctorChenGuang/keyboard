import Vue, { VNode } from "vue";

import utils from './utils';
import KeyboardHandler from './keyboard-handler';

class DefineDirective {
  keyboardHandler: KeyboardHandler = new KeyboardHandler();

  static configure() {
    console.log('配置项设置');
  }
  install(Vue: any, options: any): void {
    if (!options) {
      options = new Object();
    }

    const _this = this;

    Vue.directive('keyboard', {
      bind(el: HTMLElement, binding: any): void {
        const input = utils.getCurrentElement(el);

        if (input === null) {
          utils.warn(`element type is incorrect`);
          return;
        }

        if (!binding.value) {
          utils.warn(`lack of keyboard type`);
          return;
        }

        _this.keyboardHandler.registerEventListener(input, binding.value, options);
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

const KeyboardDirective = new DefineDirective();

export { KeyboardDirective };
