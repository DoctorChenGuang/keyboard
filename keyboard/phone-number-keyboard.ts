import { Keyboard } from "./keyboard-manager/keyboard";
import { Key } from "./key";
import { initKeyConfig } from './key/init-key-config';
import { KeyInfo } from './interface';
import { StateMachine } from './key/key-action/state-manchine';

interface KeyboardConfig {
  [propName: string]: any;
}

interface setList {
  row: number;
  col: number;
  KeyList: Array<any>;
}

export class PhoneNumberKeyboard extends Keyboard {
  public phoneNumberKeyboard!: PhoneNumberKeyboard;

  public hasShiftKey: boolean = false;

  public setMap: Map<string, any> = new Map();

  public ownerLayoutName!: string;

  constructor(currentInputElement: any, keyboardOptions: KeyboardConfig) {
    super(currentInputElement, keyboardOptions);
  }

  public async show(): Promise<void> {
    await this.initConfig();

    this.createLayout();

    this.keyboardContiner.classList.add(this.keyboardCss.keyboardContainer + this.keyboardName);
    document.body.appendChild(this.keyboardContiner);
  }

  //这个函数应该是单独的，方便后期结构变化更改。最好是所有的都可以使用，方法应该更加抽象
  //创建布局的需要重新书写，因为文件的结构变化了，对于布局的创建，应该提取出来。
  public createLayout(): void {
    let currentLayoutContainer = this.createPhoneNumberKeyboardContainer();
    //对于布局的显示隐藏需要单独的函数进行区分，函数功能要具体化
    this.isShow ? currentLayoutContainer.style.display = "block" : currentLayoutContainer.style.display = "none";

    this.ownerLayoutName = this.keyboardName;//这个赋值需要一个恰当的时机

    let layouts = this.layouts.get(this.ownerLayoutName);

    let layoutNameList = Object.keys(layouts);

    if (!layoutNameList) return;

    if (layoutNameList.indexOf('KeyList') > -1 && layoutNameList.length === 3) {
      //内部逻辑重复，需要修改
      this.hasShiftKey = false;

      let setContainer = this.buildSet(layouts);

      if (!setContainer) throw new Error('layout create is failed');

      currentLayoutContainer.appendChild(setContainer);
    } else {
      this.hasShiftKey = true;

      for (let setName of layoutNameList) {
        console.log("setName", setName);
        let setContainer = this.buildSet(layouts[setName], setName);

        if (!setContainer) throw new Error('layout create is failed');
        currentLayoutContainer.appendChild(setContainer);
      }
    }
    this.keyboardContiner.appendChild(currentLayoutContainer);
  }

  //这个函数应该放在layout里面
  public buildSet(set: setList, setName: string = ""): HTMLDivElement | void {
    if (!set.KeyList) {
      throw new Error('layout file doesnot conform to specification');
    }

    let setContainer = this.createSetContainer(setName);

    let keysList = set.KeyList;

    for (let row = 0; row < keysList.length; row++) {
      this.buildRow(setContainer, keysList[row], setName);
    }

    if (this.hasShiftKey) {
      this.setMap.set(setName, set);
    }

    StateMachine.register('set', setName, setContainer);
    //这个应该是提前配置好的,没有配置项则先使用默认的set， 默认的set也需要考虑什么应该是默认的值
    StateMachine.initState('set', 'test1');

    return setContainer;
  }

  //对于元素的创建也应该单独提取出来
  public buildRow(currentLayoutContainer: HTMLDivElement, rowList: Array<any>, setName: string): void {
    for (let col = 0; col < rowList.length; col++) {
      this.buildKey(currentLayoutContainer, rowList[col], setName);
    }
  }

  public buildKey(currentLayoutContainer: HTMLDivElement, key: KeyInfo, setName: string): void {
    let keyConfig = initKeyConfig(key, this.ownerLayoutName, this.keyboardName, setName);

    this.hasShiftKey = keyConfig.shiftKey ? true : false;

    let keyBtn = Key.getKeyBtn(key, this.currentInputElement, keyConfig);

    currentLayoutContainer.appendChild(keyBtn._keyBtnElement);
  }

  //对于class的添加，应该抽取出来封装为全局的方法，传入className一个对象
  public createPhoneNumberKeyboardContainer(): HTMLDivElement {
    let phoneNumberKeyboardContainer = document.createElement('div');

    phoneNumberKeyboardContainer.setAttribute('name', this.keyboardName);
    //需要添加一些class
    // phoneNumberKeyboardContainer.classList.add(this.keyboardCss.keyboard);
    // phoneNumberKeyboardContainer.classList.add(this.keyboardCss.keyboard + '-' + this.keyboardName);
    // phoneNumberKeyboardContainer.classList.add(this.keyboardCss.keySet + '-' + this.keyboardName + '-' + setName);

    return phoneNumberKeyboardContainer;
  }

  public createSetContainer(setName: string): HTMLDivElement {
    let setContainer = document.createElement('div');

    setContainer.setAttribute('name', this.keyboardName + "-" + setName);
    setContainer.classList.add(this.keyboardCss.keyboard);
    setContainer.classList.add(this.keyboardCss.keyboard + '-' + this.keyboardName);
    setContainer.classList.add(this.keyboardCss.keySet + '-' + this.keyboardName + '-' + setName);

    return setContainer;
  }

  public close() {
    console.log('关闭电话号码键盘');
  }
};
