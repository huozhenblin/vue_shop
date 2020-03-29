<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        wojinxingle yici genggai 
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Test/>>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Test from './views/Test'


export default {
  name: 'app',
  components: {
   
  }
}
</script>

<style>
</style>
