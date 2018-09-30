import { KeyAction } from "./key-action";
import { Key } from "../key";
import { StateMachine } from './state-manchine';

export class LayoutSwitchAction extends KeyAction {
  public static getKeyAction(): any {
    let layoutSwitchAction: LayoutSwitchAction = new LayoutSwitchAction();

    return layoutSwitchAction.actionHandler.bind(layoutSwitchAction);
  }

  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement, setName: string, layoutName: string, setInitState: string): void {
    StateMachine.switchState('layout', (value, key) => {
      key !== action ? value.style.display = 'none' : value.style.display = 'block';
    });

    StateMachine.switchState('set', (value, key) => {
      key === setInitState ? value.style.display = 'block' : value.style.display = 'none';
    }, layoutName);
  }
}