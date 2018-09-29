export class LayoutInfo {
  private _layoutName: string;

  public get layoutName(): string {
    return this._layoutName;
  }

  public set layoutName(value: string) {
    this._layoutName = value;
  }

  private _isEnable: boolean;

  public get isEnable(): boolean {
    return this._isEnable;
  }

  public set isEnable(value: boolean) {
    this._isEnable = value;
  }

  public setLayoutInfo(layoutName: string, isEnable: boolean): void {
    this.layoutName = layoutName;

    this.isEnable = isEnable;
  }
};
