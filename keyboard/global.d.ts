declare var HanziLookup;

declare var $;

declare var IME;

declare var InputEvent;

declare var cordova;

//此处应该是引入文件，引入jsdom 和 @types/jsdom但是没有效果
declare interface Window {
  InputEvent: typeof InputEvent;
}
