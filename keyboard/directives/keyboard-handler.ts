import { KeyboardPosManager } from '../keyboard-pos-manager';
import utils from './utils';
import { KeyboardTypes, KeyboardManager } from '../keyboard-manager';

interface KeyboardConfig {
  type?: string;
  [propName: string]: any;
}

export default class KeyboardHandler {
  // public isUseSystemKeyboard: boolean = false;
  private keyboardConfig: KeyboardConfig = new Object();
  private keyboardOptions: any = new Object();
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
  async showKeyboardHandler(event: Event): Promise<void> {
    let target = event.currentTarget;
    if (this.isDisableCurrentElement(target)) return;

    const screenRegion = this.getCurrentElementRegion(target);

    // this.isUseSystemKeyboard = KeyboardPosManager.config.isUseSystemKeyboard;//是否使用系统版本键盘
    // if (isUseSystemKeyboard) {
    //   KeyboardPosManager.keyboardPositionUpwards(screenRegion);
    //   return;
    // }
    // 判断此类型是否存在,合并配置选项,
    // if (!KeyboardTypes[<string>this.keyboardConfig.type]) {
    //   utils.warn(`[Keyboard] invalid keyboard config:${this.keyboardConfig.type}`);
    //   return;
    // }

    target = utils.getCurrentElement(<HTMLElement>target);
    await this.keyboardManager.showScreenKeyboardAsync(<EventTarget>target, this.keyboardConfig, screenRegion, this.keyboardOptions);
  }

  async closeKeyboardHandler(event: Event): Promise<void> {
    // if (this.isUseSystemKeyboard) {
    //   KeyboardPosManager.keyboardPositionReduction();//重置系统键盘位置,此处需要拆分开.
    //   return;
    // }
    await this.keyboardManager.closeScreenKeyboardAsync();
  }
  registerEventListener(target: HTMLElement, keyboardConfig: object | string, keyboardOptions: object): void {
    this.setKeyboardConfig(keyboardConfig);
    this.keyboardOptions = keyboardOptions;

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