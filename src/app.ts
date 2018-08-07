import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: '<button @click="onClick">Click!</button>',
  // template: require('./app.html'),
})

export default class AppComponent extends Vue {
  // 初始数据可以直接声明为实例的属性
  message: string = 'Hello!';

  // 组件方法也可以直接声明为实例的方法
  onClick(): void {
    window.alert(this.message);
  }
}