export enum KeyboardPlacement {
  Bottom,
  Float,
  Top
}

export enum KeyboardDefaultPlacement {
  none = '',
  number = 'Float',
  text = "Bottom",
  normal = "Bottom",
  chineseId = 'Float',
  address = "Bottom",
  phoneNumber = 'Float',
  numberWithoutPoint = 'Float',
  numberMinus = "Float",
  //如果没有调用的键盘，默认是在底部，用户可以自行定义，最好自行定义
  default = 'Bottom'
}
