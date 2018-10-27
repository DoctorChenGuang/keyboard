import { Key } from "./key";
import { CanvasManagerInstance } from "../../handwriting-canvas";

export class CanvasKey extends Key {
  constructor() {
    super();
  }

  //此处需要可配置????
  public inkRecognitionHandlerType: string = 'web';//这个配置项应该是在手写布局里面配置的
  
  public static create() {
    let canvasKey = new CanvasKey();

    canvasKey.initKeyBtn(this);
    canvasKey.buildContent();

    return canvasKey;
  }

  public buildContent(): void {
    this._createCanvas();
  }

  private _createCanvas(): void {
    CanvasManagerInstance.register(this._getCanvasName(), this._keyBtnElement, this.inkRecognitionHandlerType);
  }

  private _getCanvasName(): string {
    return this.keyName.split('-').map((value) => { 
      return value[0].toLocaleUpperCase() + value.substring(1);
    }).join('');
  }
}