import { NormalKey } from './normal-key';
import { ActionKey } from './action-key';

export class KeyManager {
  key: any = {};

  constructor(key) {
    this.key = key;
  }

  createKey() {
    if (!this.isActionKey(this.key.key)) {
      this.initNormalKey();
      return;
    }

    this.initActionKey();
  }

  initNormalKey() {
    new NormalKey();
  }

  initActionKey() {
    new ActionKey();
  }

  isActionKey(keyName) {
    return /^\{\S+\}$/.test(keyName);
  }
}