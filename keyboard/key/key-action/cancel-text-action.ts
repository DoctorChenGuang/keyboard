import { KeyAction } from "./key-action";
import { Key } from "../key";

enum Cancel {
  Backspace = 'Backspace'
}

export class CancelTextAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let cancelTextAction: CancelTextAction = new CancelTextAction();

    return cancelTextAction.actionHandler.bind(cancelTextAction);
  }

  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement): void {
    if (currentElement.selectionStart == undefined || currentElement.selectionStart == null) return;

    if (currentElement.value.length <= 0) return;

    if (currentElement.selectionStart <= 0) return;

    currentElement.setRangeText('', currentElement.selectionStart - 1, currentElement.selectionEnd, 'end');
  }
};
