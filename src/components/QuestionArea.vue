<template>
    <div class="w-5/6 h-full mx-auto text-center">
      <img class=" text-center  mx-auto my-auto"  v-bind:src="imgSrc(course,qno)" alt="">
    </div>
    <span class=" countdown font-mono text-6xl flex justify-center" v-if="time>=-1">
      <span v-bind:style="'--value:'+time+';'" v-bind:class="{'text-red-500':time<=5}" ></span>
    </span>
    <span class="text-red-500 font-title text-3xl flex justify-center" v-else>Time's up!</span>
</template>

<script>
import { defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  name: "QuestionArea",
  props:{
    course: String,
    qno: Number,
    qcnt: Object,
  },

  setup(props) {
    //こいつは常に一意のはず
    const timerID = ref()
    const time = ref(20)

    onMounted(() => {
//        document.addEventListener("keydown",props.keyboardPress)
      console.log("mounted qArea")
    })

    const imgSrc = ()=>{
      console.log("@/assets/"+props.course+"/"+props.qno+".png")
      return require("@/assets/"+props.course+"/"+props.qno+".png")
    }

    const startTimer = (length) => {
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



    startTimer(20)

    return{
      timerID,
      imgSrc, 
      startTimer,
      time
    }
  },
})
</script>