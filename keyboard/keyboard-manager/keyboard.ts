import { isPlainObject } from '../util/util';
import { LayoutFileLoader } from '../layout/layout-file-loader';
import { LayoutFactory } from '../layout';
import { StateMachine } from '../key';
import { LayoutOptions } from '../interface';

enum KeyboardPlacement {
  Bottom,
  Float,
  Top
}

interface KeyboardConfig {
  [propName: string]: any;
}

interface KeyboardCss {
  keyboardContainer: string;
  keyboard: string;
  keySet: string;
}


//对于属性需要优化下
export abstract class Keyboard {
  public readonly version: string = '2.0.0';
  public keyboardName!: string;
  public currentInputElement: HTMLInputElement;
  public keyboardOptions: KeyboardConfig;
  public layouts: Map<string, any> = new Map();
  public currentKeyboard: any;
  public isShow: boolean = false;
  public keyboardPlacement: KeyboardPlacement = KeyboardPlacement.Bottom;//这个也应该是配置
  public hasShiftKey: boolean = false;

  public parentDom: HTMLElement = document.body; //这个父级元素应该是匹配的

  public keyboardCss: KeyboardCss = {
    keyboardContainer: 'aui-keyboard-container-',
    keyboard: "aui-keyboard",
    keySet: "aui-keyboard-keyset"
  };

  public keyboardContiner!: HTMLDivElement;

  constructor(currentInputElement: any, keyboardOptions: KeyboardConfig) {
    this.currentInputElement = currentInputElement;

    this.keyboardOptions = keyboardOptions;
  }

  public abstract show(): void;
  public abstract close(): void;
  public abstract getLayoutAllInfo(layout?: any, layoutName?: string): void;

  public createKeyboardContainer(): void {
    this.keyboardContiner = document.createElement('div');

    //此处的事件监听应该抽取出来,这些应该有一个更加优雅的方式，切面，装饰器还是什么设计模式，不要这样写
    this.keyboardContiner.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
    this.keyboardContiner.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });

    this.keyboardContiner.classList.add(this.keyboardCss.keyboardContainer + this.keyboardName);
  }

  public createLayout(layoutOptions: LayoutOptions): void {
    let layoutConfig = {
      layouts: layoutOptions.layout,
      layoutName: layoutOptions.layoutName,
      ownerKeyboardName: this.keyboardName,
      ownerKeyboard: this,
      currentInputElement: this.currentInputElement,
      setInitState: layoutOptions.setInitState,
      disabledLayoutKeyList: <Set<string>>layoutOptions.disabledLayoutKeyList
    };

    let layoutContainer = LayoutFactory.layoutGenerator(layoutConfig);

    if (layoutContainer && layoutOptions.hasLayoutKey && layoutOptions.layoutInitState) {
      StateMachine.register('layout', layoutOptions.layoutName, layoutContainer);
      StateMachine.initState('layout', layoutOptions.layoutInitState);
    }

    if (!layoutContainer) throw new Error('keyboard: layout is create failed');

    this.keyboardContiner.appendChild(layoutContainer);
  }

  //这个函数应该优化,对于用户的使用，一定要友好，尽量让用户感受到友好, 函数的功能还需要更加的具体
  public async initConfig(): Promise<void> {
    this.keyboardName = this.keyboardOptions.type;//这句应该移走

    console.log('keyboardOptions', this.keyboardOptions);

    //此处在设置布局,此处的属性名称需要更改
    let layoutList = this.keyboardOptions.layout.supplyKeyboardType.layoutList;
    let layout;

    //此处的逻辑需要进行优化
    if (Array.isArray(layoutList) && layoutList.length > 1) {
      for (let layoutName of layoutList) {
        if (typeof layoutName === 'string') {
          layout = await LayoutFileLoader.layoutFileAsync(layoutName);

          this.layouts.set(layoutName, layout);
        }

        if (isPlainObject(layoutName)) {
          this.layouts.set(layoutName.layoutName, layoutName.layout);
        }
      }
      return;
    }

    if (Array.isArray(layoutList) && layoutList.length == 1) {
      layoutList = layoutList[0];
    }

    if (isPlainObject(layoutList)) {
      layout = layoutList;
    }

    if (typeof layoutList === 'string') {
      layout = await LayoutFileLoader.layoutFileAsync(this.keyboardName);
    }

    if (!layout) {
      throw new Error('failed layout info');
    }

    this.layouts.set(this.keyboardOptions.type, layout);

    this.keyboardPlacement = this.keyboardOptions.keyboardPlacement;

    this.isShow = true; // 此处需要根据配置项重新配置
  };

  public getSetInitState(layout: any): string {
    return layout.InitSet ? layout.InitSet : "";
  }
};
