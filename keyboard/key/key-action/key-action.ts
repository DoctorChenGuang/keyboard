import { Key } from "../key";

//这里应该是一个接口，并不是一个抽象类
//多种行为，所以定义的是行为的规范，而不是行为的抽象
export abstract class KeyAction {
  public abstract actionHandler(action: string, key?: Key, currentElement?: HTMLInputElement, setName?: string, layoutName?: string, setInitState?: string): void;

  public setInputScroll() {
    //插入以及删除的操作时都需要用到这个函数
  }
};
