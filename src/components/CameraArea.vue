<template>
    <div class="w-full camera m-auto text-center ">
      <video ref="video" id="camera" class="lg:w-3/5 h-full text-center mx-auto object-fill" playsinline autoplay></video>
      <label for="viewPic" class="btn modal-button text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Photo(press Q to take one)</label>
      <!--モーダルの中身-->
        <input type="checkbox" id="viewPic" class="modal-toggle">
        <div class="modal">
          <div class="modal-box">
            <img class="" v-bind:src="'data:'+latastImage" >
            <div class="modal-action">
              <label for="viewPic" class="btn">close</label>
            </div>
          </div>
        </div>
      <!--モーダルの中身-->
    </div>
    <canvas ref="canvas" id="canvas" class="invisible"></canvas>

</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "CameraArea",
  props:{
    latastImage: String,
  },
  emits:["tookPhoto",],
  setup(props,context) {
    const video = ref()
    const canvas = ref()

    const takePhoto = ((e) =>{
      canvas.value.width = Math.max(200, video.value.videoWidth)
      canvas.value.height = Math.max(200, video.value.videoHeight)
      console.log(video.value.videoWidth+"width")
      const code = e.code
      if(code == "KeyQ"){
        console.log("Pasha!")
        canvas.value.getContext("2d").drawImage(video.value,0,0,)
        let photo = canvas.value.toDataURL("image/png")
        context.emit("tookPhoto",photo)
      }
    })

    const showPhoto = (()=>{
      console.log(props.latastImage)
    })

    onMounted(() => {
      //初期処理
      document.addEventListener("keydown",takePhoto)
      //カメラの向き。基本はenvironment(外カメ)
      const facing = "environment";
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
          video:{
        facingMode: facing,
        width:{min:480,ideal:1080},
        height:{min:720,ideal:1620},
        aspectRatio:2/3
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
      canvas,
      showPhoto,
    };


    
  },
})
</script>