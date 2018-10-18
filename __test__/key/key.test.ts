import { KeyEventManagerInstance } from '../../keyboard/key/key-action/key-action-manager';
import { KeyActionType } from '../../keyboard/key/key-action/key-action-type';
import { Key } from '../../keyboard/key/key';
import { EventListenerManagerInstance } from '../../keyboard/key/event-listener/event-listener-manager';
import { KeyEventListenerType } from '../../keyboard/key/event-listener/event-listener-type';

describe("key", () => {
  let currentElement = document.createElement('input');
  let keyBtn = Key.create({ 'key': 'q', 'row': '0', 'col': '2', 'colspan': '2' }, false, false, true, KeyActionType.InsertTextAction, 'english', currentElement);
  test('should be new key', () => {
    console.log('00000000000000');
    // let keyBtn = Key.create({ 'key': 'q', 'row': '0', 'col': '2', 'colspan': '2' }, false, false, true);
  });

  // test('key add click event', () => {
  //   if (keyBtn._isDisabled) return;

  //   console.log('按键没有禁用');

  //   KeyEvent.registerEvent(keyBtn);

  //   keyBtn._keyBtnElement.click();
  // });

  // test("emulate keybaord event", () => {
  //   console.log('模式键盘事件发送');
  //   let keyboardEvent = EmulateKeyboardEvent.getEmulateKeyboardEvent(keyBtn._keyBtnElement);

  // });

  // test('key event manager', () => {
  //   console.log('test');
  //   let keyAction = KeyEventManagerInstance.getKeyAction(KeyActionType.InsertTextAction);
  //   keyAction('normal');
  // });

  // test('EventListener', () => {
  //   let eventListenerHandler = () => { console.log('测试事件'); }

  //   let keyAction = () => { console.log('按键行为'); }

  //   let btn = document.createElement('button');

  //   EventListener.setEventListener(btn, EventListenerType.Click, eventListenerHandler, keyAction);

  //   btn.click();
  // });

  // test("EventListenerManagerInstance", () => {
  //   let btn = keyBtn._keyBtnElement;

  //   EventListenerManagerInstance.setEventListener(KeyEventListenerType.Normal, btn, () => {
  //     console.log('触发click事件');
  //   }, keyBtn);

  //   btn.click();
  //   //触屏事件测试有问题
  //   if (btn.ontouchstart) {
  //     btn.ontouchstart(<any>event);
  //   }
  //   // btn.ontouchend(event);
  // });

  
});
