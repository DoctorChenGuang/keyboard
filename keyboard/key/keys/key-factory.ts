import { NormalKey } from "./normal-key";
import { CanvasKey } from "./canvas-key";
import { CandidateKey } from "./candidate-key";
import { Key } from "./key";
import { KeyInfo, KeyConfig } from "../../interface";

export class KeyFactory {
  public static create(keyType: any, keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig): Key {
    switch (keyType) {
      case 'normal':
        return NormalKey.create(keyInfo, currentElement, keyConfig);

      case 'canvas':
        return new CanvasKey();

      case 'candidate':
        return new CandidateKey();

      default:
        return NormalKey.create(keyInfo, currentElement, keyConfig);
    }
  }
};