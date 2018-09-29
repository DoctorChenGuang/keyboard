<template>
  <div id="app">
    <input type="text" v-keyboard="'phoneNumber'">
    <input type="text" v-keyboard="'normal'">
    <!--类型可能是为对象，需要删除成员之间的空格-->
    <!--单独这一个键盘-->
    <input type="text" v-keyboard="{type: 'normal', startupLayoutName: '符号', availableLayoutNames: '手写,符号'}">
    <input type="text" v-keyboard="{type: 'normal', startupLayoutName: '符号', availableLayoutNames: ['手写','符号', {layoutName: 'chinese', IsCapsLocked: true}]}">
    <input type="text" v-keyboard="{type: 'phoneNumber', keyboardPlacement: 'Top'}">
    <input type="text" v-keyboard="'number'">
    <input type="text" v-keyboard="{type: 'normal', availableLayoutNames: 'chinese'}">
  <!-- 需要去掉空格 -->
    <input type="text" v-keyboard="{type: 'normal', availableLayoutNames: 'chinese,english'}">
    <input type="text" v-keyboard="{type: 'normal', availableLayoutNames: 'chinese,symbol'}">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class AppComponent extends Vue {
    msg = 123;

    mounted() {
      this.greet()
    };

    get computedMsg() {
      return 'computed ' + this.msg
    };

    greet() {
      console.log('greeting: ' + this.msg)
    }
  }
</script>