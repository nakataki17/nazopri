<template>
    <div class="w-5/6 h-full mx-auto text-center">
      <img class=" text-center  mx-auto my-auto"  v-bind:src="imgSrc(course,imageInd)" alt="">
    </div>
    <div>
      <span class="countdown font-mono text-9xl flex justify-center scale-150 mt-9" v-if="time>=-1">
        <span v-bind:style="'--value:'+time+';'" v-bind:class="{'text-red-500':time<=5, 'text-white':imageInd<=0 || imageInd>=9}" ></span>
      </span>
      <span class="text-red-500 font-title text-3xl flex justify-center" v-else>Time's up!</span>      
    </div>

</template>

<script>
import { defineComponent, onMounted, ref,watchEffect} from "vue";
import QList from "../assets/QList.json"

export default defineComponent({
  name: "QuestionArea",
  props:{
    course: String,
    imageInd: Number,
    keyboardPress: Function
  },

  setup(props) {
    //こいつは常に一意のはず
    const timerID = ref()
    const time = ref(999)

    onMounted(() => {
//        document.addEventListener("keydown",props.keyboardPress)
      console.log("mounted qArea")
    })

    const imgSrc = ()=>{
      if(1<=props.imageInd && props.imageInd<=8){
        return require("@/assets/"+props.course+"/"+props.imageInd+".png")
      }else if(-1<=props.imageInd && props.imageInd<=10){
        return require("@/assets/説明/"+props.imageInd+".png")
      }
    }

    const startTimer = (length) => {
      clearInterval(timerID.value)
      time.value = length
      timerID.value = setInterval(()=>{
        if(time.value > -1 ){
          time.value--
        }else{
          time.value--
          clearInterval(timerID.value)
        }
      },1000)
    }

    watchEffect(()=>{
      //eslint-disable-next-line
      let qcourse = props.course
      let times = QList[qcourse].timeLimit
      if(1<=props.imageInd && props.imageInd<=8){
      startTimer(times[props.imageInd])
      console.log("制限時間は"+times[props.imageInd]+" sec")
      }else{
        startTimer(100)
      }
  
    })



    return{
      timerID,
      imgSrc, 
      startTimer,
      time
    }
  },
})
</script>