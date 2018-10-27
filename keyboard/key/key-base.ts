import { KeyEventListenerType } from "./event-listener/event-listener-type";
import { KeyActionType } from "./key-action/key-action-type";
import { KeyConfig, KeyInfo } from '../interface';
import { KeyPosManager } from "../keyboard-pos-manager/key-pos-manager";
import { KeyEvent } from "./key-event";
import { Key } from "./key";
import { CanvasManagerInstance } from "../handwriting-canvas/canvas-manager";
import { CandidateSlot } from '../handwriting-canvas'; //此处的写法需要修改，暂时先完成功能

interface KeyCss {
  keyText: string;
  keyPrefix: string;
  keyAction: string;
  buttonDefault: string;
  keyWide: string;
  keyButton: string;
  keyActive: string;
  isDisabled: string;
  setKey: string;
}

//对于key，还应该继续拆开,需要更加细化
export abstract class KeyBase {
  //这两个属性应该是可以设置的
  public static keyContainerWidth: number = 38.75;
  public static keyContainerHeight: number = 38.75;

  public keyContainerWidth: number = KeyBase.keyContainerWidth;
  public keyContainerHeight: number = KeyBase.keyContainerHeight;
  public keyWidth: number = 37;
  public keyHeight: number = 37;
  public _keyBtnElement!: HTMLButtonElement;
  public action: string = '';

  public css: KeyCss = {
    keyText: "aui-keyboard-text",
    keyPrefix: 'aui-keyboard-',
    keyAction: 'aui-keyboard-actionkey',
    buttonDefault: 'aui-state-default aui-corner-all',
    keyWide: 'aui-keyboard-widekey',
    keyButton: 'aui-keyboard-button',
    keyActive: 'aui-keyboard-key-active',
    isDisabled: "aui-keyboard-key-disabled",
    setKey: 'aui-keyboard-set-key',
  }

  public keyInfo: KeyInfo;
  public currentElement: HTMLInputElement;
  public isActionKey: boolean;
  public isDisabled: boolean;
  public isCharacterkey: boolean;
  public isPlainActionKey: boolean = false;
  public isChineseKey: boolean = false;
  public isCustomKey: boolean = false;
  public keyActionType: KeyActionType;
  public ownerLayoutName: string;
  public keyEventListenerType: KeyEventListenerType;
  public isLayoutKey: boolean;
  public inputType: string;
  public key: string;
  public code: string;
  public keyCode: number;
  public ctrlKey: boolean;
  public shiftKey: boolean;
  public metaKey: boolean;
  public altKey: boolean;
  public keyTxt: string;
  public keyboardName: string;
  public ownerSetName: string;
  public keyName: string;
  public isComposing: boolean;
  public keyActionName: string;
  public setInitState: string;

  public isNumeric: boolean;
  public numberMargin: number = 0; //对于数字小键盘，如何标记

  //此处需要可配置????
  public inkRecognitionHandlerType: string = 'web';//这个配置项应该是在手写布局里面配置的

  constructor(keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig) {
    this.keyInfo = keyInfo;
    this.currentElement = currentElement;
    this.isActionKey = keyConfig.isActionKey;
    this.isCharacterkey = keyConfig.isCharacterkey;
    this.isChineseKey = keyConfig.isChineseKey;
    this.isCustomKey = keyConfig.isCustomKey;
    this.isLayoutKey = keyConfig.isLayoutKey;
    this.ownerLayoutName = keyConfig.ownerLayoutName;
    this.keyActionType = keyConfig.keyActionType;
    this.keyEventListenerType = keyConfig.keyEventListenerType;
    this.inputType = keyConfig.inputType;
    this.key = keyConfig.key;
    this.code = keyConfig.code;
    this.keyCode = keyConfig.keyCode;
    this.ctrlKey = keyConfig.ctrlKey;
    this.shiftKey = keyConfig.shiftKey;
    this.metaKey = keyConfig.metaKey;
    this.altKey = keyConfig.altKey;
    this.keyTxt = keyConfig.keyTxt;
    this.keyboardName = keyConfig.keyboardName;
    this.ownerSetName = keyConfig.ownerSetName;
    this.isDisabled = keyConfig.isDisabled;
    this.keyName = keyConfig.keyName;
    this.isComposing = keyConfig.isComposing;
    this.keyActionName = keyConfig.keyActionName;
    this.setInitState = keyConfig.setInitState;
    this.isNumeric = keyConfig.isNumeric;
  }

  public initKeyBtn(_this: Key): void {
    let keyStyle = this._setKeyBtnStyle();

    this.createKeyBtn(keyStyle.keyClass, keyStyle.keyContent, keyStyle.buttonAttr);

    //对于按键位置的计算，需要在创建之后在进行,移走,按键的位置计算，需要仔细思考下怎么设计
    KeyPosManager.computedKeyPosition(this.keyInfo, _this);

    if (this.isDisabled) return;

    KeyEvent.registerEvent(_this);
  }

  public createKeyBtn(keyClass: string, keyContent: string, buttonAttr: any) {
    this._keyBtnElement = document.createElement('button');

    let keyClassList = keyClass.split(' ');

    for (let value of keyClassList) {
      this._keyBtnElement.classList.add(value);
    }

    this._keyBtnElement.innerHTML = keyContent;

    this._isCanvasBtn() && this._createCanvas(); // 这个应该有更好的处理方式
    this.action === 'candidate' && CandidateSlot.candidateSlotList.push(this);

    for (let item in buttonAttr) {
      this._keyBtnElement.setAttribute(item, buttonAttr[item]);
    }
  }

  private _setKeyBtnStyle() {
    let keyClass, data: any = {}, keys: any = {};

    const disabledButton = this.isDisabled;

    this.action = this.isActionKey ? this.keyActionName : this.keyInfo.key;
    keys.action = keys.name = this.isActionKey ? this.keyName : this.keyInfo.key;

    keys.value = this.keyTxt;

    data.name = this.isActionKey ? keys.action : keys.name;

    if (this.isActionKey) {
      keyClass = this.css.keyAction + ' ' + this.css.keyPrefix + keys.action;
    } else {
      keyClass = data.name === '' ? '' : this.css.keyPrefix + data.name;
    }

    this.shiftKey && (keyClass += " " + this.css.setKey + ' ' + this.css.setKey + this.ownerSetName);

    disabledButton && (keyClass += " " + this.css.isDisabled);

    keyClass += (keys.name.length > 2 ? ' ' + this.css.keyWide : '') + ' ' + this.css.buttonDefault + ' ' + this.css.keyButton;
    data.html = !this._isCanvasBtn() ? `<span class="${this.css.keyText}">${this.isActionKey ? keys.value : keys.name}</span>` : "";

    return {
      keyClass: keyClass,
      keyContent: data.html,
      buttonAttr: {
        'data-value': keys.value,
        'data.name': keys.action,
        'data-pos': this.keyInfo.col + ' ' + this.keyInfo.row,
        'data.action': keys.action,
        'data.html': data.html,
        'isDisabled': disabledButton
      }
    }
  }

  //此处应该提取出来放到手写布局中,对于按键的名称定义需要进行规范化
  private _isCanvasBtn(): boolean {
    return (this.action === 'handwriting-left' || this.action === 'handwriting-right') ? true : false;
  }

  private _createCanvas(): void {
    CanvasManagerInstance.register(this._getCanvasName(), this._keyBtnElement, this.inkRecognitionHandlerType);
  }

  private _getCanvasName(): string {
    return this.action.split('-').map((value) => {
      return value[0].toLocaleUpperCase() + value.substring(1);
    }).join('');
  }
};
