<template>
<div class="navbar bg-gray-100 mb-2 h-10 shadow">
  <div class="navbar-start">{{config}}</div>
  <div class="navbar-center">
    <a href="#" class="h-12">
      <img src="@/assets/logo.png" class="h-full object-contain mx-auto" alt="Logo">
    </a>
  </div>
  <div class="navbar-end">
    <span class="font-title mr-2 ">{{config}}</span>
    <ConfigModal v-bind="{playsSound,stopTime,course}" v-on="{'update:config':updateConfig}"></ConfigModal>
  </div>

</div>

</template>

<script>
import { defineComponent, reactive, } from "vue";
import ConfigModal from './ConfigModal.vue'

export default defineComponent({
  name: "NavigationBar",
  components:{
    ConfigModal,
  },
  props:{
    course :String,
    playsSound :Boolean,
    stopTime :Number,
  },
  emits:["update:config"],
  setup(props,context) {
    console.log(props.course)
    const config = reactive({
      course: props.course,
      playsSound: props.playsSound,
      stopTime: props.stopTime,
    })

    const updateConfig = (e)=> {
      context.emit("update:config",e)
    }


    return{
      config,
      updateConfig,
    }
  },
})
</script>