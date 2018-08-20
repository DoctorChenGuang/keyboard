import { DefaultLayout } from './default-layout';

export class LayoutFileLoader {
  public async layoutFileAsync(layoutName): Promise<any> {
    const layoutFolderName = 'layout-file';

    if (!this._isFileExist(layoutName)) throw new Error(`Cannot find layoutFile '${layoutName}.layout.ts`);
    let layoutFile = await import(`../${layoutFolderName}/${layoutName}.layout.ts`);

    return layoutFile.default;
  }

  private _isFileExist(layoutName: any): boolean {
    let layoutList = new DefaultLayout().getDefaultLayout();

    let arr: Array<any> = [];
    for (let layout in layoutList) {
      arr = arr.concat(layoutList[layout]);
    }

    if (arr.findIndex(value => value == layoutName) > 0) return true;
    return false;
  }
};
