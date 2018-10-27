import { Key } from "../key/key";

export class KeyPosManager {
  static keyOptions: any;

  static getKeyInfo(keyOptions: any): void {
    this.keyOptions = keyOptions;
  }

  //按键的设置不应该区分按键的种类
  public static computedKeyPosition(keyList, keyBtn: any): void {
    let rowspan = keyList.rowspan ? keyList.rowspan : 1;
    let colspan = keyList.colspan;

    let row = keyList.row;
    let col = keyList.col;

    let colspans = colspan > 2 ? ((keyBtn.keyContainerWidth - keyBtn.keyWidth) * 2 * (colspan / 2 - 1)) : 0;
    let rowspans = rowspan > 1 ? (keyBtn.keyContainerHeight - keyBtn.keyHeight) * 2 * (rowspan - 1) : 0;
    // //数字小键盘添加间距
    // let numberMargin = 0;
    // if (this.keyboardType === 'default') {
    //   let classList = keyClass.split(' ');
    //   if (classList.indexOf('aui-keyboard-small-number') > -1) {
    //     numberMargin = this.numberKBMargin;
    //   } else {
    //     numberMargin = 0;
    //   }
    // }
    let keyBuuton = keyBtn._keyBtnElement;

    keyBuuton.style.width = keyBtn.keyWidth * colspan + colspans + 'px';
    keyBuuton.style.height = keyBtn.keyHeight * rowspan * 2 + rowspans + 'px';

    keyBuuton.style.left = col * keyBtn.keyContainerWidth + keyBtn.keyContainerWidth - keyBtn.keyWidth + keyBtn.numberMargin + 'px';
    keyBuuton.style.top = row * keyBtn.keyContainerHeight * 2 + keyBtn.keyContainerHeight - keyBtn.keyHeight + 'px';
    // if (this.keyboardStyle == 'chinese') {
    //   //中文键盘
    //   keyBtn.style.top = key.row * this.kbHeight * 2 + this.kbHeight - this.keyHeight + this.characterHeight + this.combStrContainerHeight + this.candidateBarMarginBottom + 'px';
    // } else {
    //   keyBtn.style.top = key.row * this.kbHeight * 2 + this.kbHeight - this.keyHeight + 'px';
    // }
  }
}
