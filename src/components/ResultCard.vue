<template><!-- This example requires Tailwind CSS v2.0+ -->
<div class="ease-in card lg:card-side bg-base-100 w-5/6 xl:w-1/2 shadow-xl z-[10000] fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" :class="{invisible:isOpen===false}">
  <figure><img :src="'data:'+modalObj.picture" alt="RESULT"></figure>
  <div class="card-body">
    <h2 class="card-title">{{modalObj.id+1}}枚め</h2>
    <p v-if="modalObj.result==='Correct'">正解！</p>
    <p v-else>不正解…</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" @click="setModalStat(false)">閉じる</button>
    </div>
  </div>
</div>
</template>


<script >
import { ref,defineComponent ,watchEffect} from "vue";
import {placeHolder} from "../assets/noImage.json"

export default defineComponent({
  name: "QuestionArea",
  props:{
    pictureResult:Object,
  },

  setup(props) {
    const modalObj = ref({picture:placeHolder})
    //goodResult:正誤判定のあるresult(Qを除く) 
    const goodResult = ref()
    watchEffect(()=>{
      goodResult.value = props.pictureResult.filter(item=>item.result)
    })

    const isOpen = ref(false)

    const setModalStat =b=>{
      isOpen.value=b
    }

    const openModal = (e)=>{
      console.log(e)
      modalObj.value = e
      setModalStat(true)
    }


    console.log("isopen="+isOpen.value)
    return{
      isOpen,
      setModalStat,
      openModal,
      modalObj,
    }
  },
})
</script>