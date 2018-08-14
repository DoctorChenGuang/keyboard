export class MergeOption {
  //合并用户自定义选项和默认选项
  merged(DefaultOptions: object, keyboardOptions: object): object {
    console.log('DefaultOptions', DefaultOptions);
    console.log('keyboardOptions', keyboardOptions);
    return {
      name: 'jack',
      age: '1'
    };
  }
};