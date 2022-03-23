<template>

<!-- The button to open modal -->
<label for="resultModal" class="btn modal-button">Show Result</label>

<!-- Modalの中身 -->
<input type="checkbox" id="resultModal" class="modal-toggle">
<div class="modal w-screen h-screen">
  <div class="modal-box w-screen h-screen">

  <div class="carousel w-full">
    <div v-for="(item,index) in goodResult" :key="index" :id="'slide'+(index)" class="carousel-item relative w-full">
      <img  :src="'data:'+item.picture">
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a :href="'#slide'+(index-1)" class="btn btn-circle" v-on:click="getPicNum(index-1)" v-if="index>0">❮</a> 
        <a class="btn btn-circle invisible" v-else>❮</a>
        <a :href="'#slide'+(index+1)" class="btn btn-circle" v-on:click="getPicNum(index+1)" v-if="index+1<goodResult.length">❯</a>
      </div>
    </div>  
  </div> 
    {{judge}}
      
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
    if(goodResult.value[0]){
      judge.value = ref(goodResult.value[0].result)
    }else{
      judge.value = ref("take some pictures")
    }
    onMounted(() => {
//        document.addEventListener("keydown",props.keyboardPress)
      console.log("mounted modal")
    })

    //今表示されている写真番号を取得
    const getPicNum = (e)=>{
      judge.value = goodResult.value[e].result
    }

    if(props.pictureResult[0]){
    console.log(props.pictureResult[0].resultModal)
    }else{
      console.log(props.pictureResult)
    }
    return{
      goodResult,
      judge,
      getPicNum
    }
  },
})
</script>