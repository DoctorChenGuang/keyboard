export class KeyPosManager {
  static keyOptions: any;

  static getKeyInfo(keyOptions: any): void {
    this.keyOptions = keyOptions;
  }
  //按键的设置不应该区分按键的种类
  public static computedKeyPosition(keyList, keyBtn): void {
    let rowspan = keyList.keyInfo.rowspan ? keyList.keyInfo.rowspan : 1;
    let colspan = keyList.keyInfo.colspan;

    let row = keyList.keyInfo.row;
    let col = keyList.keyInfo.col;

    let colspans = colspan > 2 ? ((this.keyOptions.kbWidth - this.keyOptions.keyWidth) * 2 * (colspan / 2 - 1)) : 0;
    let rowspans = rowspan > 1 ? (this.keyOptions.kbHeight - this.keyOptions.keyHeight) * 2 * (rowspan - 1) : 0;
    // //数字小键盘添加间距
    let numberMargin = 0;
    // if (this.keyboardType === 'default') {
    //   let classList = keyClass.split(' ');
    //   if (classList.indexOf('aui-keyboard-small-number') > -1) {
    //     numberMargin = this.numberKBMargin;
    //   } else {
    //     numberMargin = 0;
    //   }
    // }

    keyBtn.style.width = this.keyOptions.keyWidth * colspan + colspans + 'px';
    keyBtn.style.height = this.keyOptions.keyHeight * rowspan * 2 + rowspans + 'px';

    // console.log('col', col);
    keyBtn.style.left = col * this.keyOptions.kbWidth + this.keyOptions.kbWidth - this.keyOptions.keyWidth + numberMargin + 'px';
    keyBtn.style.top = row * this.keyOptions.kbHeight * 2 + this.keyOptions.kbHeight - this.keyOptions.keyHeight + 'px';
    // if (this.keyboardStyle == 'chinese') {
    //   //中文键盘
    //   keyBtn.style.top = key.row * this.kbHeight * 2 + this.kbHeight - this.keyHeight + this.characterHeight + this.combStrContainerHeight + this.candidateBarMarginBottom + 'px';
    // } else {
    //   keyBtn.style.top = key.row * this.kbHeight * 2 + this.kbHeight - this.keyHeight + 'px';
    // }
  }
}
