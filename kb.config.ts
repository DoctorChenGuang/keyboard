import phoneNumber from './src/phone-number/phone-number.layout';

// //对于自定义布局的扩展
// //全局设置

export default {
  layout: {
    supplyKeyboardType: {//补充键盘布局
      "phoneNumber": phoneNumber,
      //中文键盘大写锁定
      // 'normal': {
      //   layoutList: ['symbol', '手写', { layoutName: 'chinese', IsCapsLocked: true }, '英文'],
      //   startupLayoutName: '符号', 
      //   availableLayoutNames: ['手写','符号', {layoutName: 'chinese', IsCapsLocked: true}]
      // }
      // 'normal': ['symbol', 'hand-write', { layoutName: 'chinese', IsCapsLocked: true , 'layout': 'chinese'}]
      // 'normal': ['testLayout']
      // 'normal': ['chinese', 'symbol', 'hand-write',
      //   {
      //     layoutName: 'testLayout',
      //     layout: phoneNumber
      //   }
      // ]
    },
    // 此属性用于兼容之前的使用方式。
    // resetKeyboardLayout: { // 重置键盘布局
    //   //如若不设置，则默认数组[0]为初始布局
    //   //仅使用这三个布局，然后去掉的布局的按键默认空白，也可以补充按键。
    //   'normal': ['chinese', 'symbol', 'hand-write'],
    //   'startupLayoutName': '符号', // symbol,s,Symbol都应该是可以的
    //   //中文键盘大写锁定
    //   'availableLayoutNames': ['symbol', '手写', { layoutName: 'chinese', IsCapsLocked: true }]
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
  // // 键盘的跟随方式,跟随方式不同，键盘的样式布局也是不同的。
  keyboardPlacement: 'Float',
  // keyboardPlacement: {
  //   'normal': 'Float',
  //   'phoneNumber': 'Float'
  // },
  theme: {
    themeList: {
      red: "",
      blue: "",
    },
    currentTheme: 'default'
  },
  version: "3.0.0",
  
  inkRecognitionHandler: "web"
};
