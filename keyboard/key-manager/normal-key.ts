import { KeyboardCss } from '../keyboard-style';
import { KeyPosManager } from '../keyboard-pos-manager';

export class NormalKey {
  keyList: any = {};
  css: any = {};

  constructor(keyList) {
    this.keyList = keyList;
    this.css = new KeyboardCss().definedCss();
  }

  createNormalKey() {
    let keyBtn = this._createKeyBtn(this._setCss());

    KeyPosManager.computedKeyPosition(this.keyList, keyBtn);
    
    return keyBtn;
  }

  //应该提取为公共的方法
  private _setCss() {
    let keyClass, data: any = {}, keys: any = {};

    const disabledButton = this._isDisabledBtn();//按钮禁用，需要提取出来

    keys.action = keys.name = data.name = this.keyList.keyInfo.key;

    keyClass = data.name === '' ? '' : this.css.keyPrefix + data.name;
    keyClass += (keys.name.length > 2 ? ' ' + this.css.keyWide : '') + ' ' + this.css.buttonDefault + ' ' + this.css.keyButton;
    data.html = `<span class="${this.css.keyText}">${keys.name}</span>`;

    return {
      keyClass: keyClass,
      keyContent: data.html,
      buttonAttr: {
        'data-value': keys.name,
        'data.name': keys.action,
        'data-pos': this.keyList.col + ' ' + this.keyList.row,
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
}
