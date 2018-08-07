import Vue from 'vue';
import AppComponent from './App.vue';

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: h => h(AppComponent)
});