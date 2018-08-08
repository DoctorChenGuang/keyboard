import Keyboard from './keyboard';
import fullOption from './full-option';

export default class KeyboardManager {

  static keyboard

  static configure(options) {
    KeyboardManager.keyboard = new Keyboard(Object.keys(options)[0], options[Object.keys(options)[0]]) || new Keyboard("full", fullOption)
  }

  static showScreenKeyboardAsync() {
    KeyboardManager.keyboard && KeyboardManager.keyboard.show()
  }

  static closeScreenKeyboardAsync() {
    KeyboardManager.keyboard && KeyboardManager.keyboard.show()
  }
}
