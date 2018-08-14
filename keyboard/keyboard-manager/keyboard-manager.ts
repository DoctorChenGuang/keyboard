import { Keyboard } from './keyboard';
import { KeyboardPosManager } from '../keyboard-pos-manager';
import { KeyboardOptionsManager } from '../options';
import { KeyboardType } from './keyboard-type';
// import { LayoutFileLoader } from '../layout/layout-file-loader';

interface KeyboardConfig {//此处有问题？？
  type?: string;
  [propName: string]: any;
}

export default class KeyboardManager {

  keyboard: any;
  keyboardPosManager: any;

  private configure(keyboardMergedOption) {
    this.keyboard = new Keyboard(keyboardMergedOption);
  }

  public async showScreenKeyboardAsync(target: EventTarget, keyboardConfig: KeyboardConfig, screenRegion: object, keyboardOptions: any): void {
    if (!KeyboardType[<string>keyboardConfig.type] && (keyboardOptions.supplyKeyboardType && (!Object.keys(keyboardOptions.supplyKeyboardType).includes(<string>keyboardConfig.type)))) {
      console.error(`[Keyboard] invalid keyboard config:${keyboardConfig.type}`);
      return;
    }

    // let layoutFile: any = {};
    // if (KeyboardType[<string>keyboardConfig.type]) {
    //   layoutFile = await new LayoutFileLoader().layoutFileAsync(keyboardConfig.type); //需要知道布局文件
    // }

    // if (Object.keys(keyboardOptions.supplyKeyboardType).includes(<string>keyboardConfig.type)) {
    //   layoutFile = keyboardOptions.supplyKeyboardType[<string>keyboardConfig.type]
    // }

    //键盘配置项合并
    const keyboardMergedOption = KeyboardOptionsManager.getMergedOptions();
    console.log('keyboardMergedOption', keyboardMergedOption);
    
    this.configure(keyboardMergedOption);
    //弹出键盘
    this.keyboard.show(target);
    //键盘位置设置
    this.keyboardPosManager = new KeyboardPosManager();
    this.keyboardPosManager.setKeyboardPosition(screenRegion);
  }

  public closeScreenKeyboardAsync(): void {
    this.keyboard.close();
    this.keyboardPosManager.restoreOriginalPosition();
  }
};
