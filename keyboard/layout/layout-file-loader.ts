import { DefaultLayout } from './default-layout';

export class LayoutFileLoader {
  public async layoutFileAsync(keyboardType): Promise<object> {
    let layoutFileName = DefaultLayout[keyboardType];

    if (!layoutFileName) {
      return {};
    }

    let layoutFile = await import(`./${layoutFileName}.layout.ts`);
    return layoutFile;
  }
}