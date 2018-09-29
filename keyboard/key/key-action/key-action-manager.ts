import { Key } from '../key';
import { KeyActionType } from './key-action-type';
import {
  ArrowMoveAction,
  CancelTextAction,
  CloseKeyboardAction,
  InsertTextAction,
  CandidateSlotAction,
  SwtichSetAction,
  LayoutSwitchAction
} from './index';

//对于事件的添加，有点过于复杂，最好优化一下，应该提供一个接口，用于注册事件,注册一次，永久使用,我们是目标是优雅，优雅，优雅！！！
class KeyEventManager {
  public _keyEventList: Map<KeyActionType, (action: string, key: Key, currentElement: HTMLInputElement) => void> = new Map<KeyActionType, (action: string, key: Key, currentElement: HTMLInputElement) => void>();

  public register(keyActionType: KeyActionType, keyAction: (action: string, key: Key, currentElement: HTMLInputElement) => void) {
    this._keyEventList.set(keyActionType, keyAction);
  }

  public unregister(keyActionType: KeyActionType) {
    this._keyEventList.delete(keyActionType);
  }

  public getKeyAction(keyActionType: KeyActionType): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    if (!this._keyEventList.get(keyActionType)) return () => ""; // 判断需要写的准确点

    return this._keyEventList.get(keyActionType) as (action: string, key: Key, currentElement: HTMLInputElement) => void;
  }
}
//这种写法需要修改
let KeyEventManagerInstance: KeyEventManager = new KeyEventManager();

KeyEventManagerInstance.register(KeyActionType.ArrowMoveAction, ArrowMoveAction.getKeyAction());
KeyEventManagerInstance.register(KeyActionType.CancelTextAction, CancelTextAction.getKeyAction());
KeyEventManagerInstance.register(KeyActionType.CloseKeyboardAction, CloseKeyboardAction.getKeyAction());
KeyEventManagerInstance.register(KeyActionType.InsertTextAction, InsertTextAction.getKeyAction());
KeyEventManagerInstance.register(KeyActionType.CandidateSlotAction, CandidateSlotAction.getKeyAction());
KeyEventManagerInstance.register(KeyActionType.SwtichSetAction, SwtichSetAction.getKeyAction());
KeyEventManagerInstance.register(KeyActionType.LayoutSwitchAction, LayoutSwitchAction.getKeyAction());

export { KeyEventManagerInstance };//这个名字应该修改
