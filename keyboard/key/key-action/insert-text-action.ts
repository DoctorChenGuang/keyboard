import { KeyAction } from './key-action';
import { Key } from '../key';
import { ChineseLayout } from '../../chinese/chinese-layout';

//返回的函数的接口约束需要抽取出来,对于参数的定义需要规范化
export class InsertTextAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let insertTextAction: InsertTextAction = new InsertTextAction();

    return insertTextAction.actionHandler.bind(insertTextAction);
  }

  public async actionHandler(action: string, key: Key| any, currentElement: HTMLInputElement): Promise<void> {
    //对于超过最大值，不应该在这里判断，他还会有事件的影响
    if (this._isMaxLength(action, key, currentElement)) return;

    //对于中文按键，需要进行特殊处理
    if (this._isChineseKey(action, key.ownerLayoutName)) {
      // console.log('这是中文按键', ChineseLayout);
      //应该判断是否为中文输入状态
      //对于这些函数，应该放在chinese-layout里面进行。

      await ChineseLayout.instance.chineseInsertAction(action);
      return;
    }

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
