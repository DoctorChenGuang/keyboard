import { Key } from './key';

export class KeyManager {
  keyInfo: any = {};

  keyList: any = {};

  constructor(currentLayoutContainer, row, col, keyInfo, layoutName) {
    this.keyInfo = keyInfo;
    this.keyList = {
      keyInfo: keyInfo,
      row: row, //  这个属性可能没用
      col: col, //  这个属性可能没用
      currentLayoutContainer: currentLayoutContainer,
      layoutName: layoutName
    };
  }

  createKey(): void {
    const _isActionKey = this._isActionKey(this.keyInfo.key);
    this._appendChild(new Key(this.keyList, _isActionKey).createNormalKey());
  }

  private _appendChild(child) {
    this.keyList.currentLayoutContainer.appendChild(child);
  }

  private _isActionKey(keyName: string): boolean {
    return /^\{\S+\}$/.test(keyName);
  }
}