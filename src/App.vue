<template>
  <div id="app">
    <input type="text" v-keyboard="'text'">
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