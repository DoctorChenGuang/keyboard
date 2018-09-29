import { KeyAction } from './key-action';
import { Key } from '../key';

//此处对于按键名称的定义需要规范化
enum Arrow {
  'arrow-up' = "ArrowUp",
  'arrow-down' = "ArrowDown",
  "arrow-left" = "ArrowLeft",
  "arrow-right" = "ArrowRight",
}

enum ArrowNum {
  'arrow-left' = -1,
  'arrow-right' = 1
}

export class ArrowMoveAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let arrowMoveAction: ArrowMoveAction = new ArrowMoveAction();

    return arrowMoveAction.actionHandler.bind(arrowMoveAction);
  }

  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement): void {
    if (currentElement.selectionStart == undefined || currentElement.selectionStart == null) return;

    if (!Arrow[action]) return;

    let dirNum = ArrowNum[action];

    if (currentElement.selectionStart > currentElement.value.length && dirNum == 1) return;

    if (!currentElement.selectionStart && dirNum == -1) return;

    currentElement.setSelectionRange(currentElement.selectionStart + dirNum, currentElement.selectionEnd + dirNum);
  }
};
