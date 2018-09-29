export class DefaultLayout {
  public static getDefaultLayout() {
    return {
      none: '',
      number: 'number',
      text: ['chinese', 'symbol', 'hand-write', 'english'],
      normal: ['chinese', 'symbol', 'hand-write', 'english'],
      chineseId: 'chinese-id',
      //不是所有的布局都会所有布局的切换按键
      address: ['chinese', 'symbol', 'hand-write', 'english', 'address'],
      // phoneNumber: 'phone-number',
      numberWithoutPoint: 'number-without-point',
      numberMinus: 'number-minus'
    }
  }
};
