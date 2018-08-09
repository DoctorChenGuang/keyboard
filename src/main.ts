import Vue from 'vue';
import AppComponent from './App.vue';
import { ScreenKeyboard } from '../keyboard/directives';
import keyboardOptions from '../kb.config';

Vue.config.productionTip = false;

Vue.use(ScreenKeyboard, keyboardOptions);

export default new Vue({
  el: '#app',
  render: h => h(AppComponent)
});