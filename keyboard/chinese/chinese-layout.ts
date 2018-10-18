import { CandidateBarWithIme } from './candidate-bar-with-ime';
import { PinyinComstrBar } from './pinyin-combstr-bar';
import { LayoutConfig } from '../interface';
import { PinyinCombStrUpdateType } from '../interface';
import { Layout } from '../layout/layout';
import { SetFactory } from '../set';

export class ChineseLayout extends Layout {
  public candidateBarWithImeInstance!: CandidateBarWithIme;

  public pniyinCombStrBarInstance!: PinyinComstrBar

  public static instance: ChineseLayout;

  // public hanziList: { syllables: string, words: string[] }[] = [];

  constructor(layoutConfig: LayoutConfig) {
    super(layoutConfig);
  }

  public static create(layoutConfig): HTMLDivElement | void {
    if (!ChineseLayout.instance) {
      ChineseLayout.instance = new ChineseLayout(layoutConfig);
    }

    return ChineseLayout.instance.create();
  }

  //此函数需要进行优化写法
  public create(): HTMLDivElement | void {
    this.createLayout();

    let pinyinComstrBar = this.pniyinCombStrBarInstance = new PinyinComstrBar({});
    let pinyinCombstrBarContainer = pinyinComstrBar.create();

    let candidateBarWithIme = this.candidateBarWithImeInstance = new CandidateBarWithIme();
    let candidateBarContainer = candidateBarWithIme.create();

    this.register(pinyinCombstrBarContainer);
    this.register(candidateBarContainer);
    this.register(SetFactory.create(this.layouts, this));

    return this.currentLayoutContainer;
  }

  public async chineseInsertAction(action: string): Promise<void> {
    this.pniyinCombStrBarInstance.updatePinyinCombStr(PinyinCombStrUpdateType.Insert, action);

    await this.candidateBarWithImeInstance.updateCandidateBarWithIme(this.pniyinCombStrBarInstance);
  }

  public async chineseCancelAction(): Promise<void> {
    this.pniyinCombStrBarInstance.updatePinyinCombStr(PinyinCombStrUpdateType.Cancel);

    await this.candidateBarWithImeInstance.updateCandidateBarWithIme(this.pniyinCombStrBarInstance);
  }
};
