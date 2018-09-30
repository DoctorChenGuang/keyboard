import { StateMachine, Key, initKeyConfig } from "../key";
import { Keyboard } from "../keyboard-manager";
import { KeyInfo, LayoutConfig } from "../interface";

interface LayoutCss {
  layoutContainer: string;
  keySet: string;
}

interface setList {
  row: number;
  col: number;
  KeyList: Array<any>;
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

  public layoutCss: LayoutCss = {
    layoutContainer: 'layout-container',
    keySet: "aui-keyboard-keyset"
  }

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
    let layouts = this.layouts;

    let layoutNameList = Object.keys(layouts);
    if (!layoutNameList) return;

    let currentLayoutContainer = this._createLayoutContainer();

    //keylist的名称应该是可以配置的, 关键词的定义需要谨慎
    if (layoutNameList.findIndex((value) => {
      return value.toLowerCase() === 'keylist'
    }) > -1 && layoutNameList.length === 3) {
      this._createSet(layouts, currentLayoutContainer);
    } else {
      for (let setName of layoutNameList) {
        if (setName === 'InitSet') continue;

        this.setList.add(setName);

        this.hasShiftKey = true;

        this._createSet(layouts[setName], currentLayoutContainer, setName);
      }
    }

    this.hasShiftKey && StateMachine.initState('set', this.setInitState, this.layoutName);

    return currentLayoutContainer;
  }

  private _createSet(set: setList, currentLayoutContainer: HTMLDivElement, setName: string = ""): void {
    if (!set.KeyList) throw new Error('layout file doesnot conform to specification');

    if (!currentLayoutContainer) throw new Error('layout container is not exists');

    let setContainer = this._buildSet(set, setName);

    if (!setContainer) throw new Error('layout create is failed');

    currentLayoutContainer.appendChild(setContainer);
  }

  //对于布局的生成,应该单独提取出来,方便后期布局格式的改动
  private _buildSet(set: setList, setName: string = ""): HTMLDivElement {
    let setContainer = this._createSetContainer(setName);

    let keysList = set.KeyList;

    for (let row = 0; row < keysList.length; row++) {
      this._buildRow(setContainer, keysList[row], setName);
    }

    this.hasShiftKey && StateMachine.register('set', setContainer, this.layoutName, setName);

    return setContainer;
  }

  private _buildRow(currentLayoutContainer: HTMLDivElement, rowList: Array<any>, setName: string): void {
    for (let col = 0; col < rowList.length; col++) {
      this._buildKey(currentLayoutContainer, rowList[col], setName);
    }
  }

  public _buildKey(currentLayoutContainer: HTMLDivElement, key: KeyInfo, setName: string): void {
    let keyConfig = initKeyConfig(key, this.layoutName, this.ownerKeyboardName, setName, this.disabledLayoutKeyList, this.setInitState);

    let keyBtn = Key.getKeyBtn(key, this.currentInputElement, keyConfig);

    currentLayoutContainer.appendChild(keyBtn._keyBtnElement);
  }

  //对于div的创建,应该有一个单独的函数进行生成,函数重复
  private _createLayoutContainer(): HTMLDivElement {
    let layoutContainer = document.createElement('div');

    layoutContainer.classList.add(this.layoutCss.layoutContainer);
    layoutContainer.classList.add(this.layoutCss.layoutContainer + '-' + this.layoutName);

    return layoutContainer;
  }

  private _createSetContainer(setName: string): HTMLDivElement {
    let setContainer = document.createElement('div');

    setContainer.setAttribute('name', this.layoutName + "-" + setName);
    setContainer.classList.add(this.ownerKeyboard.keyboardCss.keyboard);
    setContainer.classList.add(this.ownerKeyboard.keyboardCss.keyboard + '-' + this.ownerKeyboardName);
    setContainer.classList.add(this.layoutCss.keySet + '-' + this.ownerKeyboardName + '-' + setName);

    return setContainer;
  }
}
