<template>
  <NavigationBar/>
  <img class="m-auto" alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <CameraArea/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CameraArea from './components/CameraArea.vue'
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    CameraArea,
    NavigationBar,
}
}
</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
