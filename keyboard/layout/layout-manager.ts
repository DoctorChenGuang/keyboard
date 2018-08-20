import { DefaultLayout } from './default-layout';
import { LayoutFileLoader } from './layout-file-loader';
import { Layout } from './layout';

export class LayoutManager {
  keyboardName: string = '';

  layouts: any = '';

  currentLayoutKeys: Array<string> = []; // 布局名称

  constructor(keyboardName, layouts) {
    this.keyboardName = keyboardName;
    this.layouts = layouts;
  }

  static configure() {
    return new DefaultLayout().getDefaultLayout();
  }

  public async initLayoutAsync(): Promise<void> {
    let flag = false;
    this._isObject(this.layouts, () => {
      flag = true;
      this.createLayout(this.layouts, this.keyboardName);
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
        this.createLayout(await new LayoutFileLoader().layoutFileAsync(layoutItem), layoutItem);

        this.currentLayoutKeys.push(layoutItem);
      });

      this._isObject(layoutItem, () => {
        this._isObject(layoutItem.layout, () => {
          this.createLayout(layoutItem.layout, layoutItem.layoutName);

          this.currentLayoutKeys.push(layoutItem.layoutName);
        })

        this._isString(layoutItem.layout, async () => {
          const layoutFile = await new LayoutFileLoader().layoutFileAsync(layoutItem.layoutName)
          this.createLayout(layoutFile, layoutItem.layoutName);

          this.currentLayoutKeys.push(layoutItem.layoutName);
        });
      })
    }
  }

  public createLayout(layout, layoutName) {
    let keyboardContainer = document.createElement('div');
    // keyboardContainer.classList.add(this.css.keyboardContainer + this.keyboardType);
    //创建布局
    let layouts = new Layout().initLayout(layout, layoutName);

    keyboardContainer.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
    keyboardContainer.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });
    //???????????????
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
