<template>
    <div class="w-full camera m-auto text-center ">
      <video ref="video" id="camera" class="lg:w-3/5 h-full text-center mx-auto object-fill" playsinline autoplay></video>
      <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Snap! (or just push Q)</button>

    </div>
      <!-- 撮影ボタンとかはここで実装したほうが楽そう -->

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
        width:{min:1080},
        height:{min:1620,ideal:1620}
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