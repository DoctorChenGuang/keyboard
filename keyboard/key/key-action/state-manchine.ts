export class StateMachine {
  public static stateList: Map<string, any> = new Map();

  //函数逻辑重复，需要优化
  //应该换一种模式
  public static register(ownerState: string, ownerDom: HTMLDivElement, layoutName: string, setName?: string): void {
    if (!this.stateList.has(ownerState)) {
      this.stateList.set(ownerState, new Map());
    }

    if (!setName) {
      this.stateList.get(ownerState).set(layoutName, ownerDom);
      return;
    }

    if (!this.stateList.get(ownerState).has(layoutName)) {
      this.stateList.get(ownerState).set(layoutName, new Map());
    }

    this.stateList.get(ownerState).get(layoutName).set(setName, ownerDom);
  }

  public static getStateList(): Map<string, any> {
    return this.stateList;
  }

  //函数需要优化
  public static switchState(ownerState: string, cb: any, layoutName?: string): void {
    StateMachine.getStateList().get(ownerState).forEach((value, key) => {
      if (!layoutName) {
        cb(value, key);
      } else {
        layoutName === key && value.forEach((v, k) => {
          cb(v, k);
        });
      }
    });
  }

  //函数需要优化
  public static initState(ownerState: string, initStateName: string, layoutName?: string): void {
    if (!this.stateList.has(ownerState)) {
      throw new Error(`ownerState:${ownerState} is not defined----`);
    }

    if (!layoutName) {
      this.stateList.get(ownerState).forEach((value, key) => {
        key === initStateName ? value.style.display = 'block' : value.style.display = 'none';
      });
      return;
    }

    if (!this.stateList.get(ownerState).has(layoutName)) throw new Error(`layoutName:${layoutName} is not defined`);

    this.stateList.get(ownerState).get(layoutName).forEach((value, key) => {
      key === initStateName ? value.style.display = 'block' : value.style.display = 'none';
    });
  }
};
