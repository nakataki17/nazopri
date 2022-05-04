<template>

<!-- label-- for="resultModal" class="btn modal-button">Show Result</-label -->
<!-- Modalの中身 -->
<input type="checkbox" id="resultModal" class="modal-toggle" v-model="isOpen">
<div class="modal">
   <div class="modal-box w-screen max-h-screen max-w-none">
   <div class="font-title text-center text-5xl my-10">RESULT</div>
    <div class="flex flex-row">
        <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:w-7/12 lg:mx-auto">
          <div v-for="(item,index) in goodResult" :key="index" :id="'slide'+(index)" class="carousel-item relative w-full">
          <img class="" :src="'data:'+item.picture" @click="$emit('openModal',{picture:item.picture,result:item.result,id:index})">        
          </div>
        </div>
        <img class="text-center .object-contain w-1/4 my-auto"  v-bind:src="imgSrc" alt=""> 
    </div>
    <div class="modal-action">
      <label for="resultModal" class="btn">Close</label>
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
    const countScore = (result)=>{
      let r = result.filter(n=>n.result=="Correct").length
      if(r>8){r=8}
      return r
    }

    const judge = ref(-1)
    //画像ソース
    const imgSrc = ref(require("@/assets/Scores/point_"+0+".png") )

    //goodResult:正誤判定のあるresult 変更があるたびに走る(Qを除く) 
    const goodResult = ref(props.pictureResult.filter(item=>item.result))
    watchEffect(()=>{
      //pictureResultの変更を監視してgoodresultとimgsrcを更新
      goodResult.value = props.pictureResult.filter(item=>item.result)
      if(goodResult.value[0]){
        judge.value = ref(goodResult.value[0].result)
        const score = countScore(goodResult.value)
        imgSrc.value = require("@/assets/Scores/point_"+score+".png")
      }
    })
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

    const toggleResultStat = ()=>{
      isOpen.value = !isOpen.value
    }

    
    const keyboardPress = (e) => { 
      const code = e.code
      switch (code){
        case "Key3R":
          setModalStat(!isOpen.value)
      }
    }

    document.addEventListener("keydown",keyboardPress)

    return{
      imgSrc,
      goodResult,
      judge,
      getPicNum,
      isOpen,
      setModalStat,
      keyboardPress,
      toggleResultStat     
    }
  },
})
</script>