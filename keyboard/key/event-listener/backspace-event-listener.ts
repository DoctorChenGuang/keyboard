import { EventListenerName } from './event-listener-name';
import { Key } from '../key';

export class BackspaceEventListener {
  public static getEventListener() {
    let backspaceEventListener: BackspaceEventListener = new BackspaceEventListener();

    return backspaceEventListener.addBackspaceEventListener.bind(backspaceEventListener);
  }

  public isClick: boolean = true;
  public isTouch: boolean = true;

  public interval: number = 150;//此数值应该是可以配置的

  public addBackspaceEventListener(targetElement: HTMLButtonElement, keyAction: any, key: Key): void {
    let intervalClearTimerMouse, intervalClearTimerTouch;

    targetElement.addEventListener(EventListenerName.Click, () => {
      if (this.isClick) {
        keyAction();
      }

      this.isClick = true;
    });

    targetElement.addEventListener(EventListenerName.Mousedown, (event) => {
      event.preventDefault();

      intervalClearTimerMouse = setInterval(() => {
        this.isClick = false;
        keyAction();
      }, this.interval);
    });

    targetElement.addEventListener(EventListenerName.Mouseup, () => {
      clearInterval(intervalClearTimerMouse);
    });

    targetElement.addEventListener(EventListenerName.Touchstart, (event) => {
      event.preventDefault();

      targetElement.classList.add(key.css.keyActive);

      intervalClearTimerTouch = setInterval(() => {
        this.isTouch = false;
        keyAction();
      }, this.interval);
    });

    targetElement.addEventListener(EventListenerName.Touchend, () => {
      targetElement.classList.remove(key.css.keyActive);

      clearInterval(intervalClearTimerTouch);

      if (this.isTouch) {
        keyAction();
      }

      this.isTouch = true;
    });
  }
};
