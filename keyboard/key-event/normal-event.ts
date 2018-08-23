import { EmulateKeyboardEvent } from './emulate-key-event';

export class NormalEvent {
  emulateKeyboardEvent: any;

  layoutName: string = '';

  runNormalEvent(action, layoutName) {
    //此处按键模拟事件触发需要进行测试
    this.emulateKeyboardEvent = new EmulateKeyboardEvent();

    this.layoutName = layoutName;

    this.emulateKeyboardEvent.emulateKeyEvent(action, () => {
      let text = action;
      this.emulateKeyboardEvent.createKeyboardBeforeinput(action); //beforeinput

      let cancelledTextinput = this.emulateKeyboardEvent.createTextInputEvent(action); // textInput

      if (!cancelledTextinput) return;
      if (this._isMaxLength(action)) return;

      this.insertText(text);

      this.emulateKeyboardEvent.createKeyboardInput(action); //input
    });
  }

  public insertText(text) {
    EmulateKeyboardEvent.currentElement.setRangeText(text, EmulateKeyboardEvent.currentElement.selectionStart, EmulateKeyboardEvent.currentElement.selectionEnd, 'end');
  }

  private _isMaxLength(action) {
    if (this._isChineseKey(action)) return false;

    const currentElementMaxlength = EmulateKeyboardEvent.currentElement.getAttribute('maxlength');

    if (!currentElementMaxlength) return false;

    if (EmulateKeyboardEvent.currentElement.value.length < currentElementMaxlength) return false;

    return true;
  }

  private _isChineseKey(action) {
    return (/chinese/.test(this.layoutName) && /[a-zA-Z]/.test(action)) ? true : false;
  }
}
