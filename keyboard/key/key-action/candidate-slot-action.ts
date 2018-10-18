import { KeyAction } from './key-action';
import { Key } from '../key';
import { InsertTextAction } from './insert-text-action';
import { CanvasManagerInstance, CandidateSlot } from '../../handwriting-canvas';

export class CandidateSlotAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let candidateSlotAction: CandidateSlotAction = new CandidateSlotAction();

    return candidateSlotAction.actionHandler.bind(candidateSlotAction);
  }

  //应该考虑此处其实就是插入字符的操作，需要优化,key上需要知道当前的手写板是哪一个
  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement): void {
    let candidateNode = key._keyBtnElement.childNodes[0];
    let word = candidateNode.innerText;

    if (!word) return;

    (new InsertTextAction).actionHandler(word, key, currentElement);
    CanvasManagerInstance.clearAllCanvas();
    CandidateSlot.clearCandidate();
  }
}