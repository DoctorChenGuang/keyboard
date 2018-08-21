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
    let layoutManager = new LayoutManager(this.keyboardName, this.keyboardOption.layout);
    return await layoutManager.createKeyboard();
  }

  destoryKeyboard() {
    console.log('销毁键盘');
  }

  public close() {
    this.destoryKeyboard();//销毁键盘
  }
}
