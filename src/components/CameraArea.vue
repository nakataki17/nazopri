<template>
    <div class="w-full camera m-auto text-center ">
      <video ref="video" id="camera" class="lg:w-3/5 text-center mx-auto object-fill" playsinline autoplay></video>
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
      <!--モーダルの中身ここまで-->
    </div>
    <canvas ref="canvas" id="canvas" class="invisible fixed left-0 top-0"></canvas>

</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "CameraArea",
  props:{
    stopTime : Number,
    playsSound : Boolean,
    latastImage : String,
  },
  emits:["tookPhoto",],
  setup(props,context) {
    const video = ref()
    const canvas = ref()
    const audio = new Audio(require("@/assets/shutter.mp3"))
    console.log(props)
    const takePhoto = ((e) =>{
      const code = e.code
      if(code == "KeyQ"){
        canvas.value.width = Math.max(200, video.value.videoWidth)
        canvas.value.height = Math.max(200, video.value.videoHeight)
        console.log(video.value.videoWidth+"width")
        console.log("Pasha!")
        console.log(props)
        video.value.pause();  
        setTimeout( () => {
          video.value.play(); 
        }, props.stopTime);//{stoptime=2000} msの停止
        if(props.playsSound){
          //シャッターの再生
          //貨車ピンポン、貨車ブーは未実装
          audio.play()
        }

        canvas.value.getContext("2d").drawImage(video.value,0,0,)
        let photo = canvas.value.toDataURL("image/png")
        context.emit("tookPhoto",photo)



      }
    })

    const showPhoto = (()=>{
      console.log("photo shown")
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
        width:{min:480,ideal:480},
        height:{min:480,ideal:720},
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
      audio,
      canvas,
      showPhoto,
    };


    
  },
})
</script>