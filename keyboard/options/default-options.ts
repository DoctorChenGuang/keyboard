import { KeyboardDefaultPlacement } from '../keyboard-pos-manager';
import { DefaultLayout } from '../layout';

//内部使用，统一定义
let DefaultOptions = {
  version: '2.0.0',
  layout: {
    supplyKeyboardType: {},
    supplyKey: {}
  },
  theme: {
    themeList: {
      default: "default",
    },
    currentTheme: 'default'
  },
  style: {
    // 样式选项
    styleOptions: {
      'bg': {
        'bgColor': "1",
        'bgWidth': '1', // 不需要px
        'bgHeight': '1',
        "fontSize": 24,
      }
    },
    keyOptions: {
      kbWidth: 38.75, //一个col的宽度
      kbHeight: 38.75, //一个row的高度
      keyWidth: 37, //一个按键的一半的宽度
      keyHeight: 37, //一个按键一半的高度
    },
    chinese: {
      charactersCount: 10, //中文键盘的候选词槽的个数
      characterWidth: 60, //每个候选词槽的宽度
      characterHeight: 55, //每个候选词槽的高度
      charactersContainerMargin: 5, //候选词槽之间的外边距
      combStrContainerHeight: 36, //中文拼音容器的高度
      charactersListLength: 0, //候选词条列表的长度
      checkInfoBlankHeight: 20, //校验信息留白高度
      checkInfoBlankWidth: 0, //校验信息留白宽度
      //数字小键盘与英文之间的间距
      numberKBMargin: 12,
      //候选词列表的下边距
      candidateBarMarginBottom: 3,
      showCharacterContainerHeight: 0,
      line: 0
    }
  },
  keyboardPlacement: KeyboardDefaultPlacement,
  layouts: DefaultLayout.getDefaultLayout(),
  inkRecognitionHandler: 'web'
}

export {
  DefaultOptions
};
