<template>   
  <main class="flex flex-no-wrap  flex-row items-center justify-between" >
      <div class="mt-0 h-5/6 w-1/2 mx-auto ">
        <QuestionArea ref="questionRef" :course="course" :imageInd="imageInd" :keyboardPress="keyboardPress" />
      </div>
      <div class="h-5/6 w-5/12 text-center mx-auto ">
        <CameraArea @tookPhoto="saveImage" v-bind="{latastImage,playsSound,stopTime,cameraHeight,cameraWidth}" />
      </div>
  
  </main>  
  <ConfigModal ref="configRef" v-bind="{playsSound,stopTime,course,cameraHeight,cameraWidth}" v-on="{'update:config':updateConfig}"></ConfigModal>
  <ImageUpload ref="printRef"></ImageUpload>
  <ResultModal ref="resultRef" v-bind="{pictureResult}" @openModal="emitOpenModal" />
  <NavigationBar ref="navBarRef" v-show="showHeader" v-bind="{playsSound,stopTime,course,showHeader,cameraHeight,cameraWidth,pictureResult,showHeader}" v-on="{'update:config':updateConfig,'openModal':openModal}"/>


</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import CameraArea from './components/CameraArea.vue'
import NavigationBar from './components/NavigationBar.vue'
import QuestionArea from './components/QuestionArea.vue'
import {placeHolder} from "./assets/noImage.json"
import ResultModal from './components/ResultModal.vue'
import ImageUpload from './components/ImageUpload.vue'
import ConfigModal from './components/ConfigModal.vue'


export default defineComponent({
  name: 'App',
  components: {
    CameraArea,
    NavigationBar,
    QuestionArea,
    ResultModal,
    ImageUpload,
    ConfigModal
  },
  emits:[],
  setup(){   
    
    //写真と正誤判定の保存
    const pictureResult  = ref([])
    for(let i = 0;i<8;i++){pictureResult.value.push({"picture":placeHolder,"result":"Wrong"})}
    //ローカルストレージからカメラ縦横の読み込み
    const cameraWidth = ref()
    const cameraHeight = ref()
    if(localStorage.cameraWidth){
      cameraWidth.value = localStorage.cameraWidth
    }else{
      localStorage.cameraWidth = 720
      cameraWidth.value = 720
    }
    if(localStorage.cameraHeight){
      cameraHeight.value = localStorage.cameraHeight
    }else{
      localStorage.cameraHeight = 720
      cameraHeight.value = 720
    }

    let imageInd = ref(0)
    //設定項目
    if(!localStorage.course){
      localStorage.course = "Cool"
    }
    let course = ref(localStorage.course)
    let playsSound = ref(true)
    let stopTime = ref(1500)
    let latastImage = ref(placeHolder)
    let showHeader = ref(false)

  
    const saveImage = (e) =>{
      latastImage.value = e.picture
      localStorage.latastImage = latastImage.value
      if(questionRef.value.questionInd>-1){
      pictureResult.value.splice(questionRef.value.questionInd-1, 1, e)
      }
      console.log(pictureResult)
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
          imageInd.value = 0
          pictureResult.value = []
          for(let i = 0;i<8;i++){pictureResult.value.push({"picture":placeHolder,"result":"Wrong"})}

      }
    }


    //子要素
    const resultRef = ref()
    const navBarRef = ref()
    const printRef = ref()
    const configRef = ref()
    const questionRef = ref()


    const keyboardPress = (e) => { 
      const code = e.code
      switch (code){
        case "KeyW":
          console.log("次の画像へ")
          imageInd.value++
          if(imageInd.value>12){imageInd.value = 12}
          break
        case "KeyS":
          console.log("前の画像へ")
          imageInd.value--
          if(imageInd.value<0){imageInd.value=0}
          break
        case "KeyH":
          configRef.value.toggleConfig()
          break
        case "KeyT":
          resultRef.value.toggleResultStat()
          console.log("show Result")
          break
        case "KeyP":
          printRef.value.sendExecute()
          console.log("print start")
          break
  
      }
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
      resultRef,
      navBarRef,
      printRef,
      configRef,
      questionRef
    }
  }
})
</script>

<style>

</style>
