export class DefaultLayout {
  public getDefaultLayout() {
    return {
      none: '',
      number: 'number',
      text: ['chinese', 'symbol', 'hand-write', 'qwerty'],
      normal: ['chinese', 'symbol', 'hand-write', 'qwerty'],
      chineseId: 'chinese-id',
      address: ['chinese', 'symbol', 'hand-write', 'qwerty', 'address'],
      // phoneNumber: 'phone-number',
      numberWithoutPoint: 'number-without-point',
      numberMinus: 'number-minus'
    }
  }
}