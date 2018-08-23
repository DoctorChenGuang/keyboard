export class EmulateKeyboardEvent {
  static currentElement: any;

  static setCurrentElement(currentElement) {
    this.currentElement = currentElement;
  }

  createKDEvent(action) {
    let cancelled;
    let event = new KeyboardEvent('keydown', {
      'key': action,
      'cancelable': true,
      'bubbles': true,
      'composed': true
    });
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  //beforeinput
  createKeyboardBeforeinput(action) {
    let cancelled;
    let event = document.createEvent('UIEvents');
    event.initUIEvent('beforeinput', true, true, document.defaultView, action, 0, '', 0);
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  //keypress
  createKeypressEvent(action) {
    let cancelled;
    let event = new KeyboardEvent('keypress', {
      'key': action,
      'cancelable': true,
      'bubbles': true,
      'isTrusted': true
    });
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  //textInput
  createTextInputEvent(action) {
    let cancelled;
    let event = document.createEvent('UIEvents');
    event.initUIEvent('textInput', true, true, document.defaultView, action, 0, '', 0);
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  //input
  createKeyboardInput(action) {
    // let cancelled;
    // let event = new InputEvent('input', {
    //   'data': action,
    //   'inputType': 'insertText',
    //   'bubbles': true,
    //   'composed': true
    // });
    // cancelled = this.currentElement.dispatchEvent(event);
    // return cancelled;
    let cancelled;
    let event = document.createEvent('UIEvents');
    event.initUIEvent('input', true, true, document.defaultView, action, 0, '', 0);
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  //keyup
  createKUEvent(action) {
    let cancelled;
    let event = new KeyboardEvent('keyup', {
      'key': action,
      'cancelable': true
    });
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  //change
  createChangeEvent() {
    let cancelled;
    let event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    cancelled = EmulateKeyboardEvent.currentElement.dispatchEvent(event);
    return cancelled;
  }

  public emulateKeyEvent(action, cb): void {
    let cancelledDown, cancelledKeypress;

    cancelledDown = this.createKDEvent(action); //keydown

    if (!cancelledDown) {
      this.createKUEvent(action); //keyup
      return;
    }

    cancelledKeypress = this.createKeypressEvent(action); //keypress

    if (!cancelledKeypress) {
      this.createKUEvent(action); //keyup
      return;
    }

    cb(); // 回调函数不会return掉当前函数的

    this.createKUEvent(action); //keyup
  }
}