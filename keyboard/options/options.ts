import { isPlainObject } from '../util/util';
import { DefaultOptions } from './default-options';

interface themeList {

}

class Theme {
  public themeList: Array<{ themeName: string, themeFile: any }> = [{ themeName: 'default', themeFile: './path/file.css' }];

  public currentTheme: string = 'default'; // red
}

enum backgroundColor {
  Gray,
  Red,
  Blue,
  Block
}

class KeyboardStyle {
  public backgroundStyle: { bgColor: backgroundColor, bgWidth: string, bgHeight: string, fontSize: number } = {
    bgColor: backgroundColor.Block,

    bgWidth: '100',

    bgHeight: '100',

    fontSize: 24,
  };
}

enum KeyboardPlacement {
  Bottom = 'Bottom',
  Float = 'Float',
  Top = 'Top',
  None = 'None'
}

class KeyboardPlacementList {
  public none = KeyboardPlacement.None;

  public number = KeyboardPlacement.Float;

  public text = KeyboardPlacement.Bottom;

  public normal = KeyboardPlacement.Bottom;

  public chineseId = KeyboardPlacement.Float;

  public address = KeyboardPlacement.Bottom;

  public phoneNumber = KeyboardPlacement.Float;

  public numberWithoutPoint = KeyboardPlacement.Float;

  public numberMinus = KeyboardPlacement.Float;

  public default = KeyboardPlacement.Bottom;
}

interface UserOptions {
  [propName: string]: any;
}

interface DefaultOptions {
  [propName: string]: any;
}

export class Options {
  // public theme: Theme = new Theme();

  // public keyboardPlacement: KeyboardPlacementList = new KeyboardPlacementList();

  // public layout: Layout = new Layout();

  // public style: KeyboardStyle = new KeyboardStyle();

  // public keyOptions: Key = new Key();

  // public chineseOptions: ChineseLayout = new ChineseLayout();

  public userOptions: UserOptions;

  public defaultOptions: DefaultOptions;

  public static getOptions(userOptions: UserOptions, defaultOptions: any = DefaultOptions): any {
    let options = new Options(userOptions, defaultOptions);

    return options.mergeOption(options.defaultOptions);
  }

  constructor(userOptions: UserOptions, defaultOptions: any) {
    if (!isPlainObject(userOptions)) {
      console.error(`options type must object`);

      userOptions = {};
    }

    this.userOptions = userOptions;

    this.defaultOptions = defaultOptions;
  }

  public mergeOption(defaultOptions: any): any {
    if (this.userOptions === {}) return;

    let userOptionsKey: Array<string> = Object.keys(this.userOptions);

    for (let key of userOptionsKey) {
      if (!defaultOptions[key]) throw new Error(`${key} attribute is not exist.`);
    }

    let mergeOption = {};

    this._mergeOptions(defaultOptions, this.userOptions, mergeOption);

    return mergeOption;
  }

  public _mergeOptions(defaultValue, userValue, mergeOption): void {
    this._mergedDiffOptions(defaultValue, userValue, (item, value) => {

      mergeOption[item] = value;

    }, (key, defaultValue, userValue) => {

      if (!isPlainObject(userValue) || !isPlainObject(defaultValue)) {

        mergeOption[key] = userValue;

        return;
      }

      let obj = mergeOption[key] = {};

      this._mergeOptions(defaultValue, userValue, obj);
    });
  }

  private _mergedDiffOptions(defaultOptions, userOptions, cbDiff: Function, cb: Function) {
    let defaultOptionsList: Array<string> = Object.keys(defaultOptions);

    let userOptionsKeyList: Array<string> = Object.keys(userOptions);

    for (let key of defaultOptionsList) {
      userOptionsKeyList.findIndex((item: string) => key === item) <= -1 ? cbDiff(key, defaultOptions[key]) : cb(key, defaultOptions[key], userOptions[key]);
    }

    for (let key of userOptionsKeyList) {
      defaultOptionsList.findIndex((item: string) => key === item) <= -1 ? cbDiff(key, userOptions[key]) : () => "";
    }
  }
};

