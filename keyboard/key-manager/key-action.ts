import { EmulateKeyboardEvent } from './emulate-key-event';

export class KeyAction {
  //这个方法需要更改，无法确定按键的种类以及按键的行为。
  //对于按键的行为的扩展，还是需要进行推敲

  public getKeyAction(keyName, action, keyBtn) {
    if (action === '') {
      this._normalAction(keyName);
      return;
    }

    const fnName = `_${action}`;

    //对于是补充的按键，应该在之前就进行处理
    if (!this[fnName]) throw new Error('need key action fn!!');

    return this[fnName];

  }

  private _english() {

  }

  private _cancel() {

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

  private _normalAction(text) {
    this.insertText(text);
  }

  public insertText(text) {
    EmulateKeyboardEvent.currentElement.setRangeText(text, EmulateKeyboardEvent.currentElement.selectionStart, EmulateKeyboardEvent.currentElement.selectionEnd, 'end');
  }
}
