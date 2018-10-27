import { KeyInfo, KeyConfig } from "../../interface";
import { KeyActionType } from "../key-action/key-action-type";
import { KeyEventListenerType } from "../event-listener/event-listener-type";
import { KeyPosManager } from "../../keyboard-pos-manager/key-pos-manager";
import { KeyEvent } from "../key-event";

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
  isReadOnly: string;
}

interface ButtonAttr {
  'data.value': string;
  'data.name': string;
  'data-pos': string;
  'data.action': string;
  'isDisabled': boolean;
  'isReadOnly': boolean;
};

//对于key的属性，应该提取成一个接口，进行继承
export abstract class Key {
  public static keyContainerWidth: number = 38.75; //对于实例化时,应该如何合并
  public static keyContainerHeight: number = 38.75;

  public keyContainerWidth: number = Key.keyContainerWidth;
  public keyContainerHeight: number = Key.keyContainerHeight;
  public keyWidth: number = 37;
  public keyHeight: number = 37;

  public _keyBtnElement!: HTMLButtonElement;

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
    isReadOnly: "aui-keyboard-key-readOnly"
  }

  public keyInfo: KeyInfo;
  public currentInputElement: HTMLInputElement;

  public keyActionType: KeyActionType;
  public keyEventListenerType: KeyEventListenerType;
  public inputType: string;

  public isActionKey: boolean;
  public isCharacterkey: boolean;
  public isPlainActionKey: boolean = false;
  public isChineseKey: boolean = false;
  public isCustomKey: boolean = false;
  public isLayoutKey: boolean;
  public isComposing: boolean;
  public setInitState: string;
  public isReadOnly: boolean;
  public isDisabled: boolean;

  public keyboardName: string;
  public ownerLayoutName: string;
  public ownerSetName: string;
  public keyName: string;
  public keyActionName: string;
  public keyTxt: string;

  public key: string;
  public code: string;
  public keyCode: number;
  public ctrlKey: boolean;
  public shiftKey: boolean;
  public metaKey: boolean;
  public altKey: boolean;

  //数字小键盘，如何布局???
  //此处需要考虑怎么处理
  //修改键盘的布局形式，键盘的设计交给用户,下一阶段进行设计
  public isNumeric: boolean;
  public numberMargin: number = 0; //对于数字小键盘，如何标记

  constructor(keyInfo: KeyInfo, currentInputElement: HTMLInputElement, keyConfig: KeyConfig) {
    this.keyInfo = keyInfo;
    this.currentInputElement = currentInputElement;
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
    this.isReadOnly = keyConfig.isReadOnly;
  }

  public abstract buildContent(): void;

  public initKeyBtn(): void {
    if (this.isDisabled || this.isReadOnly) return;

    this._createKeyBtn(this._setKeyBtnStyle());

    //对于按键位置的计算，需要在创建之后在进行,移走,按键的位置计算，需要仔细思考下怎么设计
    KeyPosManager.computedKeyPosition(this.keyInfo, this);

    //注册事件
    KeyEvent.registerEvent(this);
  }

  private _createKeyBtn(keyAttr: { keyClass: string, buttonAttr: ButtonAttr }): void {
    this._keyBtnElement = document.createElement('button');

    keyAttr.keyClass.split(' ').forEach((className) => {
      this._keyBtnElement.classList.add(className);
    });

    for (let attr in keyAttr.buttonAttr) {
      this._keyBtnElement.setAttribute(attr, keyAttr.buttonAttr[attr]);
    }
  }

  private _setKeyBtnStyle(): { keyClass: string, buttonAttr: ButtonAttr } {
    let keyClass = '';

    this.isActionKey ? keyClass = this.css.keyAction + ' ' + this.css.keyPrefix + this.keyName : keyClass = this.keyName === '' ? '' : this.css.keyPrefix + this.keyName;
    this.shiftKey && (keyClass += " " + this.css.setKey + ' ' + this.css.setKey + this.ownerSetName);

    this.isDisabled && (keyClass += " " + this.css.isDisabled);
    this.isReadOnly && (keyClass += " " + this.css.isReadOnly);

    keyClass += (this.keyName.length > 2 ? ' ' + this.css.keyWide : '') + ' ' + this.css.buttonDefault + ' ' + this.css.keyButton;

    let buttonAttr: ButtonAttr = {
      'data.value': this.keyTxt,
      'data.name': this.keyActionName,
      'data.action': this.keyName,
      'data-pos': this.keyInfo.col + ' ' + this.keyInfo.row,
      'isDisabled': this.isDisabled,
      "isReadOnly": this.isReadOnly
    };

    return {
      keyClass: keyClass,
      buttonAttr: buttonAttr
    }
  }
};
