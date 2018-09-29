import { EventListenerName } from "./event-listener-name";
import { Key } from "../key";

export class NormalEventListener {
  public static getEventListener(): any {
    let normalEventListener: NormalEventListener = new NormalEventListener();

    return normalEventListener.addNormalEventListener;
  }

  public addNormalEventListener(targetElement: HTMLButtonElement, keyAction: any, key: Key): void {
    targetElement.addEventListener(EventListenerName.Click, () => {
      keyAction();
    });

    targetElement.addEventListener(EventListenerName.Touchstart, (event) => {
      event.preventDefault();

      targetElement.classList.add(key.css.keyActive);
    });

    targetElement.addEventListener(EventListenerName.Touchend, () => {
      targetElement.classList.remove(key.css.keyActive);

      keyAction();
    });
  }
};
