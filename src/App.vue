<template>
  <div id="app">
    <input v-model="msg">
    <p>msg: {{ msg }}</p>
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
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
      alert('greeting: ' + this.msg)
    }
  }
</script>