<template>
  <NavigationBar/>
  <main class="flex flex-wrap">
    <div class="w-full lg:w-1/2">
      <QuestionArea />
    </div>
    <div class="w-full lg:w-1/2">
      <CameraArea />
    </div>
  </main>

</template>

<script>
import CameraArea from './components/CameraArea.vue'
import NavigationBar from './components/NavigationBar.vue'
import QuestionArea from './components/QuestionArea.vue'

export default {
  name: 'App',
  components: {
    CameraArea,
    NavigationBar,
    QuestionArea,
}
}
</script>

<style>

</style>
