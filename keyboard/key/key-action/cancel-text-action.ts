import { KeyAction } from "./key-action";
import { Key } from "../key";
import { CanvasManagerInstance, CandidateSlot } from '../../handwriting-canvas';
import { ChineseLayout } from '../../chinese/chinese-layout';

enum Cancel {
  Backspace = 'Backspace'
}

export class CancelTextAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let cancelTextAction: CancelTextAction = new CancelTextAction();

    return cancelTextAction.actionHandler.bind(cancelTextAction);
  }

  //这个地方应该修改
  public async actionHandler(action: string, key: Key, currentElement: HTMLInputElement): Promise<void> {
    //这个方法应该提取出来，不应该放在这里
    if (key.ownerLayoutName === 'hand-write' && CanvasManagerInstance.isPainting) {
      CanvasManagerInstance.clearAllCanvas();
      CandidateSlot.clearCandidate();
      return;
    }

    //此处应该提取出来 && ChineseLayout.instance.pniyinCombStrBarInstance.pinyinCombStr
    // if (key.ownerLayoutName === 'chinese' && ChineseLayout.instance.pniyinCombStrBarInstance.pinyinCombStr) {
    //   console.log('ChineseLayout', ChineseLayout);
    //   //如果拼音字符串不是""，则说明处理输入中文状态，不是联想词状态
    //   // await ChineseLayout.instance.chineseCancelAction();

    //   //删除输入场的字符,如果输入场不是空，则重新得到联想词，否则清空候选词条

    //   console.log('中文键盘删除逻辑');
    //   return;
    // }

    if (currentElement.selectionStart == undefined || currentElement.selectionStart == null) return;

    if (currentElement.value.length <= 0) return;

    if (currentElement.selectionStart <= 0) return;

    currentElement.setRangeText('', currentElement.selectionStart - 1, currentElement.selectionEnd, 'end');
  }
};
