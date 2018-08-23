// import { EmulateKeyboardEvent } from './emulate-key-event';
import { KeyboardCss } from '../keyboard-style';
import { KeyAction } from './key-action';

export class KeyEvent {
  keyList: any;

  keyBtn: any;

  isActionKey: any;

  isClick: any;//是否为单击事件

  action: any;

  css: any = {};

  constructor(keyList, keyBtn, isActionKey) {
    this.keyList = keyList;
    this.keyBtn = keyBtn;
    this.isActionKey = isActionKey;
    this.action = this.keyList.keyInfo.key;
    this.css = new KeyboardCss().definedCss();
  }

  public addKeyEvent() {
    this._addMouseEvent();
    this._addTouchEvent();
  }

  private _addMouseEvent(): void {
    const action = this.keyList.keyInfo.key;
    this.keyBtn.addEventListener('click', (event) => {
      this._addKeyAction(event);
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

      this._addKeyAction(event);
    });
  }

  private _addKeyAction(event) {
    //此处需要区分普通按键以及功能按键。
    let action = this.isActionKey ? this._getKeyAction() : "";
    let keyName = this.isActionKey ? action : this.keyList.keyInfo.key;

    // let keyActionFn: Function;
    // if (key.fn) {/如果是用户补充的功能按键行为
    //   return;
    // }

    new KeyAction().getKeyAction(keyName, action, this.keyBtn);
  }

  // private _isChineseKey() {
  //   if (/chinese/.test(this.keyList.layoutName) && /[a-zA-Z]/.test(this.action)) return true;

  //   return false;
  // }

  private _touchStyle(cb) {
    if (this.action !== 'handwriting-left' && this.action !== 'handwriting-right') {
      cb();
    }
  }

  private _getKeyAction() {
    const action = this.keyList.keyInfo.key.match(/^\{(\S+)\}$/)[1];
    return action.split(':')[0];
  }
}
