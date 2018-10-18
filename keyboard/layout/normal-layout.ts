import { Layout } from "./layout";
import { LayoutConfig } from "../interface";
import { SetFactory } from '../set';

export class NormalLayout extends Layout {
  constructor(layoutConfig: LayoutConfig) {
    super(layoutConfig);
  }

  public static create(layoutConfig: LayoutConfig): HTMLDivElement {
    let normalLayout = new NormalLayout(layoutConfig);
    normalLayout.create();
    return normalLayout.currentLayoutContainer;
  }

  public create(): void {
    this.createLayout();

    this.register(SetFactory.create(this.layouts, this));
  }
};
