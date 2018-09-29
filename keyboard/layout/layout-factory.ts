import { Layout } from "./layout";
import { LayoutConfig } from "../interface";

export class LayoutFactory extends Layout {
  constructor(layoutConfig: LayoutConfig) {
    super(layoutConfig);
  }

  public static layoutGenerator(layoutConfig: LayoutConfig): HTMLDivElement | void {
    return new LayoutFactory(layoutConfig).createLayout();
  }
};
