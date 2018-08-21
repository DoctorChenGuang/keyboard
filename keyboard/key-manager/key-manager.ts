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

  createKey(): void {
    if (!this._isActionKey(this.keyInfo.key)) {
      this.keyList.currentLayoutContainer.appendChild(new NormalKey(this.keyList).createNormalKey());
    }

    new ActionKey(this.keyList).createActionKey();
  }

  private _isActionKey(keyName: string): boolean {
    return /^\{\S+\}$/.test(keyName);
  }
}