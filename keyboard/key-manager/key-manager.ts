import { NormalKey } from './normal-key';
import { ActionKey } from './action-key';

export class KeyManager {
  keyInfo: any = {};

  keyList: any = {};

  constructor(currentLayoutContainer, row, col, keyInfo) {
    this.keyInfo = keyInfo;
    this.keyList = {
      keyInfo: keyInfo,
      row: row,
      col: col,
      currentLayoutContainer: currentLayoutContainer
    };
  }

  createKey() {
    if (!this._isActionKey(this.keyInfo.key)) {
      new NormalKey(this.keyList).createNormalKey();
      return;
    }

    new ActionKey(this.keyList).createActionKey();
  }

  private _isActionKey(keyName: string): boolean {
    return /^\{\S+\}$/.test(keyName);
  }
}