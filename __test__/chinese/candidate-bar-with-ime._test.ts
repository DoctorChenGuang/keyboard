import { CandidateBarWithIme } from '../../keyboard/chinese/candidate-bar-with-ime';

describe("candidate bar with ime tests", () => {
  let candidateBarWithIme;

  beforeEach(() => {
    candidateBarWithIme = new CandidateBarWithIme();
  });

  it("should get correct candidateBar dom for new CandidateBarWithIme()", () => {
    let candidateBarContainer = candidateBarWithIme.create();

    // console.log('candidateBarContainer', candidateBarContainer);
  });

  it("should create pageTurningBtn for createPageTurningBtn function", () => {
    let candidateBarContainer = document.createElement('div');

    let btn = candidateBarWithIme.createPageTurningKey(candidateBarContainer);

    btn.click();
  });
});