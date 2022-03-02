<template>
    <div class="w-5/6 h-full mx-auto text-center">
      <img class=" text-center  mx-auto"  v-bind:src="imgSrc(course,qno)" alt="">
    </div>
</template>

<script>
import { defineComponent, onMounted, } from "vue";

export default defineComponent({
  name: "QuestionArea",
  props:{
    course: String,
    qno: String,
    qcnt: Object,
    keyboardPress: Function,
  },

  setup(props) {
    console.log(props)
    onMounted(() => {
      document.addEventListener("keydown",props.keyboardPress)
    })

    const imgSrc = ()=>{
      console.log("@/assets/"+props.course+"/"+props.qno+".png")
      return require("@/assets/"+props.course+"/"+props.qno+".png")
    }
  
    return{
     imgSrc, 
    }
  },
})
</script>