import { KeyAction } from "./key-action";
import { Key } from "../key";
import { StateMachine } from './state-manchine';

export class LayoutSwitchAction extends KeyAction {
  public static getKeyAction(): any {
    let layoutSwitchAction: LayoutSwitchAction = new LayoutSwitchAction();

    return layoutSwitchAction.actionHandler.bind(layoutSwitchAction);
  }

  //这个地方对于参数，需要优化，进行函数的复写操作
  public actionHandler(action: string, key: Key, currentElement: HTMLInputElement, setName: string, layoutName: string): void {
    StateMachine.switchState('layout', (value, key) => {
      key !== action ? value.style.display = 'none' : value.style.display = 'block';
    });
  }
}