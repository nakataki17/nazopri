<template>
    <div class="camera m-auto">
      <video ref="video" playsinline autoplay></video>
    </div>
      <!-- 撮影ボタンとかはここで実装したほうが楽そう -->
  <button type="button" class="m-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Snap! (or just push Q)</button>

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