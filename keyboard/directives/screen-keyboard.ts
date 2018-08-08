import Vue, { VNode } from "vue";

import utils from './utils';
import KeyboardHandler from './keyboard-handler';

//注册指令v-keyboard
export default {
  KeyboardHandler: new KeyboardHandler(),
  install(Vue: any, options: any) {
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

        // new KeyboardHandler().registerEventListener(input, binding.value);
        this.KeyboardHandler.registerEventListener(input, binding.value);
      },
      unbind(el: HTMLElement): void {
        const input = utils.getCurrentElement(el);

        if (input === null) {
          utils.warn(`element type is incorrect`);
          return;
        }

        // new KeyboardHandler().removeEventListener(input);
        this.KeyboardHandler.removeEventListener(input);
      }
    })
  }
}