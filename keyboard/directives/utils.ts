const utils = {
  warn(msg: string): void {
    console.error(msg);
  },
  isInputElement(elementName: string): boolean {
    return (elementName === 'INPUT' || elementName === 'TEXTAREA') ? true : false;
  },
  getCurrentElement(target: HTMLElement): HTMLElement | null {
    if (this.isInputElement(target.nodeName)) {
      return target;
    }

    const inputList: NodeListOf<HTMLInputElement> = target.getElementsByTagName('input');
    const inputListLength: number = inputList.length;

    if (inputListLength === 1) {
      return inputList[0];
    }

    const textareaList: NodeListOf<HTMLTextAreaElement> = target.getElementsByTagName('textarea');
    const textareaListLength: number = textareaList.length;

    if (textareaListLength === 1) {
      return textareaList[0];
    }

    this.warn(`warning:input or textarea isnot`);
    return null;
  }
}

export default utils;