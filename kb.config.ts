import phoneNumber from './src/phone-number/phone-number.layout';

export default {
  supplyKeyboardType: {
    "phoneNumber": {
      layout: phoneNumber,
      keyboardType: "phoneNumber"
    }
  },
  supplyKey: {
    'keyName': {
      keyName: '',
      action: '',
      value: '',
      event: ""
    }
  }
}