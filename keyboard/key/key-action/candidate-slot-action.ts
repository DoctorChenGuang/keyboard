import { KeyAction } from './key-action';
import { Key } from '../key';

export class CandidateSlotAction extends KeyAction {
  public static getKeyAction(): (action: string, key: Key, currentElement: HTMLInputElement) => void {
    let candidateSlotAction: CandidateSlotAction = new CandidateSlotAction();

    return candidateSlotAction.actionHandler.bind(candidateSlotAction);
  }

  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement): void {
    let word = '';//得到一个汉字
    //只负责核心的输入字符逻辑
    //所以直接就应该调用inserAction()
  }
}