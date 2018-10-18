import { Canvas } from './canvas';
import { FontLoader } from './font-loader';
import { InsertTextAction } from '../key/key-action/insert-text-action'
import { EmulateKeyboardEvent } from '../key';
import { InputType } from '../util/util';
import { CandidateSlot } from './candidate-slot';

export class CanvasManager {
  public currentCanvasName: string = "";

  public canvasMap: Map<string, any> = new Map<string, any>();

  public isPainting: boolean = false;

  public resultList: string[] = [];

  public matcherMMAH: any;

  public mmahJsonFilePath = '/static/mmah.json'; // 此处的选项应该是可以配置的

  public inkRecognitionHandlerType: string = 'web';

  public register(canvasName: string, canvasDom: HTMLButtonElement, inkRecognitionHandlerType: string = 'web'): void {
    let canvas: Canvas = new Canvas(canvasName, canvasDom);

    canvas.create(this);

    this.inkRecognitionHandlerType = inkRecognitionHandlerType;

    this.canvasMap.set(canvas.canvasName, canvas);
  }

  public async init(): Promise<void> {
    let result = await FontLoader.getMmahJsonFileAsync(this.mmahJsonFilePath);

    if (result.errorMsg) {
      console.error(result.errorMsg);
      return;
    }

    this.matcherMMAH = result.matcherMMAH;
  }

  public clearNotPaintCanvas(): void {
    this.canvasMap.forEach((canvas) => {
      canvas.canvasName !== this.currentCanvasName && this.clear(canvas.drawingBoard);
    });
  }

  public clear(drawingBoard: any): void {
    if (!this.isPainting) return;

    drawingBoard.clearCanvas();
    drawingBoard.redraw();
  }

  public clearAllCanvas(): void {
    this.canvasMap.forEach((canvas) => {
      canvas.drawingBoard.clearCanvas();
      canvas.drawingBoard.redraw();
    });

    this.isPainting = false;
  }

  public getDefaultChars(): void {
    if (this.resultList[0] === undefined) return;

    this._insertText(this.resultList[0]);
  }

  //此函数需要优化，不应该放在这里，应该提取出来
  private _insertText(txt: string): void {
    let key = CandidateSlot.candidateSlotList[0];
    let eventArgs = {
      action: txt,
      isComposing: true,
      inputType: InputType.InsertCompositionText
    };
    let eventAction = InsertTextAction.getKeyAction();

    let keyboardEvent = EmulateKeyboardEvent.getEmulateKeyboardEvent(key._keyBtnElement);
    keyboardEvent.emulateCanvasCandidate(eventArgs, () => {
      eventAction(txt, key, key.currentElement);
    });
  }
}

let CanvasManagerInstance = new CanvasManager();

CanvasManagerInstance.init();

export {
  CanvasManagerInstance
};
