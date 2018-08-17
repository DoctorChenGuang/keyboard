import { DefaultLayout } from './default-layout';

export class LayoutFileLoader {
  public async layoutFileAsync(layoutName): Promise<any> {
    const layoutFolderName = 'layout-file';
    let layoutFile = await import(`../${layoutFolderName}/${layoutName}.layout.ts`);
    return layoutFile.default;
  }
}