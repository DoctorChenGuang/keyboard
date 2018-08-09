import { KeyboardPosManager } from '../keyboard-pos-manager';
import utils from './utils';
import { KeyboardTypes, KeyboardManager } from '../keyboard-manager';

interface KeyboardConfig {
  type?: string;
  [propName: string]: any;
}

export default class KeyboardHandler {
  // public isUseSystemKeyboard: boolean = false;
  private keyboardConfig: KeyboardConfig = {};

  keyboardManager: KeyboardManager = new KeyboardManager();
  isDisableCurrentElement(target: any): boolean {
    if (target.disabled) {
      return true;
    }

    let targetChildren = target.children;
    if (targetChildren) {
      for (let i = 0; i < targetChildren.length; i++) {
        if (targetChildren[i].disabled) {
          return true;
        }
      }
    }

    return false;
  }
  getCurrentElementRegion(target: any): object {
    const regionInfo = target.getBoundingClientRect();
    return {
      left: regionInfo.left,
      top: regionInfo.top,
      width: regionInfo.width,
      height: regionInfo.height
    };
  }
  setKeyboardConfig(keyboardConfig: string | object): void {
    if (typeof keyboardConfig === 'string') {
      this.keyboardConfig = Object.assign(this.keyboardConfig, { type: keyboardConfig });
      return;
    }

    if (typeof keyboardConfig !== 'object') {
      utils.warn(`keyboardConfig expected value is string or object`);
      return;
    }

    this.keyboardConfig = <object>keyboardConfig;
  }
  showKeyboardHandler(event: Event): void {
    let target = event.currentTarget;
    console.log('this', this);
    if (this.isDisableCurrentElement(target)) return;

    const screenRegion = this.getCurrentElementRegion(target);

    // this.isUseSystemKeyboard = KeyboardPosManager.config.isUseSystemKeyboard;//是否使用系统版本键盘
    // if (isUseSystemKeyboard) {
    //   KeyboardPosManager.keyboardPositionUpwards(screenRegion);
    //   return;
    // }

    if (!KeyboardTypes[<string>this.keyboardConfig.type]) {
      utils.warn(`[Keyboard] invalid keyboard config:${this.keyboardConfig.type}`);
      return;
    }

    target = utils.getCurrentElement(<HTMLElement>target);
    this.keyboardManager.showScreenKeyboardAsync(<EventTarget>target, this.keyboardConfig, screenRegion);
  }

  closeKeyboardHandler(event: Event): void {
    // if (this.isUseSystemKeyboard) {
    //   KeyboardPosManager.keyboardPositionReduction();//重置系统键盘位置,此处需要拆分开.
    //   return;
    // }
    this.keyboardManager.closeScreenKeyboardAsync();
  }
  registerEventListener(target: HTMLElement, keyboardConfig: object | string): void {
    this.setKeyboardConfig(keyboardConfig);

    target.addEventListener('focusin', this.showKeyboardHandler.bind(this));
    target.addEventListener('focusout', this.closeKeyboardHandler.bind(this));
    target.addEventListener('click', this.showKeyboardHandler.bind(this));
  }
  removeEventListener(target: HTMLElement): void {
    target.removeEventListener('focusin', this.showKeyboardHandler.bind(this));
    target.removeEventListener('focusout', this.closeKeyboardHandler.bind(this));
    target.removeEventListener('click', this.showKeyboardHandler.bind(this));
  }
}