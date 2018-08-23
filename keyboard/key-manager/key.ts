import { KeyboardCss } from '../keyboard-style';
import { KeyPosManager } from '../keyboard-pos-manager';
import { KeyEvent } from './key-event';
import { KeyNameManager } from './key-name-manager';

export class Key {
  keyList: any = {};
  css: any = {};
  _isActionKey: boolean;

  constructor(keyList, _isActionKey) {
    this.keyList = keyList;
    this.css = new KeyboardCss().definedCss();
    this._isActionKey = _isActionKey;
  }

  createNormalKey() {
    let keyBtn = this._createKeyBtn(this._setCss());

    KeyPosManager.computedKeyPosition(this.keyList, keyBtn);

    if (!this._isDisabledBtn()) {
      //不是禁用的按键则发送键盘事件
      this._createKeyEvent(keyBtn);
    }

    return keyBtn;
  }

  //应该提取为公共的方法
  private _setCss() {
    let keyClass, data: any = {}, keys: any = {};

    const disabledButton = this._isDisabledBtn();//按钮禁用，需要提取出来

    keys.action = keys.name = this._isActionKey ? this._getAction() : this.keyList.keyInfo.key;
    keys.value = this._processName(keys.name);

    data.name = this._isActionKey ? keys.action : keys.name;

    if (this._isActionKey) {
      keyClass = this.css.keyAction + ' ' + this.css.keyPrefix + keys.action;
    } else {
      keyClass = data.name === '' ? '' : this.css.keyPrefix + data.name;
    }

    keyClass += (keys.name.length > 2 ? ' ' + this.css.keyWide : '') + ' ' + this.css.buttonDefault + ' ' + this.css.keyButton;
    data.html = `<span class="${this.css.keyText}">${this._isActionKey ? keys.value : keys.name}</span>`;

    return {
      keyClass: keyClass,
      keyContent: data.html,
      buttonAttr: {
        'data-value': keys.value,
        'data.name': keys.action,
        'data-pos': this.keyList.keyInfo.col + ' ' + this.keyList.keyInfo.row,
        'data.action': keys.action,
        'data.html': data.html,
        'isDisabled': disabledButton
      }
    }
  }

  //按键是否禁用需要外面进行控制
  private _isDisabledBtn(): boolean {
    return false;
  }

  //这个应该是动态设置计算出来的。按键的样式。
  private _createKeyBtn({ keyClass, keyContent, buttonAttr }) {
    let keyBtn = document.createElement('button');

    keyClass = keyClass.split(' ');

    for (let value of keyClass) {
      keyBtn.classList.add(value);
    }

    keyBtn.innerHTML = keyContent;

    for (let item in buttonAttr) {
      keyBtn.setAttribute(item, buttonAttr[item]);
    }

    return keyBtn;
  }

  private _createKeyEvent(keyBtn): void {
    new KeyEvent(this.keyList, keyBtn, false).addKeyEvent();
  }

  //此方法需要抽取出来,抽象化
  private _processName(keyName) {
    return new KeyNameManager().register(keyName);
  }

  private _getAction() {
    const action = this.keyList.keyInfo.key.match(/^\{(\S+)\}$/)[1];
    return action.split(':')[0];
  }
}
