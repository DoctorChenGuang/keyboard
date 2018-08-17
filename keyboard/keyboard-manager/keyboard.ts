import { KeyManager } from '../key-manager/key-manager';
import { LayoutManager } from '../layout';

export class Keyboard {
  keyboardName: string = '';
  keyboardOption: any = new Object();
  target: any;
  screenRegion: any;

  constructor(keyboardOption) {
    this.keyboardName = keyboardOption.type;
    this.keyboardOption = keyboardOption;
  }

  public async show(target: EventTarget): Promise<void> {
    await this.createKeyboard();
  }

  private async createKeyboard(): Promise<void> {
    let layoutManager = new LayoutManager(this.keyboardName, this.keyboardOption.layout);
    await layoutManager.initLayoutAsync();
    // new KeyManager(keyboardKeys);  // 创建布局需要的按键key
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