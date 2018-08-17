import { KeyManager } from '../key-manager';

export class Layout {
  initLayout(layouts) {
    let currentLayouts = Object.keys(layouts);
    for (let layout of currentLayouts) {
      this.buildLayout(layouts[layout], layout);
    }
  }

  buildLayout(layout, layoutName) {
    if (!layout.KeyCodes) {
      return console.error('layout file doesnot conform to specification');
    }

    //创建layout布局
    const currentLayoutContainer = document.createElement('div');

    for (let row of layout.KeyCodes) {
      this.buildRow(row, layoutName);
    }
  }

  buildRow(row, layoutName) {
    for (let key of row) {
      this.buildKey(key);
    }
  }

  buildKey(key) {
    new KeyManager(key).createKey();
  }
}
