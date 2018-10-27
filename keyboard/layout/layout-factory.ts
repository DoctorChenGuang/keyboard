import { LayoutConfig } from "../interface";
import { ChineseLayout } from '../chinese';
import { NormalLayout } from "./normal-layout";

export class LayoutFactory {
  public static layoutGenerator(layoutConfig: LayoutConfig): HTMLDivElement | void {
    //我希望的是在创建这个对象之前，我会做些什么，
    //属于代理模式，还是装饰者模式？？
    if (layoutConfig.layoutName === 'chinese') {
      return ChineseLayout.create(layoutConfig);
    } else {
      return NormalLayout.create(layoutConfig);
    }
  }
};
