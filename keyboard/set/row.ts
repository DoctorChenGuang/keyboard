import { SetOfLayout } from './set-of-layout';
import { KeyInfo, KeyConfig } from '../interface';
import { initKeyConfig, KeyFactory, Key } from '../key';
import { util } from '../util';
import { getKeyActionType } from '../key/key-action';

export class Row {
  public setContainer: HTMLDivElement;
  public setName: string;
  public set: SetOfLayout;
  public currentInputElement: HTMLInputElement;

  constructor(set: SetOfLayout, setContainer: HTMLDivElement, setName: string) {
    this.set = set;
    this.setContainer = setContainer;
    this.setName = setName;
    this.currentInputElement = set.currentInputElement;
  }

  public static create(set: SetOfLayout, setContainer: HTMLDivElement, setName: string, rowList: Array<KeyInfo>): void {
    new Row(set, setContainer, setName).createRow(rowList);
  }

  public createRow(rowList: Array<KeyInfo>): void {
    rowList.forEach((key: KeyInfo) => {
      let keyConfig = initKeyConfig({ keyInfo: key, ownerLayoutName: this.set.currentLayout.layoutName, keyboardName: this.set.currentLayout.ownerKeyboardName, ownerSetName: this.setName, disabledLayoutKeyList: this.set.currentLayout.disabledLayoutKeyList, setInitState: this.set.currentLayout.setInitState });

      //此处需要修改
      // let keyBtn = Key.create(key, this.currentInputElement, keyConfig);
      let keyBtn = KeyFactory.create("normal", key, this.currentInputElement, keyConfig);

      this.setContainer.appendChild(keyBtn._keyBtnElement);
    });
  }

  //是否为只读readonly
  public initKeyConfig({ keyInfo, ownerLayoutName, keyboardName, ownerSetName, disabledLayoutKeyList, setInitState }: { keyInfo: KeyInfo, ownerLayoutName: string, keyboardName: string, ownerSetName: string, disabledLayoutKeyList: Set<string>, setInitState: string }): KeyConfig {
    let keyName = util.getKeyName(keyInfo.key);
    let keyCodeAndKey = util.getKeyCodeType(keyName, ownerLayoutName);

    return {
      keyName: keyName,
      isActionKey: util.isActionkey(keyInfo.key),
      isCharacterkey: util.isCharacterkey(keyName, ownerLayoutName),
      isChineseKey: util.isChineseKey(ownerLayoutName),
      isCustomKey: util.isCustomKey(keyName),
      isLayoutKey: util.isLayoutKey(keyInfo.key),
      ownerLayoutName: ownerLayoutName || keyboardName,
      keyActionType: getKeyActionType(keyName),
      keyEventListenerType: util.getKeyEventListenerType(keyName),
      inputType: util.getInputType(keyName, ownerLayoutName),
      key: util.getKey(keyName, ownerLayoutName),
      code: keyCodeAndKey.code,
      keyCode: keyCodeAndKey.keyCode,
      ctrlKey: util.isCtrlKey(keyName),
      shiftKey: util.isShiftKey(keyInfo),
      metaKey: util.isMetaKey(keyName),
      altKey: util.isAltKey(keyName),
      keyTxt: util.getKeyTxt(keyInfo.key),
      keyboardName: keyboardName,
      ownerSetName: ownerSetName,
      isDisabled: util.isDisabled(keyName, disabledLayoutKeyList), //禁用的按键应该是配置出来的,
      isComposing: false, //是否为中文输入状态需要配置
      keyActionName: util.getKeyActionName(keyName),
      setInitState: setInitState,
      isNumeric: util.isNumeric(keyName, ownerLayoutName),
      isReadOnly: false
    }
  };
};
