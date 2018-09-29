import { ArrowMoveAction } from '../../keyboard/key/key-action/arrow-move-action';
import { CancelTextAction } from '../../keyboard/key/key-action/cancel-text-action';
import { CloseKeyboardAction } from '../../keyboard/key/key-action/close-keyboard-action';
import { HandwritingCanvasAction } from '../../keyboard/key/key-action/handwriting-canvas-action';
import { InsertTextAction } from '../../keyboard/key/key-action/insert-text-action';
import { Key } from '../../keyboard/key/key';
import { KeyActionType } from '../../keyboard/key/key-action-type';

describe('KeyAction test', () => {
  let currentElement = document.createElement('input');
  let keyBtn = Key.getKeyBtn({ 'key': 'q', 'row': '0', 'col': '2', 'colspan': '2' }, false, false, true, KeyActionType.InsertTextAction, 'english', currentElement);

  test("InsertTextAction", () => {
    let input = document.createElement('input');

    let insertText = InsertTextAction.getKeyAction();

    insertText('a', keyBtn, input);

    expect(input.value).toBe('a');
  });

  test("ArrowMoveAction", () => {
    let input = document.createElement('input');
    input.value = 'aaa';
    input.selectionStart = 3;

    let arrowMove = ArrowMoveAction.getKeyAction()

    arrowMove('ArrowLeft', keyBtn, input);
    expect(input.selectionStart).toBe(2);

    arrowMove('ArrowRight', keyBtn, input);
    expect(input.selectionStart).toBe(3);

    arrowMove('ArrowRight', keyBtn, input);
    expect(input.selectionStart).toBe(3);
  });

  test("CancelTextAction", () => {
    let input = document.createElement('input');
    input.value = 'aaa';
    input.selectionStart = 3;

    let cancelText = CancelTextAction.getKeyAction();

    cancelText('Backspace', keyBtn, input);
    expect(input.value).toBe('aa');

    cancelText('Backspace', keyBtn, input);
    expect(input.value).toBe('a');
  });

  test("CloseKeyboardAction", () => {
    let close = CloseKeyboardAction.getKeyAction();

    let input = document.createElement('input');

    close('Close', keyBtn, input);
  });

  test("HandwritingCanvasAction", () => {
    let handwritingCanvas = HandwritingCanvasAction.getKeyAction();

    let input = document.createElement('input');

    handwritingCanvas('HandwritingCanvasLeft', keyBtn, input);
  });
});