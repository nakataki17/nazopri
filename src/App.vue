<template>
  <NavigationBar/>
  <main class="flex flex-wrap h-full">
    <div></div>
      <div class="h-5/6 lg:w-1/2  mx-auto">
        <QuestionArea  :course="course" :qno="qno" :qcnt="qcnt" :keyboardPress="keyboardPress"/>
      </div>
      <div class="h-5/6 lg:w-1/2  text-center mx-auto">
        <CameraArea @tookPhoto="saveImage" :latastImage="latastImage" />
      </div>
  </main>

</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import CameraArea from './components/CameraArea.vue'
import NavigationBar from './components/NavigationBar.vue'
import QuestionArea from './components/QuestionArea.vue'

export default defineComponent({
  name: 'App',
  components: {
    CameraArea,
    NavigationBar,
    QuestionArea,
  },
  setup(){   
    //この辺はconfigでいじれるようになりたい
    let course = ref("Cute")
    let qno = ref("1")
    let qcnt = ref({
      "Cute":12,
    })
    let latastImage = ref("")

    const saveImage = (e) =>{
      latastImage.value = e 
    }
    
    const keyboardPress = (e) => { 
      const code = e.code
      switch (code){
        case "KeyW":
          console.log("Q+")
          qno.value++
          if(qno.value>=qcnt.value[course.value]){
            qno.value-- 
          }
          break
        case "KeyS":
          console.log("Q-")
          qno.value--
          if(qno.value<=0){qno.value=1}
          break
      }
    }
    document.addEventListener("keydown",keyboardPress)

    return{
      keyboardPress,
      course,
      qno,
      qcnt,
      saveImage,
      latastImage
    }
  }
})
</script>

<style>

</style>
