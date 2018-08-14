import phoneNumber from './src/phone-number/phone-number.layout';

export default {
  supplyKeyboardType: {//补充键盘布局
    "phoneNumber": {
      layout: phoneNumber,
      keyboardType: "phoneNumber"
    },
  },
  supplyKey: { //补充按键
    'keyName': {
      keyName: '',
      action: '',
      value: '',
      event: ""
    }
  },
  resetKeyboardLayout: { // 重置键盘布局
    //如若不设置，则默认数组[0]为初始布局
    //仅使用这三个布局，然后去掉的布局的按键默认空白，也可以补充按键。
    'normal': ['chinese', 'symbol', 'hand-write']
  },
  styleOptions: {//或者是使用样式的配置文件。.css文件，重新覆盖样式文件。
    'bg': {
      'bgColor': "",
      'bgWidth': '', // 不需要px
      'bgHeight': ''
    }
  }
}