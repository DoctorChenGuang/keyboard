import { Layout } from "./layout";
import { LayoutConfig } from './interface';

//layout已经功能实现,现在需要生成layout,但是我认为应该有一个layoutManager,用于管理不同的布局文件
//多布局的文件也应该是layoutManager里面管理的,然后不同的布局文件应该实现一个接口,用于实现额外的元素,参考中文键盘,
//对于键盘的位置,需要格外的注意并且优化,保证用户的使用简单.
//用户应该有完全的能力保证键盘的大小,样式.
//用户也完全可以进行自定义

//有哪些必须重新声明的函数
export class PhoneNumberLayout extends Layout {
  constructor(layoutConfig: LayoutConfig) {
    super(layoutConfig);
  }

  public static layoutGenerator(layoutConfig: LayoutConfig): HTMLDivElement | void {
    return new PhoneNumberLayout(layoutConfig).createLayout();
  }
};
