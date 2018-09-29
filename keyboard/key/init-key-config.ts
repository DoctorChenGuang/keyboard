import {
  getInputType, getKey, getKeyCodeType, isCtrlKey, isShiftKey, isMetaKey, isAltKey, getKeyName, getKeyTxt, getKeyEventListenerType, isActionkey, isCustomKey, isChineseKey, isLayoutKey, isCharacterkey, isComposing,
  getKeyActionName, isDisabled
} from '../util/util';
import { KeyInfo } from '../interface';
import { getKeyActionType } from './key-action/key-action-type';
import { KeyConfig } from '../interface';

//这个函数需要优化
export function initKeyConfig(keyInfo: KeyInfo, ownerLayoutName: string, keyboardName: string, ownerSetName: string, disabledLayoutKeyList: Set<string>): any {
  let keyName = getKeyName(keyInfo.key);

  let keyCodeAndKey = getKeyCodeType(keyName, ownerLayoutName);

  let keyConfig: KeyConfig = {
    keyName: keyName,
    isActionKey: isActionkey(keyInfo.key),
    isCharacterkey: isCharacterkey(keyName, ownerLayoutName),
    isChineseKey: isChineseKey(ownerLayoutName),
    isCustomKey: isCustomKey(keyName),
    isLayoutKey: isLayoutKey(keyInfo.key),
    ownerLayoutName: ownerLayoutName || keyboardName,
    keyActionType: getKeyActionType(keyName),
    keyEventListenerType: getKeyEventListenerType(keyName),
    inputType: getInputType(keyName, ownerLayoutName),
    key: getKey(keyName, ownerLayoutName),
    code: keyCodeAndKey.code,
    keyCode: keyCodeAndKey.keyCode,
    ctrlKey: isCtrlKey(keyName),
    shiftKey: isShiftKey(keyName),
    metaKey: isMetaKey(keyName),
    altKey: isAltKey(keyName),
    keyTxt: getKeyTxt(keyInfo.key),
    keyboardName: keyboardName,
    ownerSetName: ownerSetName,
    isDisabled: isDisabled(keyName, disabledLayoutKeyList), //禁用的按键应该是配置出来的,
    isComposing: false, //是否为中文输入状态需要配置
    keyActionName: getKeyActionName(keyName)
  }

  return keyConfig;
};
