import { KeyEventListenerType } from "../key/event-listener/event-listener-type";
import { KeyInfo } from "../interface";

interface KeyCodeAndKey {
  code: string;
  keyCode: number;
}

export function isPlainObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === "[object Object]" ? true : false;
}

export function mergeOptions(defaultOptions, newOptions) {
  console.log('合并选项');
}

// 应该有一个CompsingState状态，用于判断是否是中文输入状态  //如果是中文输入状态,
export function isComposing(ownerLayoutName: string): boolean {
  let isCompsing = true;

  return ownerLayoutName === 'chinese' && isCompsing;
}

export function isDisabled(keyName: string, disabledLayoutKeyList: Set<string>): boolean {
  return disabledLayoutKeyList ? disabledLayoutKeyList.has(keyName) : false;
}

export function getKeyEventListenerType(keyName: string): KeyEventListenerType {
  return keyName === 'backspace' ? KeyEventListenerType.Backspace : KeyEventListenerType.Normal;
}

export function isActionkey(keyName: string): boolean {
  return /^\{(\S+)\}$/.test(keyName);
}

export function isCustomKey(keyName: string): boolean {
  let customKeyList = ['chinese', 'symbol', 'write', 'english', "close"];

  return customKeyList.indexOf(keyName) !== -1;
}

//中文大写有问题XXXXXX
export function isCharacterkey(ownerLayoutName: string, keyName: string): boolean {
  return ownerLayoutName !== 'chinese' && !isActionkey(keyName);
}

//纯功能按键不会影响输入场的字符输入
export function isPlainActionKey(keyName: string): boolean {
  return isActionkey(keyName) && keyName !== 'enter' && keyName !== 'backspace';
}

export function isChineseKey(ownerLayoutName: string): boolean {
  return ownerLayoutName === 'chinese';
}

export function isLayoutKey(key: string): boolean {
  let isLayoutKey = false;

  getKeyInfo(key, (keyArr) => {
    isLayoutKey = keyArr[1] ? keyArr[1].indexOf(KeyKeywords.LayoutKey) > -1 : false;
  });

  return isLayoutKey;
}

export function isCtrlKey(keyName: string): boolean {
  return keyName === 'ctrl';
}

export function isShiftKey(keyInfo: KeyInfo): boolean {
  let shiftKey = false;

  getKeyInfo(keyInfo.key, (keyArr) => {
    shiftKey = keyArr[1] ? keyArr[1].indexOf(KeyKeywords.Shift) > -1 : false;
  });

  return shiftKey;
}

export function isMetaKey(keyName: string): boolean {
  return keyName === 'meta';
}

export function isAltKey(keyName: string): boolean {
  return keyName === 'alt';
}

export function getKeyName(key: string): string {
  let keyName = key;

  getKeyInfo(key, (keyArr) => {
    keyName = keyArr[0];
  });

  return keyName;
}

export function getKeyActionName(keyName: string): string {
  return keyName === 'space' ? " " : keyName;
}

export function getKeyTxt(key: string): string {
  let keyTxt = key;

  getKeyInfo(key, (keyArr) => {
    keyTxt = KeyName[keyArr[0]] === undefined ? keyArr[0] : KeyName[keyArr[0]];
  });

  return keyTxt;
}

export function getKeyInfo(key: string, cb: (keyArr: Array<string>) => void): void {
  let reg: RegExp = /^\{(\S+)\}$/;
  if (!reg.test(key)) return;

  let actionInfo = key.match(/^\{(\S+)\}$/);
  if (actionInfo === null) return;

  let keyInfo: string = actionInfo[1];

  let keyArr: Array<string> = keyInfo.split(':');

  cb(keyArr);
}

export function isChineseLayout(ownerLayoutName: string): boolean {
  return ownerLayoutName === 'chinese';
}

export function getInputType(keyName: string, ownerLayoutName: string): string {
  let inputType;

  if (isChineseLayout(ownerLayoutName)) return InputType.InsertCompositionText;

  switch (keyName) {
    case 'backspace':
      inputType = InputType.DeleteContentBackward;
      break;

    case 'enter':
      inputType = InputType.InsertLineBreak;
      break;

    default:
      inputType = InputType.InsertText;
      break;
  }

  return inputType;
}

export function getKey(keyName: string, ownerLayoutName: string): string {
  let key = "";

  if (isChineseLayout(ownerLayoutName)) return CodeType.Process;

  switch (keyName) {
    case "backspace":
      key = CodeType.Backspace;
      break;

    case "enter":
      key = CodeType.Enter;
      break;

    case "space":
      key = " ";
      break;

    case "arrow-left":
      key = CodeType.ArrowLeft;
      break;

    case "arrow-right":
      key = CodeType.ArrowRight;
      break;

    case "capital":
      key = CodeType.Shift;
      break;

    default: key = keyName;
  }

  return key;
}

export function getKeyCodeType(keyName: string, ownerLayoutName: string): KeyCodeAndKey {
  let code = "";
  let keyCode = -1;

  if (/[A-Za-z]/.test(keyName)) code = CodeType.Key + keyName.toUpperCase();
  if (/[A-Za-z]/.test(keyName) && !isChineseLayout(ownerLayoutName)) keyCode = keyName.toUpperCase().charCodeAt(0);
  if (/[A-Za-z]/.test(keyName) && isChineseLayout(ownerLayoutName)) keyCode = KeyCode.Process;

  switch (keyName) {
    case "0":
    case ")":
    case "）":
      code = CodeType.Digit + '0';
      keyCode = KeyCode.Numpad0;
      break;

    case "1":
    case "!":
    case "！":
      code = CodeType.Digit + '1';
      keyCode = KeyCode.Numpad1;
      break;

    case "2":
    case "@":
    case "@":
      code = CodeType.Digit + '2';
      keyCode = KeyCode.Numpad2;
      break;

    case "3":
    case "#":
    case "#":
      code = CodeType.Digit + '3';
      keyCode = KeyCode.Numpad3;
      break;

    case "4":
    case "$":
    case "￥":
      code = CodeType.Digit + '4';
      keyCode = KeyCode.Numpad4;
      break;

    case "5":
    case "%":
    case "%":
      code = CodeType.Digit + '5';
      keyCode = KeyCode.Numpad5;
      break;

    case "6":
    case "^":
    case "……":
      code = CodeType.Digit + '6';
      keyCode = KeyCode.Numpad6;
      break;

    case "7":
    case "&":
    case "&":
      code = CodeType.Digit + '7';
      keyCode = KeyCode.Numpad7;
      break;

    case "8":
    case "*":
    case "*":
      code = CodeType.Digit + '8';
      keyCode = KeyCode.Numpad8;
      break;

    case "9":
    case "(":
    case "（":
      code = CodeType.Digit + '9';
      keyCode = KeyCode.Numpad9;
      break;

    case 'backspace':
      code = CodeType.Backspace;
      keyCode = KeyCode.Backspace;
      break;

    case "enter":
      code = CodeType.Enter;
      keyCode = KeyCode.Enter;
      break;

    case "~":
    case "`":
    case "~":
      code = CodeType.Backquote;
      keyCode = KeyCode.Backquote;
      break;

    case "\\":
    case "|":
    case "|":
      code = CodeType.Backslash;
      keyCode = KeyCode.Backslash;
      break;

    case ".":
    case ">":
    case "》":
      code = CodeType.Period;
      keyCode = KeyCode.Period;
      break;

    case "arrow-left":
      code = CodeType.ArrowLeft;
      keyCode = KeyCode.ArrowLeft;
      break;

    case "arrow-right":
      code = CodeType.ArrowRight;
      keyCode = KeyCode.ArrowRight;
      break;

    case "arrow-up":
      code = CodeType.ArrowUp;
      keyCode = KeyCode.ArrowUp;
      break;

    case "arrow-down":
      code = CodeType.ArrowDown;
      keyCode = KeyCode.ArrowDown;
      break;

    case ",":
    case "<":
    case "《":
      code = CodeType.Comma;
      keyCode = KeyCode.Comma;
      break;

    case "capital":
      code = CodeType.CapsLock;
      keyCode = KeyCode.CapsLock;
      break;

    case "shift":
      code = CodeType.ShiftLeft;
      keyCode = KeyCode.ShiftLeft;
      break;

    case "space":
      code = CodeType.Space;
      keyCode = KeyCode.Space;
      break;

    case "/":
    case "?":
    case "？":
      code = CodeType.Slash;
      keyCode = KeyCode.Slash;
      break;

    case ";":
    case ":":
    case "：":
      code = CodeType.Semicolon;
      keyCode = KeyCode.Semicolon;
      break;

    case "'":
    case '"':
    case "“":
    case "”":
      code = CodeType.Quote;
      keyCode = KeyCode.Quote;
      break;

    case "]":
    case "}":
    case "}":
      code = CodeType.BracketRigh;
      keyCode = KeyCode.BracketRigh;
      break;

    case "[":
    case "{":
    case "{":
      code = CodeType.BracketLeft;
      keyCode = KeyCode.BracketLeft;
      break;

    case "-":
    case "_":
    case "——":
      code = CodeType.Minus;
      keyCode = KeyCode.Minus;
      break;

    case "+":
    case "=":
    case "+":
      code = CodeType.Equal;
      keyCode = KeyCode.Equal;
      break;
  }

  if (/[0-9]/.test(keyName)) {
    keyCode = KeyCode.Numpad0 + parseInt(keyName);
  }

  return {
    code: code,
    keyCode: keyCode
  };
}

export enum InputType {
  InsertText = 'insertText',
  DeleteContentBackward = 'deleteContentBackward',
  InsertLineBreak = 'insertLineBreak',
  InsertCompositionText = 'insertCompositionText'
}

export enum CodeType {
  Process = 'Process',
  Shift = 'Shift',
  Key = 'Key',
  Digit = 'Digit',
  Backquote = 'Backquote',
  Backspace = 'Backspace',
  Backslash = 'Backslash',
  Enter = 'Enter',
  Period = 'Period',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Comma = 'Comma',
  CapsLock = 'CapsLock',
  ShiftLeft = 'ShiftLeft',
  Space = 'Space',
  Slash = 'Slash',
  Semicolon = 'Semicolon',
  Quote = 'Quote',
  BracketRigh = 'BracketRigh',
  BracketLeft = 'BracketLeft',
  Minus = 'Minus',
  Equal = 'Equal',
  ContextMenu = 'ContextMenu'
};

export enum KeyCode {
  Process = 229, //处于输入中文的状态,只要是中文的，就是都是作为process,keyCode是229，但是是作为字符按键，纯功能按键还是属于自己的keycode
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  ShiftLeft = 16,
  Ctrl = 17,
  Alt = 18,
  Break = 19,
  CapsLock = 20,
  Esc = 27,
  End = 35,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  ArrowDown = 40,
  Delete = 46,
  Numpad0 = 96,
  Numpad1 = 97,
  Numpad2 = 98,
  Numpad3 = 99,
  Numpad4 = 100,
  Numpad5 = 101,
  Numpad6 = 102,
  Numpad7 = 103,
  Numpad8 = 104,
  Numpad9 = 105,
  Minus = 109,
  Numlock = 144,
  Scrolllock = 145,
  Semicolon = 186,
  Backslash = 220,
  Backquote = 192,
  Equal = 61,
  BracketLeft = 219,
  BracketRigh = 221,
  Quote = 222,
  Comma = 188,
  Slash = 191,
  Digit0 = 49,
  Digit1 = 50,
  Digit2 = 51,
  Digit3 = 52,
  Digit4 = 53,
  Digit5 = 54,
  Digit6 = 55,
  Digit7 = 56,
  Digit8 = 57,
  Digit9 = 58,
  Space = 32,
  Period = 190,
};

export enum KeyName {
  "english" = "英文",
  "backspace" = "删除",
  "chinese" = "中文",
  "enter" = "确定",
  "hand-write" = "手写",
  "capital" = "大写",
  "symbol" = "符号",
  "space" = "空格",
  "arrow-left" = "←",
  "arrow-right" = "→",
  "close" = "收起",
  "shift" = "全角",
  "candidate" = "",
  "handwriting-left" = "",
  "handwriting-right" = ""
};

export enum KeyKeywords {
  LayoutKey = 'LayoutKey',
  Shift = 'Shift'
}