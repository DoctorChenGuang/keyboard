export class StateMachine {
  public static stateList: Map<string, any> = new Map();

  public static register(ownerState: string, name: string, ownerDom: HTMLDivElement): void {
    if (!this.stateList.has(ownerState)) {
      this.stateList.set(ownerState, new Map());
    }

    this.stateList.get(ownerState).set(name, ownerDom);
  }

  public static getStateList(): Map<string, any> {
    return this.stateList;
  }

  public static switchState(ownerState: string, cb: any): void {
    let stateList = StateMachine.getStateList().get(ownerState);

    stateList.forEach((value, key) => {
      cb(value, key);
    });
  }

  public static initState(ownerState: string, initStateName: string, layoutName?: string): void {
    if (!this.stateList.has(ownerState)) {
      throw new Error('ownerState is not defined');
    }

    //对于set的切换是同在同一个layout的
    if (!layoutName) {
      this.switchState(ownerState, (value, key) => {
        key === initStateName ? value.style.display = 'block' : value.style.display = 'none';
      });
    }

  }
};
