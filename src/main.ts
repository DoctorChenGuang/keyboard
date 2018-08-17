import Vue from 'vue';
import AppComponent from './App.vue';
import { ScreenKeyboard, UserKeyboardOptions } from '../keyboard/directives';
import keyboardOptions from '../kb.config';

Vue.config.productionTip = false;

//修改键盘默认配置选项
UserKeyboardOptions.configure(keyboardOptions);
Vue.use(ScreenKeyboard, {
  test: '1',
  age: '2'
});

export default new Vue({
  el: '#app',
  render: h => h(AppComponent)
});