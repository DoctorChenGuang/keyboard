export class KeyboardPosManager {
  keyboard: any;

  constructor(keyboard) {
    this.keyboard = keyboard;
  }

  setKeyboardPosition(screenRegion) {
    console.log('设置键盘的位置');
    console.log('screenRegion-键盘的位置', screenRegion);
  }

  restoreOriginalPosition() {
    console.log('交易复原位置');
  }

  setKeyboardPlacement() {
    console.log('设置键盘的跟随方式');
  }
}