import { Key } from "./key";
import { CandidateSlot } from "../../handwriting-canvas";

//这个应该划分为中文候选词以及和手写板的候选词
export class CandidateKey extends Key {
  constructor() {
    super();
  }

  public static create(): CandidateKey {
    let candidateKey = new CandidateKey();

    CandidateSlot.candidateSlotList.push(candidateKey);

    return candidateKey;
  } 
};
