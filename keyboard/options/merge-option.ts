export class MergeOption {
  //合并用户自定义选项和默认选项
  merged(defaultOptions: object, userOptions: object): object {
    return this._extend(defaultOptions, userOptions);
  }
  //合并对象
  private _extend(defaultOptions: any, userOptions: any): object {
    let mergeOption = {};
    mergeOption["version"] = defaultOptions.version;
    mergeOption['layout'] = userOptions.layout;
    mergeOption['style'] = defaultOptions.style;
    mergeOption['theme'] = Object.assign(defaultOptions.theme, userOptions.theme);

    for (let defaultKey in defaultOptions["style"]) {
      // if(typeof defaultOptions["style"][defaultKey] !== 'object'){

      // }

      if (userOptions['style'][defaultKey] && defaultOptions["style"][defaultKey] !== userOptions['style'][defaultKey]) {
        mergeOption['style'][defaultKey] = userOptions['style'][defaultKey];
      }

    }
    console.log('mergeOption', mergeOption);
    return mergeOption;
  }
};

export enum userConfigAttrList {
  supplyKeyboardType,
  supplyKey,
  resetKeyboardLayout,
  styleOptions
}
