export class LayoutManager {
  keyboardName: string = '';
  layouts: Array<string> = [];

  constructor(keyboardName) {
    this.keyboardName = keyboardName;
  }

  public getKeys() {
    console.log('找到所有按键key');
    return {
      normalKey: {},
      actionKey: {},
      layoutKey: {}
    }
  }

  private getLayouts(): void {
    console.log('得到键盘的布局种类');
    this.layouts = [];
  }

  public addLayout() {
    console.log('创建键盘布局');
    this.layouts = this.getLayouts();
  }
}