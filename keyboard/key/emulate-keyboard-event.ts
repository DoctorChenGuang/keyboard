import { Key } from "./key";
import { EventType } from './event-type';

interface eventReturnResult {
  cancelled: boolean;

  active?: boolean;

  staticRanges?: Array<any>;
}

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

interface CompositionEventArgsType {
  isInsertText: boolean;
  isStart: boolean;
  isEnd: boolean;
}

//是否为字符按键
//是否为中文按键  Process = key
//是否为功能按键
//是否不属于按键系列的按键，仅提供一些功能

//联想词输入的插入方式是insertText，isCompsing = false
export class EmulateKeyboardEvent {
  public currentElement: HTMLButtonElement;

  constructor(currentElement: HTMLButtonElement) {
    this.currentElement = currentElement;
  }

  public static getEmulateKeyboardEvent(currentElement: HTMLButtonElement): EmulateKeyboardEvent {
    let emulateKeyboardEvent: EmulateKeyboardEvent = new EmulateKeyboardEvent(currentElement);

    return emulateKeyboardEvent;
  }

  public createKeyEvent(eventType: EventType, eventArgs: EventArgs): eventReturnResult {
    let action = eventArgs.action;

    let keyboardEventArgs = {
      key: action,

      code: eventArgs.code,

      keyCode: eventArgs.keyCode,

      isComposing: eventArgs.isComposing || false,

      ctrlKey: eventArgs.ctrlKey || false,

      shiftKey: eventArgs.shiftKey || false,

      altKey: eventArgs.altKey || false,

      metaKey: eventArgs.metaKey || false,

      bubbles: true,

      cancelBubble: false,

      cancelable: true,

      composed: true
    };

    let event: KeyboardEvent = new KeyboardEvent(eventType, keyboardEventArgs);

    let active: boolean = event.getModifierState(action);

    let cancelled: boolean = this.currentElement.dispatchEvent(event);

    return {
      active: active,
      cancelled: cancelled
    }
  }

  public createEvent(eventType: EventType): eventReturnResult {
    let eventArgs = {
      bubbles: true,

      cancelable: false,

      composed: true,

      cancelable: true,
    };

    let inputEvent = new Event(eventType, eventArgs);

    let cancelled = this.currentElement.dispatchEvent(inputEvent);

    return {
      cancelled: cancelled
    };
  }

  public createInputEvent(eventType: EventType, eventArgs: EventArgs): eventReturnResult {
    if (!this._isSupportInputEvent(window.InputEvent)) {
      return this.createEvent(eventType);
    } else {
      let inputEventArgs = {
        data: eventArgs.action,

        insertText: eventArgs.inputType || 'insertText',

        isComposing: eventArgs.isComposing || false,

        bubbles: true,

        cancelBubble: false,

        cancelable: true,

        composed: true
      };

      let inputEvent = new InputEvent(eventType, inputEventArgs);

      let cancelled = this.currentElement.dispatchEvent(inputEvent);

      let staticRanges: Array<any> = inputEvent.getTargetRanges();

      return {
        cancelled: cancelled,
        staticRanges: staticRanges
      };
    }
  }

  public createChangeEvent(eventType: EventType): eventReturnResult {
    return this.createEvent(eventType);
  }

  public createTouchEvent(eventType: EventType): eventReturnResult {
    let touchEvent = new TouchEvent(eventType, {
      touches: [],
      targetTouches: [],
      changedTouches: [],
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      metaKey: false
    });

    let cancelled = this.currentElement.dispatchEvent(touchEvent);

    return {
      cancelled: cancelled
    }
  }

  public createCompositionEvent(eventType: EventType, eventArgs: EventArgs): eventReturnResult {
    let compositionEvent = new CompositionEvent(eventType, {
      data: eventArgs.action || "",

      bubbles: true,

      cancelable: true,

      composed: true,
    });

    let cancelled = this.currentElement.dispatchEvent(compositionEvent);

    return {
      cancelled: cancelled
    }
  }

  //需要测试下模拟事件的行为是否正确
  public emulateKeyboardEvent(eventArgs: EventArgs, key: Key, cb: () => void): void {
    let eventKeydown = this.createKeyEvent(EventType.Keydown, eventArgs);

    //如果是单纯的功能按键，则只有keydown和keyup事件
    if (!eventKeydown.cancelled || key.isPlainActionKey) {
      this.createKeyEvent(EventType.Keyup, eventArgs);
      return;
    }

    if (key.isCharacterkey) {
      let eventKeypress = this.createKeyEvent(EventType.Keypress, eventArgs);

      if (!eventKeypress.cancelled) {
        this.createKeyEvent(EventType.Keyup, eventArgs);
        return;
      }
    }

    cb(); // 回调函数不会return掉当前函数的

    this.createKeyEvent(EventType.Keyup, eventArgs);
  }

  //isInsertText:当是中文字符插入的时候，并且是候选词的时候，才是为真，才会触发textInout事件  
  public emulateInputEvent(eventArgs: EventArgs, key: Key, cb: any, compositionEventArgs: CompositionEventArgsType = {
    isInsertText: false,

    isStart: false,

    isEnd: false
  }): void {
    if (key.isChineseKey && compositionEventArgs.isStart) {
      this.createCompositionEvent(EventType.Compositionstart, eventArgs);
    }

    this.createInputEvent(EventType.Beforeinput, eventArgs); //beforeinput

    if (key.isChineseKey) {
      this.createCompositionEvent(EventType.Compositionupdate, eventArgs);
    }

    if (key.isCharacterkey || compositionEventArgs.isInsertText) {
      let textInputEvent = this.createInputEvent(EventType.TextInput, eventArgs); // textInput

      if (!compositionEventArgs.isInsertText && !textInputEvent.cancelled) return; // 无法阻止中文字符的输入
    }

    cb();  //执行事件的行为

    this.createInputEvent(EventType.Input, eventArgs); //input

    if (key.isChineseKey && compositionEventArgs.isEnd) {
      this.createCompositionEvent(EventType.Compositionend, eventArgs);
    }
  }

  public emulateCompositionInsertTextEvent(eventArgs: EventArgs, key: Key, cb: any): void {
    this.createInputEvent(EventType.Beforeinput, eventArgs);
    this.createCompositionEvent(EventType.Compositionupdate, eventArgs);
    this.createInputEvent(EventType.Input, eventArgs);

    this.createInputEvent(EventType.Beforeinput, eventArgs);
    this.createCompositionEvent(EventType.Compositionupdate, eventArgs);
    let textInputEvent = this.createInputEvent(EventType.TextInput, eventArgs);

    cb();

    if (!textInputEvent.cancelled) {
      this.createInputEvent(EventType.Input, eventArgs);
    }

    this.createCompositionEvent(EventType.Compositionend, eventArgs);
  }

  private _isSupportInputEvent(Ctor) {
    return Ctor && typeof Ctor === "function" && /native code/.test(Ctor.toString())
  }
};
