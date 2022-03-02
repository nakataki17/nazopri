<template>
    <div class="h-full w-full text-center">
      <img class="w-5/6 text-center object-contain mx-auto"  v-bind:src="imgSrc(course.value,qno.value)" alt="">
    </div>
</template>

<script>
import { defineComponent, onMounted,ref } from "vue";

export default defineComponent({
  name: "QuestionArea",

  setup() {
    const keyboardPress = (e) => {
      const code = e.code
      switch (code){
        case "KeyW":
          console.log("Q+")
          qno.value++
          break
        case "KeyS":
          console.log("Q-")
          qno.value--
          if(qno.value<=0){qno.value=0}
          break
        case "Space":
          console.log("Photo")
      }
    }

    onMounted(() => {
      document.addEventListener("keydown",keyboardPress)
    })

    const imgSrc = ()=>{
      console.log(require("@/assets/"+"Cute"+"/3.png"))
      return require("@/assets/"+course.value+"/"+qno.value+".png")
    }
    
    let course = ref("Cute")
    let qno = ref("1")

    return{
     imgSrc, 
     course,
     qno
    }
  },
})
</script>