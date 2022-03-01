<template>
  <NavigationBar/>
  <main class="flex flex-wrap h-screen">
    <div class="h-full hover:lg:w-1/2  mx-auto">
      <QuestionArea />
    </div>
    <div class="h-full lg:w-1/2  text-center mx-auto">
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
