import { Keyboard } from "./keyboard";
import { LayoutFactory } from '../layout';
import { SlotDom } from '../util/slot';
import { LayoutOptions } from '../interface';

interface KeyboardConfig {
  [propName: string]: any;
}

export class SingleLayoutKeyboard extends Keyboard {
  constructor(currentInputElement: any, keyboardOptions: KeyboardConfig) {
    super(currentInputElement, keyboardOptions);
  }

  public async show(): Promise<void> {
    await this.initConfig();

    this.createKeyboard();

    let layoutOptions = this.getLayoutAllInfo();

    this.createLayout(layoutOptions);

    this.parentDom.appendChild(this.screenKeyboardContainer);

    // //这个写法需要优化下,传入布局的名称就可以了,
    // //其实不需要这个所谓的不同的布局，只需要一个创建布局的工厂函数，这个创建不同的布局。
    // let layoutContainer = LayoutFactory.layoutGenerator(layoutConfig);

    // //对于用户自定义的模块，暂时先放下。主要是如何渲染dom。
    // // let span = document.createElement('span');
    // // span.innerText = '赞同科技';

    // // SlotDom.after("createKeyboard", () => {
    // //   this.keyboardContiner.appendChild(span);
    // // }, [this]);
    // // layoutContainer && layoutContainer.appendChild(span);
    // layoutContainer && this.createKeyboard();

    // this.parentDom.appendChild(this.keyboardContiner);
  }

  public getLayoutAllInfo(): LayoutOptions {
    let layout = this.layouts.get(this.keyboardName);

    return {
      layout: layout,
      layoutName: this.keyboardName,
      setInitState: this.getSetInitState(layout),
      isDisabled: false,
      hasLayoutKey: false
    };
  }

  public close() {
    console.log('关闭电话号码键盘');
  }
};
