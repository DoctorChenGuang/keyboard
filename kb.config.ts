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
    //按键的类型分为普通按键，以及功能按键
    supplyKey: { //补充按键
      'test1': {
        keyName: '',
        action: '',
        value: '',
        event: "",
        type: "normal"
      },
      //如果位置冲突则进行覆盖，需要知道补充按键的位置以及功能和类型
      'test2': {
        keyName: '',
        action: '',
        value: '',
        event: "",
        type: "action",
        //如果没有fn，就报错，此属性必须要有
        fn: () => ""
      }
    },
    //此属性用于兼容之前的使用方式。
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

//如果需要中文布局，请布局名称带有chinese