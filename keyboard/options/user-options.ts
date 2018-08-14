import { KeyboardOptionsManager } from "./options-manager";

export class UserKeyboardOptions {
  keyboardOptions: any = {};

  constructor(keyboardOptions) {
    this.keyboardOptions = keyboardOptions;
  }

  static configure(keyboardOptions) {
    KeyboardOptionsManager.configure(keyboardOptions);
  }
}