import phoneNumber from './src/phone-number/phone-number.layout';

export default {
  layout: {
    supplyKeyboardType: {//补充键盘布局
      "phoneNumber": phoneNumber,
      // 'normal': ['testLayout']
      'normal': ['chinese', 'symbol', 'hand-write',
        {
          layoutName: 'testLayout',
          layout: phoneNumber
        }
      ]
    },
    supplyKey: { //补充按键
      'keyName': {
        keyName: '',
        action: '',
        value: '',
        event: ""
      }
    },
    // resetKeyboardLayout: { // 重置键盘布局
    //   //如若不设置，则默认数组[0]为初始布局
    //   //仅使用这三个布局，然后去掉的布局的按键默认空白，也可以补充按键。
    //   'normal': ['chinese', 'symbol', 'hand-write']
    // },
  },
  style: {
    styleOptions: {//或者是使用样式的配置文件。.css文件，重新覆盖样式文件。
      'bg': {
        'bgColor': "1",
        'bgWidth': '2', // 不需要px
        'bgHeight': '3'
      }
    }
  },
  theme: {
    red: "",
    blue: ""
  }
}