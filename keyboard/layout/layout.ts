import { KeyManager } from '../key-manager';
import { KeyboardCss } from "../keyboard-style";

export class Layout {
  css: any = {};
  layoutName: string = '';
  keyboardName: any;
  // currentLayoutContainer: any = null;

  constructor() {
    this.css = new KeyboardCss().definedCss();
  }

  initLayout(layout, layoutName, keyboardContainer, keyboardName) {
    this.layoutName = layoutName;
    this.keyboardName = keyboardName;

    let layoutFlagList = Object.keys(layout);
    for (let set of layoutFlagList) {
      keyboardContainer.appendChild(this.buildLayout(layout[set], set)); // set = normal, single
    }
  }

  buildLayout(layout, set): any {
    if (!layout.KeyCodes) {
      return console.error('layout file doesnot conform to specification');
    }

    let rowLine = layout.row; //键盘布局的行数
    let colLine = layout.col; //键盘布局的列数

    //创建layout布局
    const currentLayoutContainer = document.createElement('div');

    this.addClass(currentLayoutContainer, set);

    for (let row = 0; row < layout.KeyCodes.length; row++) {
      this.buildRow(currentLayoutContainer, row, layout.KeyCodes[row]);
    }
    return currentLayoutContainer;
  }

  //创建行
  buildRow(currentLayoutContainer, row, rowList) {
    for (let col = 0; col < rowList.length; col++) {
      this.buildKey(currentLayoutContainer, row, col, rowList[col]);
    }
  }

  buildKey(currentLayoutContainer, row, col, keyInfo) {
    new KeyManager(currentLayoutContainer, row, col, keyInfo, this.layoutName).createKey();
  }

  addClass(currentLayoutContainer, set): void {
    currentLayoutContainer.setAttribute('name', this.layoutName + '-' + set);

    currentLayoutContainer.classList.add(this.css.keyboard);
    currentLayoutContainer.classList.add(this.css.keyboard + '-' + this.layoutName);
    currentLayoutContainer.classList.add(this.css.keySet + '-' + this.layoutName + '-' + set);
  }

  computedLayout() {

  }
}
