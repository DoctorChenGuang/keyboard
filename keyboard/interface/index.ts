import { KeyActionType } from "../key/key-action/key-action-type";
import { KeyEventListenerType } from "../key/event-listener/event-listener-type";
import { Keyboard } from "../keyboard-manager";

//对于接口的定义，是否应该是全局的
export interface KeyInfo {
  key: string;
  row: string;
  col: string;
  colspan: string;
  rowspan?: string;
}

export interface KeyConfig {
  keyName: string;
  isActionKey: boolean;
  isDisabled: boolean;
  isCharacterkey: boolean;
  keyActionType: KeyActionType;
  ownerLayoutName: string;
  keyEventListenerType: KeyEventListenerType;
  isChineseKey: boolean;
  isCustomKey: boolean;
  isLayoutKey: boolean;
  inputType: string;
  key: string;
  code: string;
  keyCode: number;
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  keyTxt: string;
  keyboardName: string;
  ownerSetName: string;
  isComposing: boolean;
  keyActionName: string;
  setInitState: string;
  isNumeric: boolean;
  isReadOnly: boolean;
}

export interface LayoutConfig {
  layoutName: string;
  ownerKeyboardName: string;
  ownerKeyboard: Keyboard;
  layouts: any;
  currentInputElement: HTMLInputElement;
  setInitState: string;
  disabledLayoutKeyList: Set<string>;
}

export interface LayoutOptions {
  layout: string;
  layoutName: string;
  setInitState: string;
  isDisabled: boolean;
  layoutInitState?: string;
  hasLayoutKey: boolean;
  disabledLayoutKeyList?: Set<string>;
}

export enum PinyinCombStrUpdateType {
  Cancel,
  Insert,
  Update
}