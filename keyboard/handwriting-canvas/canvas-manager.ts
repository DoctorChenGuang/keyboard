import { Canvas } from './canvas';
import { FontLoader } from './font-loader';
// import { InsertTextAction } from '../key/key-action/insert-text-action';

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
    this.canvasMap.forEach((value) => {
      value.canvasName !== this.currentCanvasName && this.clear(value.drawingBoard);
    });
  }

  public clear(drawingBoard: any): void {
    if (!this.isPainting) return;

    drawingBoard.clearCanvas();
    drawingBoard.redraw();

    this.isPainting = false;
  }

  public getDefaultChars(): void {
    if (this.resultList[0] === undefined) return;

    this._insertText(this.resultList[0]);
  }

  private _insertText(txt) {
    console.log('需要插入字符', txt);
  }
}

let CanvasManagerInstance = new CanvasManager();

CanvasManagerInstance.init();

export {
  CanvasManagerInstance
};
