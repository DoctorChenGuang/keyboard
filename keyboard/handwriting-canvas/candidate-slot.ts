//候选词算是按键，但是不会触发keydown事件，只应该触发input事件
//这个候选词应该提取出来
export class CandidateSlot {
  public static candidateSlotList: Array<any> = [];

  public currentDrawingBoard: any = '';

  //函数行为重复，需要优化
  public static showCandidate(matchResult: Array<string>): void {
    let candidateSlotList = this.candidateSlotList;

    for (let index = 0; index < candidateSlotList.length; index++) {
      if (!matchResult[index]) return;
      candidateSlotList[index]._keyBtnElement.childNodes[0].innerText = matchResult[index];
    }
  }

  public static clearCandidate(): void {
    let candidateSlotList = this.candidateSlotList;

    for (let index = 0; index < candidateSlotList.length; index++) {
      candidateSlotList[index]._keyBtnElement.childNodes[0].innerText = "";
    }
  }
};
