<template>

<label for="resultModal" class="btn modal-button">Show Result</label>
<!-- Modalの中身 -->
<input type="checkbox" id="resultModal" class="modal-toggle" v-model="isOpen">
<div class="modal">
   <div class="modal-box w-11/12 max-h-screen max-w-none ">
      <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 lg:w-1/2 lg:mx-auto">
        <div v-for="(item,index) in goodResult" :key="index" :id="'slide'+(index)" class="carousel-item relative w-full">
        <img class="" :src="'data:'+item.picture" @click="$emit('openModal',{picture:item.picture,result:item.result,id:index})">        
        </div> 
      </div>
    <div class="modal-action">
      <label for="resultModal" class="btn">Yay!</label>
    </div>
  </div>

</div>

</template>


<script>
import { defineComponent, onMounted, ref, watchEffect} from "vue";
export default defineComponent({
  name: "QuestionArea",
  props:{
    pictureResult:Array
  },
  
  setup(props) {
    //goodResult:正誤判定のあるresult(Qを除く) 
    const goodResult = ref(props.pictureResult.filter(item=>item.result))
    watchEffect(()=>{
      goodResult.value = props.pictureResult.filter(item=>item.result)
      if(goodResult.value[0]){
        judge.value = ref(goodResult.value[0].result)
      }
    })
    const judge = ref()
    onMounted(() => {
//        document.addEventListener("keydown",props.keyboardPress)
      console.log("mounted modal")
    })

    //今表示されている写真番号を取得
    const getPicNum = (e)=>{
      judge.value = goodResult.value[e].result
    }

    
    const isOpen = ref(false)

    const setModalStat =b=>{
      isOpen.value=b
    }


    return{
      goodResult,
      judge,
      getPicNum,
      isOpen,
      setModalStat      
    }
  },
})
</script>