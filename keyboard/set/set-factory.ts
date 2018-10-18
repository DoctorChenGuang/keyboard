import { SetOfLayout } from "./set-of-layout";
import { Layout } from "../layout";
import { StateMachine } from "../key";

export class SetFactory {
  public layouts: any;
  public ownerLayout: Layout;

  constructor(layouts: any, ownerLayout: Layout) {
    this.layouts = layouts;
    this.ownerLayout = ownerLayout;
  }

  public static create(layouts: any, ownerLayout: Layout): void {
    new SetFactory(layouts, ownerLayout).createSet();
  }

  //此函数的内部变量需要重新设计
  public createSet(): void {
    let layoutNameList = Object.keys(this.layouts);
    if (!layoutNameList) return;

    //keylist的名称应该是可以配置的, 关键词的定义需要谨慎
    if (layoutNameList.findIndex((value) => {
      return value.toLowerCase() === 'keylist'
    }) > -1 && layoutNameList.length === 3) {
      let setContainer = SetOfLayout.create(this.ownerLayout, this.layouts);

      this.ownerLayout.currentLayoutContainer.appendChild(setContainer);
    } else {
      for (let setName of layoutNameList) {
        if (setName === 'InitSet') continue;

        this.ownerLayout.setList.add(setName);

        this.ownerLayout.hasShiftKey = true;

        let setContainer = SetOfLayout.create(this.ownerLayout, this.layouts[setName], setName);
        this.ownerLayout.currentLayoutContainer.appendChild(setContainer);
      }
    }

    this.ownerLayout.hasShiftKey && StateMachine.initState('set', this.ownerLayout.setInitState, this.ownerLayout.layoutName);
  }
}