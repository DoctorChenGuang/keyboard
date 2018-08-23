import { NormalEvent } from './normal-event';
import { ActionEvent } from './action-event';

export class KeyActionManager {
  keyName: string = '';

  action: string = '';

  layoutName: string = '';

  constructor({ keyName, action, layoutName }) {
    this.keyName = keyName;
    this.action = action;
    this.layoutName = layoutName;
  }

  public run(): void {
    this.action === '' ? new NormalEvent().runNormalEvent(this.keyName, this.layoutName) : new ActionEvent().runActionEvent(this.action);
  }
}