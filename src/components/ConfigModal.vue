<template>
  <div>
      <!--label for="configModal" class="btn modal-button text-white 
      bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 
      font-medium rounded-lg text-sm px-5 py-2.5 text-center">CONFIG</!--label-->
  <!--モーダルの中身-->
    <input type="checkbox" id="configModal" class="modal-toggle" v-model="isOpen">
    <div class="modal">
      <div class="modal-box">
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">シャッター音</span> 
          <input type="checkbox" class="toggle" v-model="soundComp">
        </label>
      </div>
      <!-- TODO : v-for を用いた状態管理-->
      <div class="flex justify-between">
        <span class="my-auto label-text">コース</span>
        <select class="select  max-w-xs" v-model="courseComp">
          <option v-for="course in courseName" :key="course">{{course}}</option>
        </select>
      </div>
      <div class="flex justify-between mb-2">
      <span class="label-text">一時停止時間</span>
      <a>{{config.stopTime/1000}} sec</a>
      </div>
      <input type="range" v-model="stopTimeComp" min="0" max="5000" class="range" step="500">
      <div>Hを押すとヘッダーの表示・非表示を切り替えられます</div>

      <div class="flex justify-between mb-2">
      <span class="label-text">Camera Width(reload to change,default = 480px)</span>
      <a>{{curCameraWidth}} px</a>
      </div>
      <input type="range" v-model="cameraWidthChange" min="480" max="1200" class="range" step="20" >
    
      <div class="flex justify-between mb-2">
      <span class="label-text">Camera Height(reload to change,default= 720px)</span>
      <a>{{curCameraHeight}} px</a>
      </div>
      <input type="range" v-model="cameraHeightChange" min="480" max="1200" class="range" step="20">
      <button class="btn btn-warning" v-on:click="setCameraDefault">カメラの縦横比をリセット</button>
        <div class="modal-action">
          <label for="configModal" class="btn">close</label>
        </div>
      </div>
    </div>
  <!--モーダルの中身ここまで-->
  </div>
</template>

<script>
import { defineComponent, computed,reactive ,ref} from '@vue/runtime-core'
import questionData from "../assets/questionData/questions.json";

export default defineComponent({
  name: 'ConfigModal',
  components: {
  },
  emits:["update:config"],
  props:{
    course :String,
    playsSound :Boolean,
    stopTime :Number,
    cameraHeight: Number,
    cameraWidth: Number,
  },

  setup(props,context){
    //開閉管理
    const isOpen = ref(false)
    const toggleConfig = ()=>{isOpen.value = !isOpen.value}


    const curCameraHeight = ref(props.cameraHeight)
    const curCameraWidth = ref(props.cameraWidth)
    const config = reactive({
      course: props.course,
      playsSound: props.playsSound,
      stopTime: props.stopTime,
    })
    const soundComp = computed({
      get: ()=> config.playsSound,
      set: (value) => {
        config.playsSound = value
        context.emit("update:config",{changeName:"playsSound",value:value})
      }
    })

    const stopTimeComp = computed({
      get: ()=> config.stopTime,
      set: (value) => {
        value = Number(value)
        config.stopTime = value
        context.emit("update:config",{changeName:"stopTime",value:value})
      }
    })

    const courseComp = computed({
      get: ()=> config.course,
      set: (value) => {
        config.course = value
        context.emit("update:config",{changeName:"course",value:value})
        localStorage.course = value
      }
    })

    const cameraWidthChange = computed({
      get: ()=> curCameraWidth.value,
      set: (value) => {
        value = Number(value)
        curCameraWidth.value = value
        localStorage.cameraWidth = value
      }
    })

    const cameraHeightChange = computed({
      get: ()=> curCameraHeight.value,
      set: (value) => {
        value = Number(value)
        curCameraHeight.value = value
        localStorage.cameraHeight = value
      }
    })

    const setCameraDefault = (()=>{
      localStorage.cameraWidth = 480
      localStorage.cameraHeight = 720
      window.location.reload()
    })


    const courseName = Object.keys(questionData)
    return{
      config,
      soundComp,
      stopTimeComp,
      courseComp,
      courseName,
      cameraWidthChange,
      cameraHeightChange,
      curCameraWidth,
      curCameraHeight,
      setCameraDefault,
      isOpen,
      toggleConfig
    }
  }
})
</script>

