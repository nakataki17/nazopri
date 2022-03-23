<template>
    <div class="w-5/6 h-full mx-auto text-center">
      <img class=" text-center  mx-auto my-auto"  v-bind:src="imgSrc(course,qno)" alt="">
    </div>
</template>

<script>
import { defineComponent, onMounted, } from "vue";

export default defineComponent({
  name: "QuestionArea",
  props:{
    course: String,
    qno: Number,
    qcnt: Object,
  },

  setup(props) {
    onMounted(() => {
//        document.addEventListener("keydown",props.keyboardPress)
      console.log("mounted qArea")
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