import { KeyBase } from './key-base';
import { KeyConfig, KeyInfo } from '../interface';

export class Key extends KeyBase {
  constructor(keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig) {
    super(keyInfo, currentElement, keyConfig);
  }

  public static getKeyBtn(keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig): Key {
    let keyBtn = new Key(keyInfo, currentElement, keyConfig);

    keyBtn.initKeyBtn(keyBtn);

    return keyBtn;
  }
};