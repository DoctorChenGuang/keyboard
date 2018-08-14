import { KeyManager } from '../key-manager/key-manager';
import { LayoutManager } from '../layout';

export class Keyboard {
  keyboardName: string = '';
  keyboardConfig: object = new Object();
  target: any;
  screenRegion: any;

  constructor(keyboardMergedOption) {
    this.keyboardName = keyboardMergedOption.type;
    this.keyboardConfig = keyboardMergedOption;
  }

  public show(target: EventTarget) {
    const layout = new LayoutManager(this.keyboardName); // 创建键盘的布局
    const keyboardKeys = layout.getKeys();
    new KeyManager(keyboardKeys);  // 创建布局需要的按键key
    
  }

  destoryKeyboard() {
    console.log('销毁键盘');
  }

  public close() {
    this.destoryKeyboard();//销毁键盘
  }
}

export enum ScreenKeyboardPlacement {
  Bottom,
  Float,
  Top
}