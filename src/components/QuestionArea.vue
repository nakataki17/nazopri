<template>

<link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
 <SoundPlayer v-bind="{course,imageInd,time}"></SoundPlayer>
    <div class="mt-8 h-full mx-auto text-center">
      <img class="text-center  mx-auto my-auto"  v-bind:src="imgSrc" alt="">
    </div>
    <div>
      <span class="countdown font-mono text-9xl flex justify-center scale-150 mt-9" v-if="time>=0">
        <span v-bind:style="'--value:'+time+';'" v-bind:class="{'text-red-500':time<=5, 'text-white':imageInd>12}" ></span>
      </span>     
      <span class="flex justify-center" v-else>
        <span class="material-symbols-outlined mt-9 text-red-500" style="font-size:130px;">photo_camera</span>    
      </span>
    </div>

</template>

<script>

import { defineComponent, onMounted, ref, watchEffect} from "vue";
import questionData from "../assets/questionData/questions.json";
import SoundPlayer from "./SoundPlayer.vue";

export default defineComponent({
  name: "QuestionArea",
  props:{
    course: String,
    imageInd: Number,
    keyboardPress: Function
  },
  components:{
    SoundPlayer,
  },
  setup(props) {
    //こいつは常に一意のはず
    const timerID = ref()
    const time = ref(999)
    const questionInd = ref()

    onMounted(() => {
//        document.addEventListener("keydown",props.keyboardPress)
      console.log("mounted qArea")
    })

    //画像ソース
    const imgSrc = ref(require("@/assets/Images/説明_1.png") )

    const startTimer = (length) => {
      clearInterval(timerID.value)
      time.value = length
      timerID.value = setInterval(()=>{
        if(time.value > 0 ){
          time.value--
        }else{
          time.value--
          clearInterval(timerID.value)
        }
      },1000)
    }

    const changeImage = ()=>{
      const questionInfo = questionData[props.course]
      const {"制限時間":timeLimit, "ファイル名":fileName,"問題番号":qInd} = questionInfo[props.imageInd]
      questionInd.value = qInd
      imgSrc.value = require("@/assets/Images/"+fileName)
      if(timeLimit==-1){
        startTimer(100)//ダミー処理
      }else{
        startTimer(timeLimit)
      }
    }


    watchEffect(()=>{
      console.log(props.imageInd)
      //画像indの変更を監視して走るイベント
      changeImage()
    })



    return{
      timerID,
      imgSrc, 
      startTimer,
      time,
      questionInd
    }
  },
})
</script>

<style>
</style>