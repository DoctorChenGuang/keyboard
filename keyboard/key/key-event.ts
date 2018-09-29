import { Key } from './key';
import { EmulateKeyboardEvent } from './emulate-keyboard-event';
import { KeyEventManagerInstance } from './key-action/key-action-manager';
import { EventListenerManagerInstance } from './event-listener/event-listener-manager';

interface EventArgs {
  action: string;
  code: string;
  keyCode: number;
  isComposing?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  inputType?: string;
}

export class KeyEvent {
  public key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  public static registerEvent(key: Key): KeyEvent {
    let keyEvent = new KeyEvent(key);

    EventListenerManagerInstance.setEventListener(key.keyEventListenerType, key._keyBtnElement, keyEvent.getKeyAction.bind(this, key.keyActionType, keyEvent), key);

    return keyEvent;
  }

  public getKeyAction(keyActionType, keyEvent): void {
    let keyAction = KeyEventManagerInstance.getKeyAction(keyActionType);

    keyEvent.emulateKeyboardEvent(keyAction);
  }

  //这个函数应该持续优化
  public emulateKeyboardEvent(cb: (action: string, key: Key, currentElement: HTMLInputElement, setName: string, layoutName: string) => void): void {
    let key = this.key;
    let action = this.key.action;
    let currentElement = this.key.currentElement;
    let setName = this.key.ownerSetName;
    let layoutName = this.key.ownerLayoutName;

    let eventArgs = {
      action: this.key.action,
      code: this.key.code,
      keyCode: this.key.keyCode,
      isComposing: this.key.isComposing,
      ctrlKey: this.key.ctrlKey,
      shiftKey: this.key.shiftKey,
      metaKey: this.key.metaKey,
      altKey: this.key.altKey,
      inputType: this.key.inputType
    };

    let keyboardEvent = EmulateKeyboardEvent.getEmulateKeyboardEvent(this.key._keyBtnElement);

    keyboardEvent.emulateKeyboardEvent(eventArgs, key, () => {
      keyboardEvent.emulateInputEvent(eventArgs, key, () => {
        cb(action, key, currentElement, setName, layoutName);
      });
    });
  }
};
