import { EmulateKeyboardEvent } from './emulate-key-event';
import { KeyboardCss } from '../keyboard-style';
import { KeyAction } from './key-action';

export class KeyEvent {
  keyList: any;

  keyBtn: any;

  isActionKey: any;

  isClick: any;//是否为单击事件

  emulateKeyboardEvent: any;

  action: string = '';

  css: any = {};

  constructor(keyList, keyBtn, isActionKey) {
    this.keyList = keyList;
    this.keyBtn = keyBtn;
    this.isActionKey = isActionKey;
    this.action = this.keyList.keyInfo.key;
    this.css = new KeyboardCss().definedCss();
    this.emulateKeyboardEvent = new EmulateKeyboardEvent();
  }

  public addKeyEvent() {
    this._addMouseEvent();
    this._addTouchEvent();
  }

  private _addMouseEvent(): void {
    const action = this.keyList.keyInfo
    this.keyBtn.addEventListener('click', (event) => {
      if (!this.isActionKey) {
        console.log('点击事件，创建普通按键事件');
        this._createNormalKeyEvent(event, action);
        return;
      }
      this._createActionKeyEvent(event);
    });
  }

  private _addTouchEvent() {
    this.keyBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      //用于设置点击时候的样式
      this._touchStyle(() => this.keyBtn.classList.add(this.css.keyActive));
    });

    this.keyBtn.addEventListener('touchend', (event) => {
      this._touchStyle(() => this.keyBtn.classList.remove(this.css.keyActive));

      if (!this.isActionKey) {
        console.log('点击事件，创建普通按键事件----触摸事件');
        this._createNormalKeyEvent(event, this.action);
        return;
      }
      this._createActionKeyEvent(event);
    });
  }

  //此处按键模拟事件触发需要进行测试
  private _createNormalKeyEvent(event, action): void {
    let cancelledDown, cancelledKeypress, cancelledTextinput;

    cancelledDown = this.emulateKeyboardEvent.createKDEvent(action); //keydown

    if (!cancelledDown) {
      this.emulateKeyboardEvent.createKUEvent(action); //keyup
      return;
    }

    cancelledKeypress = this.emulateKeyboardEvent.createKeypressEvent(action); //keypress

    if (!cancelledKeypress) return;

    this.emulateKeyboardEvent.createKeyboardBeforeinput(action); //beforeinput
    cancelledTextinput = this.emulateKeyboardEvent.createTextInputEvent(action); // textInput

    if (!cancelledTextinput) return;

    if (!this._isMaxLength()) {
      // this.bindKeys(keyName, action, regKey, event.currentTarget);
      this._addKeyAction();
      this.emulateKeyboardEvent.createKeyboardInput(action); //input
    }

    //keyup事件和keydown事件应该是一起出现的
    this.emulateKeyboardEvent.createKUEvent(action); //keyup
  }

  private _createActionKeyEvent(event) {
    console.log('创建功能按键');
    this._addKeyAction();
    // this.bindKeys(keyName, action, regKey, event.currentTarget);
  }

  private _addKeyAction() {
    console.log('this.action', this.action);

    let keyActionFn: Function;
    //此处需要区分普通按键以及功能按键。
    let action = this.action;

    let keyName = this.action;

    if (!this.isActionKey) action = "";
    // if (key.fn) {
    //   keyActionFn = key.fn;
    //   return;
    // }
    new KeyAction().getKeyAction(keyName, action, this.keyBtn);
  }

  private _isMaxLength() {
    if (this._isChineseKey()) return false;

    const currentElementMaxlength = EmulateKeyboardEvent.currentElement.getAttribute('maxlength');

    if (!currentElementMaxlength) return false;

    if (EmulateKeyboardEvent.currentElement.value.length < currentElementMaxlength) return false;

    return true;
  }

  private _isChineseKey() {
    if (/chinese/.test(this.keyList.layoutName) && /[a-zA-Z]/.test(this.action)) return true;

    return false;
  }

  private _touchStyle(cb) {
    if (this.action !== 'handwriting-left' && this.action !== 'handwriting-right') {
      cb();
    }
  }
}