import KeyboardType from './keyboard-type';

export class Keyboard {
  keyboardName: string = '';
  keyboardConfig: object = new Object();
  target: any;
  screenRegion: any;

  constructor(keyboardConfig) {
    this.keyboardName = keyboardConfig.type;
    this.keyboardConfig = keyboardConfig;
  }
  private getKeyboardName(keyboardName: string): string {
    //从此处需要知道应该是什么类型的键盘
    return keyboardName;
  }
  private configure() {
    const keyboardName = this.getKeyboardName(<string>keyboardConfig.type);
  }
  
  createKeyboard() {
    new KeyboardType();//创建什么类型的键盘，如果是用户自定义的键盘呢
  }
  destoryKeyboard() {
    console.log('销毁键盘');
  }

  public show(target: EventTarget, screenRegion: object) {
    this.createKeyboard();//创建键盘
  }
  public close() {
    this.destoryKeyboard();//销毁键盘
  }
}

export enum ScreenKeyboardPlacement {
  Bottom,
  Float,
}