import { CandidateBarWithIme } from "./candidate-bar-with-ime";
import { EventListenerManagerInstance } from "../key/event-listener/event-listener-manager";
import { KeyEventListenerType } from "../key/event-listener/event-listener-type";
import { KeyBase, KeyActionType, KeyEventManagerInstance } from "../key";
import { EmulateKeyboardEvent } from '../key/emulate-keyboard-event';
import { EventType } from "../key/event-type";
import { KeyInfo, KeyConfig } from "../interface";

//为什么不可以继承
export class CandidateSlot extends KeyBase {
  public candidateSlotCss = {
    candidate: 'candidate-pharse'
  };

  public candidateSlotElement!: HTMLButtonElement;

  public parent!: CandidateBarWithIme;

  // constructor(keyInfo: KeyInfo, currentElement: HTMLInputElement, keyConfig: KeyConfig) {
  //   super(keyInfo, currentElement, keyConfig);
  // }

  public createCandidateSlot(parentNode: Node, candidateTxt: string, parent: CandidateBarWithIme): void {
    let candidateSlot = document.createElement('button');

    this.candidateSlotElement = candidateSlot;
    this.parent = parent;

    candidateSlot.innerText = candidateTxt;

    candidateSlot.classList.add(this.candidateSlotCss.candidate);
    candidateSlot.style.fontSize = parent.candidateBarSlotFontSize + "px";
    candidateSlot.style.marginLeft = parent.candidateSlotMargin + 'px';
    candidateSlot.style.marginRight = parent.candidateSlotMargin + 'px';

    console.log('candidateTxt', candidateTxt);
    EventListenerManagerInstance.setEventListener(KeyEventListenerType.Normal, candidateSlot, this._emulateKeyboardEvent.bind(this, candidateTxt), <any>this);

    parentNode.appendChild(candidateSlot);
  }

  public _emulateKeyboardEvent(txt: string): void {
    // let keyboardEvent = EmulateKeyboardEvent.getEmulateKeyboardEvent(this.candidateSlotElement);

    // keyboardEvent.createInputEvent(EventType.Beforeinput, txt, "insertCompositionText");
    // keyboardEvent.createCompositionEvent(EventType.Compositionupdate);
    // keyboardEvent.createInputEvent(EventType.Input, txt, "insertCompositionText");

    // keyboardEvent.createInputEvent(EventType.Beforeinput, txt, "insertCompositionText");
    // keyboardEvent.createCompositionEvent(EventType.Compositionupdate, txt);
    // keyboardEvent.createInputEvent(EventType.TextInput, txt, "insertCompositionText");
    // keyboardEvent.createInputEvent(EventType.Input, txt, "insertCompositionText");
    // keyboardEvent.createCompositionEvent(EventType.Compositionend, txt);

    let candidateSlotAction = KeyEventManagerInstance.getKeyAction(KeyActionType.InsertTextAction);
    // candidateSlotAction(txt, this, this.currentElement);

    this.parent.update(txt);
  }

  // public update(txt: string): void {
  //   this.parent.removeHanZiCandidateBar();

  //   let pinyinComstrLeave = this.parent.getSyllables(txt);

  //   if (!pinyinComstrLeave) {
  //     pinyinComstr = ''; // 组合字符串需要置空，然后cancel可以删除
  //     showPinyinComstr('');

  //     this.parent.showAutomatedWords();
  //   } else {
  //     pinyinComstr = pinyinComstrLeave;
  //   }
  // }
};
