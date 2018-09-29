import { PageTurningBtnType } from "./page-turning-btn-type";
import { EventListenerManagerInstance } from "../key/event-listener/event-listener-manager";
import { KeyEventListenerType } from "../key/event-listener/event-listener-type";
import { CandidateBarWithIme } from "./candidate-bar-with-ime";

interface PageTurningKBtnCss {
  pageTurningPrefix: string;
}

enum pageTurningBtnTxt {
  prev = "←",

  next = "→"
}

enum pageTurningBtnIncrement {
  prev = -1,

  next = 1
}

export class PageTurningBtn {
  public pageTurningBtnName: string;

  public pageTurningBtn!: HTMLButtonElement;

  public candidateBarContainer: HTMLDivElement;

  public parent: CandidateBarWithIme;

  public css: PageTurningKBtnCss = {
    pageTurningPrefix: 'pageturning-'
  }

  constructor(candidateBarContainer: HTMLDivElement, pageTurningBtnName: PageTurningBtnType, parent: CandidateBarWithIme) {
    this.pageTurningBtnName = pageTurningBtnName;

    this.candidateBarContainer = candidateBarContainer;

    this.parent = parent;
  }

  public static createPageTurning(candidateBarContainer: HTMLDivElement, pageTurningBtnName: PageTurningBtnType, parent: CandidateBarWithIme): void {
    let pageTurning: PageTurningBtn = new PageTurningBtn(candidateBarContainer, pageTurningBtnName, parent);

    pageTurning.createPageTurningBtn(pageTurning);
  }

  public createPageTurningBtn(pageTurningBtnInstance: PageTurningBtn): void {
    this.pageTurningBtn = document.createElement('button');

    this.pageTurningBtn.classList.add(this.css.pageTurningPrefix + this.pageTurningBtnName);
    this.pageTurningBtn.innerHTML = `<span>${pageTurningBtnTxt[this.pageTurningBtnName]}</span>`;
    this._setStyle(this.pageTurningBtn);

    EventListenerManagerInstance.setEventListener(KeyEventListenerType.Normal, this.pageTurningBtn, this._getAction, <any>pageTurningBtnInstance);

    this.candidateBarContainer.appendChild(this.pageTurningBtn);
  }

  private _getAction() {
    let increment = pageTurningBtnIncrement[this.pageTurningBtnName];

    let line = this.parent.line;

    if (!line && line <= 0) return;

    if (this.parent.counter <= 0) {
      this.parent.counter = 0;
      return;
    }

    if (this.parent.counter >= line) {
      this.parent.counter = line;
      return;
    }

    this.parent.counter = this.parent.counter + increment;
    this.parent.currentLine = this.parent.currentLine + increment;

    this.parent.removeHanZiCandidateBar();
    this.parent.updateCandidates(this.parent.hanziList);
  }

  private _setStyle(pageTurningBtn: HTMLButtonElement): void {
    let leftIncreament = pageTurningBtnIncrement[this.pageTurningBtnName] > 0 ? 1 : 0;

    pageTurningBtn.style.width = this.parent.canidateBarSlotWidth + 'px';
    pageTurningBtn.style.height = this.parent.canidateBarSlotHeight + 'px';
    pageTurningBtn.style.left = (this.parent.canidateBarSlotWidth + this.parent.candidateSlotContainerWidth + this.parent.canidateBarSlotSpace * 2) * leftIncreament + 'px';
    pageTurningBtn.style.top = this.parent.top + 'px';
  }
};
