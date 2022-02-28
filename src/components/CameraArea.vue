<template>
  <div class="camera">
    <video ref="video" autoplay width="900" height="1200"></video>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "CameraArea",

  setup() {
    const video = ref()
    onMounted(() => {
      //カメラの向き。基本はenvironment(外カメ)
      const facing = "environment";
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
          video:{
        facingMode: facing,
        width:{ideal:1000},
        height:{ideal:1000}
      },
          audio: false,
        }).then(stream => {
          if (video.value && video.value !== null) {
            video.value.srcObject = stream;
            video.value.play()
          }
        });
      }
    });

    return {
      video,
    };


    
  },
})
</script>