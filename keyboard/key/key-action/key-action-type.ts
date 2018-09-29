export enum KeyActionType {
  ArrowMoveAction,
  CancelTextAction,
  CloseKeyboardAction,
  InsertTextAction,
  CandidateSlotAction,
  LayoutSwitchAction,
  SwtichSetAction,
  None
};

//此函数需要优化,函数应该有接口，用于用户自定义函数,用户可能会自定义按键,以及案件的额功能
export function getKeyActionType(keyName): KeyActionType {
  let keyActionType;

  switch (keyName) {
    case "english":
    case "chinese":
    case "hand-write":
    case "symbol":
      keyActionType = KeyActionType.LayoutSwitchAction;
      break;

    case "backspace":
      keyActionType = KeyActionType.CancelTextAction;
      break;

    case "close":
      keyActionType = KeyActionType.CloseKeyboardAction;
      break;

    case "arrow-left":
    case "arrow-right":
      keyActionType = KeyActionType.ArrowMoveAction;
      break;

    case 'enter'://仅仅是确定按键，用于焦点控制，应该是可配置的，或者是什么都不做，或者是关闭键盘，但是不跳，这个应该焦点控制的事情
      keyActionType = KeyActionType.None;
      break;

    case "handwriting-left":
    case "handwriting-right":
      keyActionType = KeyActionType.None;
      break;

    case "candidate":
      keyActionType = KeyActionType.InsertTextAction;
      break;

    case 'shift':
    case "capital":
      keyActionType = KeyActionType.SwtichSetAction;
      break;

    default:
      keyActionType = KeyActionType.InsertTextAction;
      break;
  }

  return keyActionType;
};
