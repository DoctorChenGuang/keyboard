export class KeyboardCss {
  css: any = {};
  definedCss() {
    //键盘上需要的css样式定义
    this.css = {
      keyboard: 'aui-keyboard',
      keyButton: 'aui-keyboard-button',
      keyText: "aui-keyboard-text",
      keyPrefix: 'aui-keyboard-',
      keyAction: 'aui-keyboard-actionkey',
      buttonDefault: 'aui-state-default aui-corner-all',
      keyWide: 'aui-keyboard-widekey',
      keySet: 'aui-keyboard-keyset',
      keyboardContainer: 'aui-keyboard-container-',
      chineseCombstr: 'chinese-combStr',
      combStr: 'aui-combstr-bar',
      keyActive: 'aui-keyboard-key-active'
    };
  }
}