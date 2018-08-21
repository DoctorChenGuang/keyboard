import { Keyboard } from './keyboard';
import { KeyboardOptionsManager } from '../options';
import { KeyboardType } from './keyboard-type';
import { LayoutManager } from '../layout';
import { KeyPosManager, KeyboardPosManager } from '../keyboard-pos-manager';

interface KeyboardConfig {//此处有问题？？
  type?: string;
  [propName: string]: any;
}

export default class KeyboardManager {

  keyboard: any;
  keyboardPosManager: any;

  private configure(keyboardOption) {
    this.keyboard = new Keyboard(keyboardOption);
  }

  public async showScreenKeyboardAsync(target: EventTarget, keyboardConfig: KeyboardConfig, screenRegion: object, keyboardOptions: any): Promise<void> {
    const keyboardMergedOption = KeyboardOptionsManager.getMergedOptions();

    if (!KeyboardType[<string>keyboardConfig.type] && (keyboardMergedOption.layout.supplyKeyboardType && (!Object.keys(keyboardMergedOption.layout.supplyKeyboardType).includes(<string>keyboardConfig.type)))) {
      console.error(`[Keyboard] invalid keyboard config: ${keyboardConfig.type}`);
      return;
    }

    console.log('keyboardMergedOption-合并的配置选项', keyboardMergedOption);
    console.log('键盘的跟随方式也需要进行合并');
    KeyPosManager.getKeyInfo(keyboardMergedOption.style.keyOptions);
    let keyboardAllOptions = this._mergeAllOptions(keyboardMergedOption, keyboardConfig, keyboardOptions, this._getCurrentLayout(keyboardMergedOption, <string>keyboardConfig.type));

    this.configure(keyboardAllOptions);
    //弹出键盘
    const keyboard = await this.keyboard.show(target);
    //键盘位置设置
    this.keyboardPosManager = new KeyboardPosManager(keyboard);
    this.keyboardPosManager.setKeyboardPosition(screenRegion);
  }

  private _mergeAllOptions(keyboardMergedOption: object, keyboardConfig: any, keyboardOptions: object, currentLayout: object): object {
    console.log('合并所有需要的配置选项');  //还需要进一步合并
    let mergeAllOptions = JSON.parse(JSON.stringify(keyboardMergedOption));
    mergeAllOptions['layout'] = currentLayout;
    mergeAllOptions['type'] = keyboardConfig.type;
    return mergeAllOptions;
  }

  private _getCurrentLayout(keyboardMergedOption: any, keyboardConfigType: string): any {
    if (keyboardMergedOption.layout.supplyKeyboardType[keyboardConfigType]) {
      return keyboardMergedOption.layout.supplyKeyboardType[keyboardConfigType];
    } else {
      return LayoutManager.configure()[keyboardConfigType];
    }
  }

  public closeScreenKeyboardAsync(): void {
    this.keyboard.close();
    this.keyboardPosManager.restoreOriginalPosition();
  }
};
