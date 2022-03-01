<template>
  <NavigationBar/>
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

</style>
