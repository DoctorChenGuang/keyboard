import { EmulateKeyboardEvent } from './emulate-key-event';
// emulateKeyboardEvent
export class KeyAction {
  //这个方法需要更改，无法确定按键的种类以及按键的行为。
  //对于按键的行为的扩展，还是需要进行推敲
  emulateKeyboardEvent: any;

  constructor() {
    this.emulateKeyboardEvent = new EmulateKeyboardEvent();
  }
  public getKeyAction(keyName, action, keyBtn) {
    if (action === '') {
      this._normalAction(keyName);
      return;
    }

    const fnName = `_${action}`;

    //对于是补充的按键，应该在之前就进行处理
    if (!this[fnName]) throw new Error('need key action fn!!');

    this[fnName]();
  }

  private _english() {

  }

  private _cancel() {
    this.cancelText();
  }

  private _single() {

  }

  private _chinese() {

  }

  private _accept() {

  }

  private _write() {

  }

  private _capital() {

  }

  private _symbol() {

  }

  private _space() {

  }

  private _left() {

  }

  private _right() { }

  private _toggle() { }

  private _choiceCandidate() { }

  // private _normalAction(action) {
  //   //此处按键模拟事件触发需要进行测试
  //   this.emulateKeyboardEvent.emulateKeyEvent(action, () => {
  //     //普通按键需要执行的操作
  //     let text = action;
  //     this.emulateKeyboardEvent.createKeyboardBeforeinput(action); //beforeinput
  //     let cancelledTextinput = this.emulateKeyboardEvent.createTextInputEvent(action); // textInput

  //     if (!cancelledTextinput) return;
  //     if (this._isMaxLength()) return;

  //     this.insertText(text);

  //     this.emulateKeyboardEvent.createKeyboardInput(action); //input
  //   });
  // }

  // public insertText(text) {
  //   EmulateKeyboardEvent.currentElement.setRangeText(text, EmulateKeyboardEvent.currentElement.selectionStart, EmulateKeyboardEvent.currentElement.selectionEnd, 'end');
  // }

  public cancelText(): void {
    this.createCancelTextEvent('Backspace');
  }

  //创建键盘事件
  createCancelTextEvent(action): void {
    this.emulateKeyboardEvent.emulateKeyEvent(action, () => {
      this.createKeyboardBeforeinput(action); //beforeinput
      if (EmulateKeyboardEvent.currentElement.value.length > 0) {
        this.bkspTxt(); //删除字符
        this.createKeyboardInput(action); //input
      }
    });
  }

  // private _isMaxLength() {
  //   if (this._isChineseKey()) return false;

  //   const currentElementMaxlength = EmulateKeyboardEvent.currentElement.getAttribute('maxlength');

  //   if (!currentElementMaxlength) return false;

  //   if (EmulateKeyboardEvent.currentElement.value.length < currentElementMaxlength) return false;

  //   return true;
  // }


  // private _isChineseKey() {
  //   if (/chinese/.test(this.keyList.layoutName) && /[a-zA-Z]/.test(this.action)) return true;

  //   return false;
  // }
}
