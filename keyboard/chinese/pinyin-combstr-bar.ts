interface PinyinComstrBarCss {
  name: string;
  combStrTxt: string;
  combStr: string;
}

interface PinyinComstrConfig {
  [propName: string]: any;
}
import { PinyinCombStrUpdateType } from '../interface';

export class PinyinComstrBar {
  public pinyinCombStr: string = '';
  public pinyinCombStrTxt!: HTMLSpanElement;

  public combStrBarHeight: number = 36; // 应该是可配置的
  public combStrBarWidth: string = "100%";

  public css: PinyinComstrBarCss = {
    name: "pinyin-combStr",
    combStr: "aui-pinyin-combstr-bar",
    combStrTxt: 'aui-pinyin-combstr-bar-txt'
  };

  // public static createPinyinCombstrBar(pinyinComstrConfig: PinyinComstrConfig): HTMLDivElement {
  //   let pinyinCombstrBarContainer = new PinyinComstrBar(pinyinComstrConfig);

  //   return pinyinCombstrBarContainer.create();
  // }

  constructor(public pinyinComstrConfig: PinyinComstrConfig) {
    this.pinyinComstrConfig = pinyinComstrConfig;
  }

  //此处的函数需要优化
  public create(): HTMLDivElement {
    let pinyinCombstrBarContainer = document.createElement('div');

    pinyinCombstrBarContainer.setAttribute('name', this.css.name);
    pinyinCombstrBarContainer.classList.add(this.css.combStr);

    this.createPinyinCombStrTxt(pinyinCombstrBarContainer);

    //设置宽度,此处需要拆分开
    pinyinCombstrBarContainer.style.width = this.combStrBarWidth;

    pinyinCombstrBarContainer.style.height = this.combStrBarHeight + 'px';

    return pinyinCombstrBarContainer;
  }

  public createPinyinCombStrTxt(pinyinCombstrBarContainer: HTMLDivElement): void {
    let pinyinCombStrTxt = document.createElement('span');
    pinyinCombStrTxt.classList.add(this.css.combStrTxt);

    pinyinCombstrBarContainer.appendChild(pinyinCombStrTxt);

    this.pinyinCombStrTxt = pinyinCombStrTxt;
  }

  //此处的函数需要优化
  public updatePinyinCombStr(updateType: PinyinCombStrUpdateType, pinyinStr: string = ""): void {
    switch (updateType) {
      case PinyinCombStrUpdateType.Cancel:
        this.cancelPinyinCombStr();
        break;

      case PinyinCombStrUpdateType.Insert:
        this.insertPinyinCombStr(pinyinStr);
        break;

      case PinyinCombStrUpdateType.Update:
        this.updatePinyinStr(pinyinStr);
        break;
    }
  }

  public cancelPinyinCombStr(): void {
    this.pinyinCombStr = this.pinyinCombStr.substring(0, this.pinyinCombStr.length - 1);
    this.pinyinCombStrTxt.innerText = this.pinyinCombStr;
  }

  public insertPinyinCombStr(pinyinStr: string): void {
    this.pinyinCombStr = this.pinyinCombStr + pinyinStr;
    this.pinyinCombStrTxt.innerText = this.pinyinCombStr;
  }

  public updatePinyinStr(pinyinStr: string): void {
    this.pinyinCombStr = pinyinStr;
    this.pinyinCombStrTxt.innerText = this.pinyinCombStr;
  }
};