// //一种行为的规范
// export interface LayoutDom {

// }
interface Around {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right'
}

export class LayoutAddtionalDom {
  public layoutContainer: HTMLDivElement;

  constructor(layoutContainer: HTMLDivElement, around: Around) {
    this.layoutContainer = layoutContainer;
  }

  public static register(addtionalDom, around: Around) {
    new LayoutAddtionalDom(addtionalDom, around);
  }

  public createAddtionalDom(addtionalDom) {
    this.layoutContainer.appendChild(addtionalDom);
  }
};

//用户应该如何注册