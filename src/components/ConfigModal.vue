<template>
  <div>
      <label for="configModal" class="btn modal-button text-white 
      bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 
      font-medium rounded-lg text-sm px-5 py-2.5 text-center">CONFIG</label>
  <!--モーダルの中身-->
    <input type="checkbox" id="configModal" class="modal-toggle">
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
          <option>Cute</option>
          <option>Cool</option>
          <option>Crazy</option>
          <option>Hard</option>
          <option>LUNATIC</option>
        </select>
      </div>
      <div class="flex justify-between mb-2">
      <span class="label-text">一時停止時間</span>
      <a>{{config.stopTime/1000}} sec</a>

      </div>
      <input type="range" v-model="stopTimeComp" min="0" max="5000" class="range" step="500">

        <div class="modal-action">
          <label for="viewPic" class="btn">close</label>
        </div>
      </div>
    </div>
  <!--モーダルの中身ここまで-->
  </div>
</template>

<script>
import { defineComponent, computed,reactive } from '@vue/runtime-core'

export default defineComponent({
  name: 'ConfigModal',
  components: {
  },
  emits:["update:config"],
  props:{
    course :String,
    playsSound :Boolean,
    stopTime :Number,
  },

  setup(props,context){
    console.log(props)
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
      }
    })



    return{
      config,
      soundComp,
      stopTimeComp,
      courseComp,
    }
  }
})
</script>

