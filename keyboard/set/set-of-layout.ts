import { Layout } from "../layout";
import { StateMachine } from "../key";
import { Row } from "./row";
import { KeyInfo } from "../interface";
import { Key } from '../key';

interface setList {
  row: number;
  col: number;
  KeyList: Array<KeyInfo[]>;
};

interface SetCss {
  keySet: string;
};

export class SetOfLayout {
  public setName: string;
  public currentLayout: Layout;
  public currentInputElement: HTMLInputElement;

  public colsNumber: number = 0;
  public rowsNumber: number = 0;

  public setCss: SetCss = {
    keySet: "aui-keyboard-keyset",
  };

  constructor(currentLayout: Layout, setName: string) {
    this.currentLayout = currentLayout;
    this.setName = setName;
    this.currentInputElement = currentLayout.currentInputElement;
  }

  public static create(currentLayout: Layout, set: setList, setName: string = ""): HTMLDivElement {
    return new SetOfLayout(currentLayout, setName).createSet(set);
  }

  public createSet(set: setList): HTMLDivElement {
    this.colsNumber = set.col;
    this.rowsNumber = set.row;
    if (!set.KeyList) throw new Error('layout file doesnot conform to specification');

    let setContainer = this._createSetContainer();

    let keysList = set.KeyList;
    for (let row = 0; row < keysList.length; row++) {
      Row.create(this, setContainer, this.setName, keysList[row]);
    }

    //此处需要重新设计,对于set的名称要重新定义
    this.currentLayout.hasShiftKey && StateMachine.register('set', setContainer, this.currentLayout.layoutName, this.setName);

    return setContainer;
  }

  //对于元素的创建需要更换方式
  private _createSetContainer(): HTMLDivElement {
    let setContainer = document.createElement('div');

    setContainer.classList.add(this.setCss.keySet);
    this.setName && setContainer.setAttribute('name', this.currentLayout.layoutName + "-" + this.setName);
    this.setName && setContainer.classList.add(this.setCss.keySet + '-' + this.currentLayout.ownerKeyboardName + '-' + this.setName);

    setContainer.style.width = Key.keyContainerWidth * this.colsNumber * 2 + 'px';
    setContainer.style.height = Key.keyContainerWidth * this.rowsNumber * 2 + 'px';

    return setContainer;
  }
};
