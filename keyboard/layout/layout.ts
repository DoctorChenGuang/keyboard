import { Keyboard } from "../keyboard-manager";
import { LayoutConfig } from "../interface";

interface LayoutCss {
  layoutContainer: string;
  keySet: string;
}

export abstract class Layout {
  public layoutName: string;
  public hasShiftKey: boolean = false;
  public ownerKeyboardName: string;
  public ownerKeyboard: Keyboard;
  public layouts: any;
  public currentInputElement: HTMLInputElement;
  public setInitState: string;
  public setList: Set<string> = new Set();
  public disabledLayoutKeyList: Set<string>;

  public currentLayoutContainer!: HTMLDivElement;
  public layoutCss: LayoutCss = {
    layoutContainer: 'layout-container',
    keySet: "aui-keyboard-keyset"
  }

  //对于属性的设置，需要着重考虑, 不需要的清除掉
  constructor(layoutConfig: LayoutConfig) {
    this.layouts = layoutConfig.layouts;
    this.layoutName = layoutConfig.layoutName;
    this.ownerKeyboardName = layoutConfig.ownerKeyboardName;
    this.ownerKeyboard = layoutConfig.ownerKeyboard;
    this.currentInputElement = layoutConfig.currentInputElement;
    this.setInitState = layoutConfig.setInitState;
    this.disabledLayoutKeyList = layoutConfig.disabledLayoutKeyList;
  }

  public createLayout(): HTMLDivElement | void {
    this.currentLayoutContainer = this._createLayoutContainer();
    if (!this.currentLayoutContainer) throw new Error('layout container is not exists');

    return this.currentLayoutContainer;
  }

  public register(layoutContentDOM: HTMLElement | any) {
    if (!layoutContentDOM) return;

    this.currentLayoutContainer.appendChild(layoutContentDOM);
  }

  //对于div的创建,应该有一个单独的函数进行生成,函数重复
  private _createLayoutContainer(): HTMLDivElement {
    let layoutContainer = document.createElement('div');

    layoutContainer.classList.add(this.layoutCss.layoutContainer);
    layoutContainer.classList.add(this.layoutCss.layoutContainer + '-' + this.layoutName);

    return layoutContainer;
  }
}
