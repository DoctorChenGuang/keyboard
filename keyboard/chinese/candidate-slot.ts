import { CandidateBarWithIme } from "./candidate-bar-with-ime";
import { EventListenerManagerInstance } from "../key/event-listener/event-listener-manager";
import { KeyEventListenerType } from "../key/event-listener/event-listener-type";
import { KeyBase, KeyActionType, KeyEventManagerInstance } from "../key";
import { EmulateKeyboardEvent } from '../key/emulate-keyboard-event';
import { EventType } from "../key/event-type";

export class CandidateSlot extends KeyBase {
  public candidateSlotCss = {
    candidate: 'candidate-pharse'
  };

  public candidateSlotElement!: HTMLButtonElement;

  public parent!: CandidateBarWithIme;

  public createCandidateSlot(parentNode: Node, candidateTxt: string, parent: CandidateBarWithIme): void {
    let candidateSlot = document.createElement('button');

    this.candidateSlotElement = candidateSlot;
    this.parent = parent;

    candidateSlot.innerText = candidateTxt;

    candidateSlot.classList.add(this.candidateSlotCss.candidate);
    candidateSlot.style.fontSize = parent.candidateBarSlotFontSize + "px";
    candidateSlot.style.marginLeft = parent.candidateSlotMargin + 'px';
    candidateSlot.style.marginRight = parent.candidateSlotMargin + 'px';

    EventListenerManagerInstance.setEventListener(KeyEventListenerType.Normal, candidateSlot, this._emulateKeyboardEvent.bind(this, candidateTxt), <any>this);

    parentNode.appendChild(candidateSlot);
  }

  public _emulateKeyboardEvent(txt): void {
    let keyboardEvent = EmulateKeyboardEvent.getEmulateKeyboardEvent(this.candidateSlotElement);

    keyboardEvent.createInputEvent(EventType.Beforeinput, txt, "insertCompositionText");
    keyboardEvent.createCompositionEvent(EventType.Compositionupdate);
    keyboardEvent.createInputEvent(EventType.Input, txt, "insertCompositionText");

    keyboardEvent.createInputEvent(EventType.Beforeinput, txt, "insertCompositionText");
    keyboardEvent.createCompositionEvent(EventType.Compositionupdate, txt);
    keyboardEvent.createInputEvent(EventType.TextInput, txt, "insertCompositionText");
    keyboardEvent.createInputEvent(EventType.Input, txt, "insertCompositionText");
    keyboardEvent.createCompositionEvent(EventType.Compositionend, txt);

    let candidateSlotAction = KeyEventManagerInstance.getKeyAction(KeyActionType.InsertTextAction);
    candidateSlotAction(txt, this, this.currentElement);

    this.update();
  }

  public update() {
    this.parent.removeHanZiCandidateBar();

    let pinyinComstrLeave = this.parent.getSyllables();

    if (!pinyinComstrLeave) {
      pinyinComstr = ''; // 组合字符串需要置空，然后cancel可以删除
      showPinyinComstr('');

      this.parent.showAutomatedWords();
    } else {
      pinyinComstr = pinyinComstrLeave;
    }
  }
};
