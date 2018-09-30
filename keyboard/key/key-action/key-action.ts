import { Key } from "../key";

export abstract class KeyAction {
  public abstract actionHandler(action: string, key?: Key, currentElement?: HTMLInputElement, setName?: string, layoutName?: string, setInitState?: string): void;
};
