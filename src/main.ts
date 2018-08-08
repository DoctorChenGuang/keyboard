import Vue from 'vue';
import AppComponent from './App.vue';
import { ScreenKeyboard } from '../keyboard/directives/index';

Vue.config.productionTip = false;

Vue.use(ScreenKeyboard);

export default new Vue({
  el: '#app',
  render: h => h(AppComponent)
});