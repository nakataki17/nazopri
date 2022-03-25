<template>
    <div class="w-full camera m-auto text-center ">
      <video ref="video" id="camera" class="lg:w-3/5 text-center mx-auto object-fill" playsinline autoplay></video>
      <!--<label for="viewPic" class="btn modal-button text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">View Photo(press Q to take one)</label>-->
      <!--モーダルの中身-->
        <input type="checkbox" id="viewPic" class="modal-toggle">
        <div class="modal">
          <div class="modal-box">
            <img class="" v-bind:src="'data:'+latastImage" >
            <div class="flex justify-between modal-action">
              <label for="viewPic" class="btn">close</label>
            <button class="btn" v-on:click="sharePic">SHARE</button>
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
    cameraHeight: String,
    cameraWidth: String,
  },
  emits:["tookPhoto",],
  setup(props,context) {
    const video = ref()
    const canvas = ref()
    const shutter = new Audio(require("@/assets/shutter.mp3"))
    const correctShutter = new Audio(require("@/assets/Sound/カシャピンポン.mp3"))
    const wrongShutter = new Audio(require("@/assets/Sound/カシャブー.mp3"))

    const takePhoto = ((e) =>{
      const code = e.code
      console.log(code)
      if(code == "KeyQ" || code=="KeyO" || code=="KeyX" ){
        //canvasの準備
        canvas.value.width = Math.max(200, video.value.videoWidth)
        canvas.value.height = Math.max(200, video.value.videoHeight)

        //一時停止とその再開
        video.value.pause();  
        setTimeout( () => {
          video.value.play(); 
        }, props.stopTime);//{stoptime=2000} msの停止

        canvas.value.getContext("2d").drawImage(video.value,0,0,)
        let photo = canvas.value.toDataURL("image/png")
        let result;

        //シャッター,正誤判定
 
        switch (code){
          case "KeyQ":
            if(props.playsSound){
            shutter.play()
            }
            console.log("Pasha!")
            break
          case "KeyO":
            result = "Correct"
            if(props.playsSound){
            correctShutter.play()
            }
            console.log("Correct!")
            break
          case "KeyX":
            result = "Wrong"
            if(props.playsSound){
            wrongShutter.play()
            }
            console.log("Wrong...!")
            break
        }
        context.emit("tookPhoto",{"picture":photo,"result":result})



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
        width:{min:480,ideal:props.cameraWidth},
        height:{min:480,ideal:props.cameraHeight},
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

    const sharePic = (()=>{
      const toBlob = (base64) => {
        const decodedData = atob(base64.replace(/^.*,/, ""));
        const buffers = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
          buffers[i] = decodedData.charCodeAt(i);
        }
        try {
          const blob = new Blob([buffers.buffer], {
            type: "image/png",
          });
          return blob;
        } catch (e) {
          return null;
        }
      };
    const blob = toBlob(props.latastImage)
    const file = new File([blob],"image.png",{type:"image/png"})
    console.log("shared image")
    navigator.share({
      title:"NAZO♡PRI",
      text:"let's share this image!",
      files:[file]
    })

    })




    return {
      canvas,
      showPhoto,
      sharePic,
      video,
    };


    
  },
})
</script>
