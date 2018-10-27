interface CandidateBarCss {
  candidateBar: string;

  candidateBarPrefix: string;

  candidateSlotContainerId: string;

  pageTurningPrefix: string;

  candidateSlot: string;
};

enum PageTurningKeyType {
  Prev = 'prev',

  Next = 'next'
}

import { PageTurningBtn } from './page-turning-btn';
import { PageTurningBtnType } from './page-turning-btn-type';
import { CandidateSlot } from './candidate-slot';
import { PinyinAnalyser } from './pinyin-analyser';
import { PinyinComstrBar } from './pinyin-combstr-bar';
import { PinyinCombStrUpdateType } from '../interface';

//单例设计模式
//应该更加抽象化,手写以及中文都需要这个，所以应该抽象出一层
export class CandidateBarWithIme {
  public canidateBarSlotCount: number = 10; // 这些属性都应该可以进行重新的配置

  public canidateBarSlotWidth: number = 60;

  public canidateBarSlotHeight: number = 60;

  public canidateBarSlotSpace: number = 5;

  public candidateBarSlotFontSize: number = 24;//此处应该可以修改

  public candidateSlotMargin: number = 10;

  public candidateSlotContainerWidth: number = 640;

  public counter: number = 0;

  public currentLine: number = 0;
  public line: number;

  // public pinyinCombStr: string = '';

  public top: number = 0; // 此处的值有问题,需要思考这个值是怎么获得的

  public candidateSlotContainer!: HTMLDivElement;

  public css: CandidateBarCss = {
    candidateBar: 'chinese-candidate-bar',

    candidateBarPrefix: 'chinese-candidate-bar-',

    candidateSlotContainerId: 'candidate-slot-container',

    pageTurningPrefix: 'pageturning-',

    candidateSlot: 'candidate-slot'
  }

  public hanziList: { syllables: string, words: string[] }[] = [{
    syllables: "", words: []
  }];

  public pniyinCombStrBarInstance!: PinyinComstrBar;

  // public static createCandidateBarWithIme(hanziList: { syllables: string, words: string[] }[], line: number = 0): HTMLDivElement {
  //   let candidateBarWithIme = new CandidateBarWithIme(hanziList, line);

  //   let candidateBarContainer = candidateBarWithIme.create();
  //   return candidateBarContainer;
  // }

  // constructor() {
  //   this.hanziList = hanziList;

  //   this.line = line;
  // }

  public create(): HTMLDivElement {
    let candidateBarContainer = document.createElement('div');

    candidateBarContainer.classList.add(this.css.candidateBar);
    candidateBarContainer.setAttribute('name', this.css.candidateBar);

    this.createCandidateSlot(candidateBarContainer);
    this.createPageTurningKey(candidateBarContainer);

    return candidateBarContainer;
  }

  public createCandidateSlot(candidateBarContainer: HTMLDivElement): void {
    let candidateSlotContainer = document.createElement('div');
    this.candidateSlotContainer = candidateSlotContainer;

    candidateSlotContainer.setAttribute('id', this.css.candidateSlotContainerId);
    candidateSlotContainer.classList.add(this.css.candidateSlot);
    this._setClass(candidateSlotContainer);

    candidateBarContainer.appendChild(candidateSlotContainer);
  }

  public createPageTurningKey(candidateBarContainer: HTMLDivElement): any {
    PageTurningBtn.createPageTurning(candidateBarContainer, PageTurningBtnType.Prev, this);
    PageTurningBtn.createPageTurning(candidateBarContainer, PageTurningBtnType.Next, this);
  }

  public getLine(currentLine: number, hanziList: { syllables: string, words: string[] }[]): number {
    currentLine = typeof currentLine !== 'number' || currentLine < 0 ? 0 : currentLine;

    let line = 0;
    let charLen = 0;

    for (let i = 0; i < hanziList.length; i++) {
      let words = hanziList[i].words;
      for (let j = 0; j < words.length; j++) {
        charLen += words[j].length * this.candidateBarSlotFontSize + this.candidateSlotMargin * 2;

        let preLen = 0;

        j > 0 && (preLen = words[j - 1].length * this.candidateBarSlotFontSize + this.candidateSlotMargin * 2);
        (j === 0 && i > 0) && (preLen = (hanziList[i - 1].words[0]).length * this.candidateBarSlotFontSize + this.candidateSlotMargin * 2);

        if (charLen - preLen <= this.candidateSlotContainerWidth && charLen > this.candidateSlotContainerWidth) {
          line++;
          charLen = 0;
        }

        if (line === currentLine) {
          // new CandidateSlot().createCandidateSlot(this.candidateSlotContainer, words[j], this);
        }
      }
    }
    return line;
  }

  public getSyllables(insetText: string): string {
    console.log('insetText', insetText);
    console.log('hanziList', this.hanziList);
    for (let hanziItem of this.hanziList) {
      let syllables = hanziItem.syllables;
      let words = hanziItem.words;
      for (let word of words) {
        if (insetText == word) {
          let updatePinyinCombstr = this.pniyinCombStrBarInstance.pinyinCombStr.substring(syllables.length);
          return updatePinyinCombstr ? updatePinyinCombstr : "";
        }
      }
    }
    return "";
  }

  public removeHanZiCandidateBar() {
    let parentNode = document.getElementById(this.css.candidateSlotContainerId);
    if (!parentNode) return;

    while (parentNode && parentNode.firstChild && parentNode.hasChildNodes()) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }

  private _setClass(container: HTMLDivElement): void {
    container.style.width = this.candidateSlotContainerWidth + 'px';
    container.style.height = this.canidateBarSlotHeight + 'px';
    container.style.left = this.canidateBarSlotWidth + this.canidateBarSlotSpace + 'px';
    container.style.top = this.top + 'px';
  }

  public showAutomatedWords(): void {
    //联想词需要修改
    console.log('显示联想词功能');
    // let value = this.currentElement.value.substring(0, this.currentElement.selectionStart);

    // let automatedWords = PinyinAnalyser.getAutomatedWords(value);

    // let automatedWord = Object.keys(automatedWords)[0];

    // if (!automatedWord) return;
    // if (!automatedWords[automatedWord].length) return;

    // let automatedWordsResult = [{ words: automatedWords[automatedWord], syllables: "" }];

    // this.counter = 0;
    // this.currentLine = 0;

    // this.getLine(this.currentLine, automatedWordsResult);
  }

  public async getHanziResult(pinyinComstr: string): Promise<any> {
    if (!pinyinComstr) return {};

    let hanziList = this.hanziList = await PinyinAnalyser.getChinesePharseAsync(pinyinComstr);

    return hanziList;
  }

  public async updateCandidateBarWithIme(pniyinCombStrBarInstance: PinyinComstrBar): Promise<void> {
    this.pniyinCombStrBarInstance = pniyinCombStrBarInstance;

    this.removeHanZiCandidateBar();

    if (!pniyinCombStrBarInstance.pinyinCombStr) return;

    let hanziList = await this.getHanziResult(pniyinCombStrBarInstance.pinyinCombStr);
    console.log('hanziList', hanziList);

    this.updateCandidates(hanziList);
  }

  public updateCandidates(hanziList: { syllables: string, words: string[] }[]): void {
    this.getLine(0, hanziList);
  }

  //这个函数应该拆分开
  public update(hanzi: string): void {
    this.removeHanZiCandidateBar();

    let pinyinComstrLeave = this.getSyllables(hanzi);

    console.log('pinyinComstrLeave', pinyinComstrLeave);
    if (!pinyinComstrLeave) {
      this.pniyinCombStrBarInstance.updatePinyinCombStr(PinyinCombStrUpdateType.Update, "");

      this.showAutomatedWords();
    } else {
      this.pniyinCombStrBarInstance.updatePinyinCombStr(PinyinCombStrUpdateType.Update, pinyinComstrLeave);

      this.updateCandidateBarWithIme(this.pniyinCombStrBarInstance);
    }
  }
};
