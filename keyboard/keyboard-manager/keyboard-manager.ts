import { MultiLayoutKeyboard } from './multi-layout-keyboard';
import { SingleLayoutKeyboard } from './single-layout-keyboard';
import { Options } from '../options';
import { KeyboardType } from './keyboard-type';
import { DefaultLayout } from '../layout';

interface UserOptions {
  [propName: string]: any;
}

export class KeyboardManager {
  public currentKeyboard: any;

  public currentKeyboardType!: string;

  public static userOptions: UserOptions = {};

  public static configure(userOptions) {
    KeyboardManager.userOptions = userOptions;
    console.log('合并用户传入的参数，然后规范化这些参数'); // 还需要规范化这些参数
  }

  public async showScreenKeyboardAsync(currentInputElement: any, keyboardConfig: any, screenRegion: any, keyboardOptions: any): Promise<void> {
    this.currentKeyboardType = keyboardConfig.type;

    let keyboardAllOptions = this._getOption(keyboardConfig, keyboardOptions);
    console.log('keyboardAllOptions', keyboardAllOptions);
    await this._createKeyboard(currentInputElement, keyboardAllOptions, screenRegion);
  }

  public closeScreenKeyboardAsync(): void {
    console.log('关闭键盘');
    if (this.currentKeyboard != null) {
      this.currentKeyboard.close();
    }
  }
  //此函数需要优化,更换一种实现思路,类似于状态管理
  private async _createKeyboard(currentInputElement: any, keyboardOption: any, screenRegion: any): Promise<void> {
    //设置键盘的位置??为什么会写成静态的??
    // KeyPosManager.getKeyInfo(keyboardOption.style.keyOptions);

    //模拟发送键盘事件时，需要获得当前的input元素,此处并不需要
    // EmulateKeyboardEvent.setCurrentElement(currentInputElement);
    let keyboard = this.currentKeyboard;

    switch (this.currentKeyboardType) {
      case KeyboardType.none:
        keyboard = null;
        break;

      case KeyboardType.address:
      case KeyboardType.normal:
      case KeyboardType.text:
        keyboard = new MultiLayoutKeyboard(currentInputElement, keyboardOption);
        break;

      case KeyboardType.number:
      case KeyboardType.numberWithoutPoint:
      case KeyboardType.phoneNumber:
      case KeyboardType.chineseId:
      case KeyboardType.numberMinus:
        keyboard = new SingleLayoutKeyboard(currentInputElement, keyboardOption);
        break;

      default:
        keyboard = this._isMultiLayoutKeyboard(keyboardOption) ? new MultiLayoutKeyboard(currentInputElement, keyboardOption) : new SingleLayoutKeyboard(currentInputElement, keyboardOption);
        break;
    }
    //弹出键盘
    await keyboard.show();
    //键盘位置设置
    // this.keyboardPosManager = new KeyboardPosManager(keyboard);
    // this.keyboardPosManager.setKeyboardPosition(screenRegion);
  }

  private _isMultiLayoutKeyboard(keyboardOption: any): boolean {
    let layoutList = keyboardOption.layout.supplyKeyboardType.layoutList;

    return Array.isArray(layoutList) && layoutList.length > 1 ? true : false;
  }

  //合并配置项应该全部提取出来，函数职责要单一
  private _getOption(keyboardConfig, keyboardOptions): any {
    const keyboardMergedOption = Options.getOptions(KeyboardManager.userOptions);

    if (!KeyboardType[<string>keyboardConfig.type] && (keyboardMergedOption.layout.supplyKeyboardType && Object.keys(keyboardMergedOption.layout.supplyKeyboardType).indexOf(<string>keyboardConfig.type) >= 0)) {
      console.error(`[Keyboard] invalid keyboard config: ${keyboardConfig.type}`);
      return;
    }

    return this._mergeAllOptions(Options.getOptions(keyboardOptions, keyboardMergedOption), keyboardConfig, this._getCurrentLayout(keyboardMergedOption, <string>keyboardConfig.type));
  }

  //这个函数应该提取出来放到options文件中,此函数还需要更改
  private _mergeAllOptions(keyboardMergedOption: object, keyboardConfig: any, currentLayout: any): object {
    let mergeAllOptions = JSON.parse(JSON.stringify(keyboardMergedOption));

    keyboardConfig.startupLayoutName && (currentLayout.startupLayoutName = keyboardConfig.startupLayoutName);

    keyboardConfig.availableLayoutNames && (currentLayout.availableLayoutNames = keyboardConfig.availableLayoutNames);

    keyboardConfig.keyboardPlacement && (mergeAllOptions.keyboardPlacement = keyboardConfig.keyboardPlacement);

    mergeAllOptions['layout']['supplyKeyboardType'] = currentLayout;
    mergeAllOptions['type'] = keyboardConfig.type;

    return mergeAllOptions;
  }

  //对于选项的提取，应该放在合并的函数中
  private _getCurrentLayout(keyboardMergedOption: any, keyboardConfigType: string): any {
    let layoutInfo = keyboardMergedOption.layout.supplyKeyboardType[keyboardConfigType] ? keyboardMergedOption.layout.supplyKeyboardType[keyboardConfigType] : DefaultLayout.getDefaultLayout()[keyboardConfigType];
    return { 'layoutList': layoutInfo };
  }
};
