import phoneNumber from './src/phone-number/phone-number.layout';

export default {
  supplyKeyboardType: {//补充键盘布局
    "phoneNumber": {
      layout: phoneNumber,
      keyboardType: "phoneNumber"
    }
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

  }
}