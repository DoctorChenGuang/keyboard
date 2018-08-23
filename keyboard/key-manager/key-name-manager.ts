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
};

export class KeyNameManager {
  register(keyName) {
    console.log("keyName", keyName);
    console.log("keyName", KeyName[keyName]);
    return KeyName[keyName];
  }
}
