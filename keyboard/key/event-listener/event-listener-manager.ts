import { BackspaceEventListener } from './backspace-event-listener';
import { NormalEventListener } from './normal-event-listener';
import { KeyEventListenerType } from './event-listener-type';
import { Key } from '../key';

//这个需要修改，应该换一种更加优雅的写法
class EventListenerManager {
  public eventListenerList: Map<KeyEventListenerType, any> = new Map<KeyEventListenerType, any>();

  public register(keyEventListenerType: KeyEventListenerType, eventListener: any): void {
    this.eventListenerList.set(keyEventListenerType, eventListener);
  }

  public unregister(keyEventListenerType: KeyEventListenerType): void {
    this.eventListenerList.delete(keyEventListenerType);
  }

  public setEventListener(keyEventListenerType: KeyEventListenerType, targetElement: HTMLButtonElement, keyAction: any, key: Key): void {
    if (!this.eventListenerList.get(keyEventListenerType)) return console.error('event listener is not exist');

    let eventListenerFn = this.eventListenerList.get(keyEventListenerType);

    eventListenerFn(targetElement, keyAction, key);
  }
}

let EventListenerManagerInstance: EventListenerManager = new EventListenerManager();

EventListenerManagerInstance.register(KeyEventListenerType.Backspace, BackspaceEventListener.getEventListener());
EventListenerManagerInstance.register(KeyEventListenerType.Normal, NormalEventListener.getEventListener());

export { EventListenerManagerInstance };
