<template>
  <ResultCard ref="modalRef" v-bind="{pictureResult:pictureResult}"></ResultCard>
  <NavigationBar v-show="showHeader"  v-bind="{playsSound,stopTime,course,showHeader,cameraHeight,cameraWidth,pictureResult}" v-on="{'update:config':updateConfig,'openModal':openModal}"/>
  <main class="flex flex-wrap h-full  items-center" >
      <div class="h-5/6 lg:w-1/2  mx-auto ">
        <QuestionArea  :course="course" :imageInd="imageInd" :keyboardPress="keyboardPress" />
      </div>
      <div class="h-5/6 lg:w-1/2  text-center mx-auto">
        <CameraArea @tookPhoto="saveImage" v-bind="{latastImage,playsSound,stopTime,cameraHeight,cameraWidth}" />
      </div>
  </main>

</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import CameraArea from './components/CameraArea.vue'
import NavigationBar from './components/NavigationBar.vue'
import QuestionArea from './components/QuestionArea.vue'
import {placeHolder} from "./assets/noImage.json"
import ResultCard from './components/ResultCard.vue'

export default defineComponent({
  name: 'App',
  components: {
    CameraArea,
    NavigationBar,
    QuestionArea,
    ResultCard,
  },
  emits:[],
  setup(){   
    //写真と正誤判定の保存
    const pictureResult  = ref([])
    //ローカルストレージからカメラ縦横の読み込み
    const cameraWidth = ref()
    const cameraHeight = ref()
    if(localStorage.cameraWidth){
      cameraWidth.value = localStorage.cameraWidth
    }else{
      localStorage.cameraWidth = 480
      cameraWidth.value = 480
    }
    if(localStorage.cameraHeight){
      cameraHeight.value = localStorage.cameraHeight
    }else{
      localStorage.cameraHeight = 720
      cameraHeight.value = 720
    }

    let imageInd = ref("1")
    //設定項目
    if(!localStorage.course){
      localStorage.course = "クール"
    }
    let course = ref(localStorage.course)
    let playsSound = ref(true)
    let stopTime = ref(1500)
    let latastImage = ref(placeHolder)
    let showHeader = ref(true)

  
    const saveImage = (e) =>{
      latastImage.value = e.picture
      localStorage.latastImage = latastImage.value
      pictureResult.value.push(e)
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
          imageInd.value++
          if(imageInd.value>12){imageInd.value = 12}
          break
        case "KeyS":
          console.log("Q-")
          imageInd.value--
          if(imageInd.value<0){imageInd.value=0}
          break
        case "KeyH":
          showHeader.value = !showHeader.value
          if(!showHeader.value){alert("push h to show again")}
          console.log("toggle navbar")
          break
      }
    }

    //モーダルらへん
    const modalId = ref(0)
    const modalResult = ref()
    const modalImage = ref()
    const modalRef = ref()
    const openModal = (e) => {
      modalRef.value.openModal(e)
    }

    document.addEventListener("keydown",keyboardPress)


    return{
      keyboardPress,
      course,
      imageInd,
      saveImage,
      latastImage,
      playsSound,
      stopTime,
      updateConfig,
      showHeader,
      cameraHeight,
      cameraWidth,
      pictureResult,
      openModal,
      modalId,
      modalResult,
      modalImage,
      modalRef,
    }
  }
})
</script>

<style>

</style>
