import Vue from 'vue';
import AppComponent from './App.vue';
import { KeyboardDirective } from '../directives';
import keyboardOptions from '../kb.config';
import { KeyboardManager } from '../keyboard';
// import '../keyboard/keyboard-style/keyboard.css';

Vue.config.productionTip = false;

//此处写法需要更新
// KeyboardManager.configure({
//   qwerty: {
//     inkRecognitionHandler: inkRecognitionHandler.web
//   }
// });
// Keyboard.registerLayout(layout);
//用户在注册键盘的时候，注册布局，需要得到什么？给出什么？内部注册的逻辑是什么？？
// LayoutManager.register(userLayout);//用户自行注册的layout

//也可以在注册插件的时候传入参数
Vue.use(KeyboardDirective);

KeyboardManager.configure(keyboardOptions);

// 但是作为组件时，没有办法在注册插件的时候传入参数
// <aui-keyboard :options='obj'></aui-keyboard>
export default new Vue({
  el: '#app',
  render: h => h(AppComponent)
});