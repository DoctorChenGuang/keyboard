import { KeyAction } from "./key-action";
import { Key } from '../key';
import { StateMachine } from './state-manchine';

export class SwtichSetAction extends KeyAction {
  public static getKeyAction(): any {
    let switchSetAction: SwtichSetAction = new SwtichSetAction();

    return switchSetAction.actionHandler.bind(switchSetAction);
  }

  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement, setName: string, layoutName: string): void {
    StateMachine.switchState('set', (value, key) => {
      key !== setName ? value.style.display = 'block' : value.style.display = 'none';
    }, layoutName);
  }
};
