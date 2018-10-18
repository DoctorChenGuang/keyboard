import { CanvasManager } from './canvas-manager';
import { InkRecognitionHandler } from './ink-recognition-handler';
import { CandidateSlot } from './candidate-slot';

export class Canvas {
  public drawingBoard;

  public canvasManager!: CanvasManager;

  public canvasName: string = '';

  public canvasDom: HTMLButtonElement;

  public analyzedCharCount: number;

  public isGetDefaultChars: boolean = true; //此处的属性需要是可配置的

  constructor(canvasName: string, canvasDom: HTMLButtonElement, analyzedCharCount: number = 8) {
    this.canvasName = canvasName;

    this.canvasDom = canvasDom;

    this.analyzedCharCount = analyzedCharCount;
  }

  public create(canvasManager: CanvasManager): void {
    this.canvasManager = canvasManager;

    this.drawingBoard = HanziLookup.DrawingBoard($(this.canvasDom), async () => {
      await this.painting();
    });
  }

  public async painting(): Promise<void> {
    this.canvasManager.isPainting = true;
    if (this.canvasManager.currentCanvasName !== this.canvasName) {
      this.canvasManager.currentCanvasName = this.canvasName;

      this.canvasManager.clearNotPaintCanvas();

      //此功能应该设置是否打开
      this.isGetDefaultChars && this.canvasManager.getDefaultChars();
    }

    let analyzedChar = new HanziLookup.AnalyzedCharacter(this.drawingBoard.cloneStrokes());

    let matchResult = await InkRecognitionHandler.getMatchResult(this.canvasManager.inkRecognitionHandlerType, analyzedChar, this.analyzedCharCount, this.canvasManager.matcherMMAH);

    this.canvasManager.resultList = matchResult;

    CandidateSlot.showCandidate(matchResult);
  }
};
