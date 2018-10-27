import { Key } from "./key";
import { KeyInfo, KeyConfig } from "../../interface";

export class NormalKey extends Key {
  constructor(keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig) {
    super(keyInfo, currentElement, keyConfig);
  }

  public static create(keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig): NormalKey {
    let normalKey = new NormalKey(keyInfo, currentElement, keyConfig);

    normalKey.initKeyBtn();
    normalKey.buildContent();

    return normalKey;
  }

  //此方法应该是私有的
  public buildContent(): void {
    this._keyBtnElement.innerHTML = `<span class="${this.css.keyText}">${this.keyTxt}</span>`;
  }
};