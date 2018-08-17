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
      this.createLayout(this.layouts);
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
        this.createLayout(await new LayoutFileLoader().layoutFileAsync(layoutItem));

        this.currentLayoutKeys.push(layoutItem);
      });

      this._isObject(layoutItem, () => {
        this._isObject(layoutItem.layout, () => {
          this.createLayout(layoutItem.layout);

          this.currentLayoutKeys.push(layoutItem.layoutName);
        })

        this._isString(layoutItem.layout, async () => {
          this.createLayout(await new LayoutFileLoader().layoutFileAsync(layoutItem.layoutName));

          this.currentLayoutKeys.push(layoutItem.layoutName);
        });
      })
    }
  }

  private _isObject(obj: any, callback: any): void {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      callback();
    }
  }

  private _isString(str: string, callback: any): void {
    if (typeof this.layouts === 'string') {
      callback();
    }
  }

  private _isNonarray(arr: Array<any>, callback: any): void {
    if (!Array.isArray(arr)) {
      callback();
    }
  }

  public createLayout(layout) {
    new Layout().initLayout(layout);
  }
}
