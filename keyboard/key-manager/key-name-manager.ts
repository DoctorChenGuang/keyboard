enum KeyName {
  "english" = "英文",
  "cancel" = "删除",
  "chinese" = "中文",
  "accept" = "确定",
  "write" = "手写",
  "capital" = "大写",
  "symbol" = "符号",
  "space" = "空格",
  "left" = "←",
  "right" = "→",
  "toggle" = "收起",
  "single" = "全角",
  "candidate" = "",
  "handwriting-left" = "",
  "handwriting-right" = ""
};

//这个应该是可以配置的，如果用户想更换的话？？？
//注册指令时需要进行初始化配置
export class KeyNameManager {
  //但是value的值是不可以重复的
  register(keyName) {
    if (KeyName[keyName] === undefined) return keyName;
    return KeyName[keyName];
  }
}
