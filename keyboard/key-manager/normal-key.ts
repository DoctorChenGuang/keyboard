import { KeyboardCss } from '../keyboard-style';

export class NormalKey {
  keyList: any = {};
  css: any = {};

  constructor(keyList) {
    this.keyList = keyList;
    this.css = new KeyboardCss().definedCss();
  }

  createNormalKey() {
    console.log('创建普通按键');
    this._addCss();
  }

  //应该提取为公共的方法
  private _addCss() {
    let keyClass, data: any = {}, keys: any = {};

    let disabledButton = this._isDisabledBtn();//按钮禁用，需要提取出来

    keys.action = keys.name = data.name = this.keyList.keyInfo.key;

    keyClass = this.css.keyAction + ' ' + this.css.keyPrefix + keys.action;
    keyClass += (keys.name.length > 2 ? ' ' + this.css.keyWide : '') + ' ' + this.css.buttonDefault + ' ' + this.css.keyButton;
    data.html = `<span class="${this.css.keyText}">${keys.name}</span>`;

    let buttonAttr = {
      'data-value': keys.name,
      'data.name': keys.action,
      'data-pos': this.keyList.col + ' ' + this.keyList.row,
      'data.action': keys.action,
      'data.html': data.html,
      'isDisabled': disabledButton
    };

    data.$key = this._keyBtn(keyClass, data.html, buttonAttr);
  }

  private _isDisabledBtn(): boolean {
    return false;
  }

  private _keyBtn(keyClass, dataHtml, buttonAttr) {
    let numberMargin = 0;

    let rowspan = this.keyList.keyInfo.rowspan ? this.keyList.keyInfo.rowspan : 1;

    let colspans = key.colspan > 2 ? ((this.kbWidth - this.keyWidth) * 2 * (key.colspan / 2 - 1)) : 0;
    let rowspans = rowspan > 1 ? (this.kbHeight - this.keyHeight) * 2 * (rowspan - 1) : 0;
    

  }
}
