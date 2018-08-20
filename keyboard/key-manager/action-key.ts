export class ActionKey {
  keyInfo: object = {};

  constructor(keyInfo) {
    this.keyInfo = keyInfo;
  }

  createActionKey() {
    console.log('创建功能按键');
  }
}