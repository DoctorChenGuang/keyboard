import { KeyAction } from './key-action';
import { Key } from '../key';

export class CloseKeyboardAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let closeKeyboardAction: CloseKeyboardAction = new CloseKeyboardAction();

    return closeKeyboardAction.actionHandler.bind(closeKeyboardAction);
  }

  public actionHandler(action: string): void {
    // console.log('关闭键盘操作');
  }
};
