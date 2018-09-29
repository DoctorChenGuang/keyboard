import { CandidateBarWithIme } from './candidate-bar-with-ime';
import { PinyinComstrBar } from './pinyin-combstr-bar';
import { Layout } from '../layout';

export class ChineseLayout extends Layout{
  public candidateBarWithIme: CandidateBarWithIme = new CandidateBarWithIme();

  public hanziList: { syllables: string, words: string[] }[] = [];

  public create() {
    new CandidateBarWithIme(this.hanziList);
    new PinyinComstrBar();
  }
};
