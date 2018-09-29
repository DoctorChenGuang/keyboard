interface PinyinComstrBarCss {
  name: string;

  combStr: string;
}

export class PinyinComstrBar {
  // public pinyinCombStr: string = '';

  public combStrBarHeight: number = 36; // 应该是可配置的

  public css: PinyinComstrBarCss = {
    name: "pinyin-combStr",

    combStr: "aui-pinyin-combstr-bar",
  };

  public createPinyinCombstrBar(options: any): HTMLDivElement {
    let pinyinCombstrBar = document.createElement('div');

    pinyinCombstrBar.setAttribute('name', this.css.name);

    pinyinCombstrBar.classList.add(this.css.combStr);

    //设置宽度,此处需要拆分开
    pinyinCombstrBar.style.width = this.kbWidth * colLine * 2 + this.numberKBMargin + 'px';

    pinyinCombstrBar.style.height = this.combStrBarHeight + 'px';

    return pinyinCombstrBar;
  }
};
