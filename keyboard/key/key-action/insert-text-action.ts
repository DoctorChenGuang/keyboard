import { KeyAction } from './key-action';
import { Key } from '../key';

//返回的函数的接口约束需要抽取出来,对于参数的定义需要规范化

export class InsertTextAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let insertTextAction: InsertTextAction = new InsertTextAction();

    return insertTextAction.actionHandler.bind(insertTextAction);
  }

  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement): void {
    if (this._isMaxLength(action, key, currentElement)) return;

    currentElement.setRangeText && currentElement.setRangeText(action, currentElement.selectionStart, currentElement.selectionEnd, 'end');
  }

  private _isMaxLength(action: string, key: Key, currentElement: HTMLInputElement): boolean {
    if (this._isChineseKey(action, key.ownerLayoutName)) return false;

    const currentElementMaxlength = currentElement.getAttribute('maxlength');

    if (!currentElementMaxlength) return false;

    if (currentElement.value.length < parseInt(currentElementMaxlength)) return false;

    return true;
  }

  private _isChineseKey(action: string, layoutName: string): boolean {
    return (/chinese/.test(layoutName) && /[a-zA-Z]/.test(action)) ? true : false;
  }
};
