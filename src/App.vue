<template>
  <NavigationBar/>
  <QuestionArea/>
  <CameraArea/>
  <!-- 撮影ボタンとかはここで実装したほうが楽そう -->
  <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Snap!</button>

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
