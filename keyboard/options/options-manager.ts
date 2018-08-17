import { DefaultOptions } from "./default-options";
import { MergeOption } from "./merge-option";

export class KeyboardOptionsManager {
  private userOptions: any = {};

  static mergedOptions: any = {};

  constructor(userOptions: object) {
    this.userOptions = userOptions;
  }

  static configure(userOptions: any): void {
    let optionManager = new KeyboardOptionsManager(userOptions);
    optionManager.mergeOption();
  }

  public static getMergedOptions() {
    return this.mergedOptions;
  }

  public mergeOption() {
    let defaultOptions = new DefaultOptions().getOptions();

    KeyboardOptionsManager.mergedOptions = new MergeOption().merged(defaultOptions, this.userOptions);
  }
}
