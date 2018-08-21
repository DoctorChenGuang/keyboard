import { DefaultLayout } from './default-layout';
import { LayoutFileLoader } from './layout-file-loader';
import { Layout } from './layout';
import { KeyboardCss } from '../keyboard-style';

export class LayoutManager {
  keyboardName: string = '';

  layouts: any = '';

  currentLayoutKeys: Array<string> = []; // 布局名称

  css: any;

  constructor(keyboardName, layouts) {
    this.keyboardName = keyboardName;
    this.layouts = layouts;
    this.css = new KeyboardCss().definedCss();
  }

  static configure() {
    return new DefaultLayout().getDefaultLayout();
  }

  public async createKeyboard(): Promise<any> {
    let keyboardContainer = document.createElement('div');
    //键盘最外层需要设置class，并且可以进行皮肤的切换
    keyboardContainer.classList.add(this.css.keyboardContainer + this.keyboardName);

    await this.initLayoutAsync(keyboardContainer);

    keyboardContainer.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    keyboardContainer.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });

    document.body.appendChild(keyboardContainer);
    return keyboardContainer;
  }

  public async initLayoutAsync(keyboardContainer): Promise<void> {
    let flag = false;
    this._isObject(this.layouts, () => {
      flag = true;
      this.createLayout(this.layouts, this.keyboardName, keyboardContainer);
      this.currentLayoutKeys.push(this.keyboardName);
    });
    if (flag) return;

    this._isString(this.layouts, () => {
      this.layouts = [this.layouts];
    });

    this._isNonarray(this.layouts, () => {
      return console.error(`${this.layouts}is not array`);
    });

    for (let layoutItem of this.layouts) {
      this._isString(layoutItem, async () => {
        this.createLayout(await new LayoutFileLoader().layoutFileAsync(layoutItem), layoutItem, keyboardContainer);

        this.currentLayoutKeys.push(layoutItem);
      });

      this._isObject(layoutItem, () => {
        this._isObject(layoutItem.layout, () => {
          this.createLayout(layoutItem.layout, layoutItem.layoutName, keyboardContainer);

          this.currentLayoutKeys.push(layoutItem.layoutName);
        })

        this._isString(layoutItem.layout, async () => {
          const layoutFile = await new LayoutFileLoader().layoutFileAsync(layoutItem.layoutName)
          this.createLayout(layoutFile, layoutItem.layoutName, keyboardContainer);

          this.currentLayoutKeys.push(layoutItem.layoutName);
        });
      })
    }
  }

  public createLayout(layout, layoutName, keyboardContainer) {
    new Layout().initLayout(layout, layoutName, keyboardContainer);
  }

  private _isObject(obj: any, callback: any): void {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      callback();
    }
  }

  private _isString(str: string, callback: any): void {
    if (typeof str === 'string') {
      callback();
    }
  }

  private _isNonarray(arr: Array<any>, callback: any): void {
    if (!Array.isArray(arr)) {
      callback();
    }
  }
}
