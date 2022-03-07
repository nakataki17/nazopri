<template>
  <NavigationBar v-show="showHeader"  v-bind="{playsSound,stopTime,course,showHeader,qcnt}" v-on="{'update:config':updateConfig}"/>
  <main class="flex flex-wrap h-full">
      <div class="h-5/6 lg:w-1/2  mx-auto ">
        <QuestionArea  :course="course" :qno="qno" :qcnt="qcnt" :keyboardPress="keyboardPress" />
      </div>
      <div class="h-5/6 lg:w-1/2  text-center mx-auto">
        <CameraArea @tookPhoto="saveImage" v-bind="{latastImage,playsSound,stopTime}" />
      </div>
  </main>

</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import CameraArea from './components/CameraArea.vue'
import NavigationBar from './components/NavigationBar.vue'
import QuestionArea from './components/QuestionArea.vue'
import {noImage} from "./assets/noImage.json"

export default defineComponent({
  name: 'App',
  components: {
    CameraArea,
    NavigationBar,
    QuestionArea,
  },
  setup(){   
    let qno = ref("1")
    //枚数
    let qcnt = ref({
      "Cool":9,
      "Crazy":9,
      "Hard":10,
      "Lovely":9,
      "Standard":9,
      "Cute":12,
    })
    //設定項目
    let course = ref(Object.keys(qcnt.value)[0])
    let playsSound = ref(true)
    let stopTime = ref(1500)
    let latastImage = ref(noImage)
    let showHeader = ref(true)

  
    const saveImage = (e) =>{
      latastImage.value = e 
    }


    const updateConfig = (e)=> {
      switch(e.changeName){
        case "playsSound":
          playsSound.value = e.value
          break
        case "stopTime":
          stopTime.value = e.value
          break
        case "course":
          course.value = e.value
      }
    }


    
    const keyboardPress = (e) => { 
      const code = e.code
      switch (code){
        case "KeyW":
          console.log("Q+")
          qno.value++
          if(qno.value>qcnt.value[course.value]){
            qno.value-- 
          }
          break
        case "KeyS":
          console.log("Q-")
          qno.value--
          if(qno.value<=0){qno.value=1}
          break
        case "KeyH":
          showHeader.value = !showHeader.value
          if(!showHeader.value){alert("push h to show again")}
          console.log("toggle navbar")
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
      latastImage,
      playsSound,
      stopTime,
      updateConfig,
      showHeader
    }
  }
})
</script>

<style>

</style>
