<template>
<div class="navbar bg-gray-100 mb-2 h-10 shadow">
  <div class="navbar-start"></div>
  <div class="navbar-center">
    <a href="#" class="h-12">
      <img src="@/assets/logo.png" class="h-full object-contain mx-auto" alt="Logo">
    </a>
  </div>
  <div class="navbar-end">
    <ConfigModal v-bind="{playsSound,stopTime,course,cameraHeight,cameraWidth}" v-on="{'update:config':updateConfig}"></ConfigModal>
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
    showHeader : Boolean,
    cameraHeight: Number,
    cameraWidth: Number,
    pictureResult:Array,
  },
  emits:["update:config","openModal"],
  setup(props,context) {
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