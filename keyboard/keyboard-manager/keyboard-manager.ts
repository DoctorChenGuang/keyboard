import { Keyboard } from './keyboard';

interface KeyboardConfig {
  type?: string;
  [propName: string]: any;
}

export default class KeyboardManager {

  keyboard: Keyboard;

  private configure(keyboardConfig) {
    this.keyboard = new Keyboard(keyboardConfig);
  }

  public showScreenKeyboardAsync(target: EventTarget, keyboardConfig: KeyboardConfig, screenRegion: object): void {
    this.configure(keyboardConfig);
    this.keyboard.show(target, screenRegion);
  }

  public closeScreenKeyboardAsync(): void {
    this.keyboard.close();
  }
};
