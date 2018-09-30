import { Keyboard } from './keyboard';
import { LayoutOptions } from '../interface';
import { isPlainObject } from '../util/util';
import { StateMachine } from '../key';

interface KeyboardConfig {
  [propName: string]: any;
}

enum LayoutName {
  '手写' = 'hand-write',
  '符号' = 'symbol',
  '中文' = 'chinese',
  '英文' = 'english'
};

//应该是独有的特性，保证属性的修饰符是正确的
export class MultiLayoutKeyboard extends Keyboard {
  public layoutWidth: string = '';
  public layoutHeight!: string;
  public availableLayoutNameList!: Array<string>;
  public keyboardConfig: KeyboardConfig;
  public layoutInitState!: string;
  public disabledLayoutKeyList: Set<string> = new Set();

  constructor(currentInputElement: any, keyboardConfig: KeyboardConfig) {
    super(currentInputElement, keyboardConfig);

    this.keyboardConfig = keyboardConfig;
  }

  public async show(): Promise<void> {
    await this.initConfig();

    this.createKeyboardContainer();

    this.getAvailableLayoutNameList();

    this.setDisbaledLayoutKeyList();

    this.setInitLayout();

    this.layouts.forEach((layout, layoutName) => {
      if (layoutName === 'InitSet') return;

      let layoutOptions = this.getLayoutAllInfo(layout, layoutName);

      if (layoutOptions.isDisabled) {
        return;
      }

      this.createLayout(Object.assign(layoutOptions, {
        disabledLayoutKeyList: this.disabledLayoutKeyList
      }));
    });

    StateMachine.initState('layout', this.layoutInitState);

    this.parentDom.appendChild(this.keyboardContiner);
  }

  public close() {

  }

  //属于对配置项的提取，应该在之前就已经做好，直接使用，配置项的设置全部抽取出来
  //这个函数和下面的函数需要合并，优化函数功能
  public setDisbaledLayoutKeyList(): void {
    [...this.layouts.keys()].forEach((layoutName) => {
      this.availableLayoutNameList.indexOf(layoutName) === -1 && this.disabledLayoutKeyList.add(layoutName);
    });
  }

  public setInitLayout(): void {
    let layoutNameList = [...this.layouts.keys()];
    this.layoutInitState = layoutNameList[0];

    //这里的属性需要进行优化,属性名称，以及结构定义需要规范化
    let startupLayoutName = this.keyboardOptions.layout.supplyKeyboardType.startupLayoutName;

    if (!startupLayoutName) return;

    if (!LayoutName[startupLayoutName] && (layoutNameList.indexOf(startupLayoutName) === -1 && layoutNameList.indexOf(LayoutName[startupLayoutName])) === -1) throw new Error(`startupLayoutName:${startupLayoutName} is illegal`);

    this.layoutInitState = LayoutName[startupLayoutName] || startupLayoutName;
  }

  public getAvailableLayoutNameList(): void {
    this.availableLayoutNameList = [...this.layouts.keys()];

    //这里的属性需要进行优化,属性名称，以及结构定义需要规范化
    let availableLayoutNames = this.keyboardOptions.layout.supplyKeyboardType.availableLayoutNames;

    if (!availableLayoutNames) return;

    if (Array.isArray(availableLayoutNames)) {
      this.availableLayoutNameList = availableLayoutNames.map((availableLayoutName) => {
        if (typeof availableLayoutName === 'string') {
          return availableLayoutName = LayoutName[availableLayoutName] || availableLayoutName;
        }
        if (isPlainObject(availableLayoutName)) {
          return availableLayoutName = LayoutName[availableLayoutName.layoutName] || availableLayoutName.layoutName;
        }
      });

      return;
    }

    if (typeof availableLayoutNames !== 'string') return;

    this.availableLayoutNameList = availableLayoutNames.split(',').map((availableLayoutName) => {
      if (!LayoutName[availableLayoutName] && !availableLayoutName) throw new Error('availableLayoutNames: is illegal');

      return availableLayoutName = LayoutName[availableLayoutName] || availableLayoutName;
    });
  }

  public getLayoutAllInfo(layout: any, layoutName: string): LayoutOptions {
    return {
      layout: layout,
      layoutName: layoutName,
      setInitState: this.getSetInitState(layout),
      isDisabled: this.isDisabled(layoutName),
      layoutInitState: this.layoutInitState,
      hasLayoutKey: true
    }
  }

  public isDisabled(layoutName: string): boolean {
    return this.availableLayoutNameList.indexOf(layoutName) === -1;
  }
};
