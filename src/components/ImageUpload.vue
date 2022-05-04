<template>
  <canvas ref="sendPic" class="invisible fixed left-0 top-0 z-[1000]"></canvas>
  <label  class="btn modal-button " v-bind:class="{'animate-bounce':isSending}" @click="sendExecute">PRINT!</label>
  <qrcode-vue :value="QRURL" :size="size" level="M" margin="3" class="invisible fixed" id="qrcanvas"></qrcode-vue>
  <!-- Put this part before </body> tag -->
  <input ref="checkbox" type="checkbox" id="qr-modal" class="modal-toggle">
  <div class="modal">
   <div class="modal-box w-11/12 max-h-screen max-w-none ">
      <div class="text-center font-title">遊んでくれてありがとう!QRコードから写真が保存できるよ！{{QRURL}}</div>

      <div class="flex justify-center">
        <img class="object-contain" :src="picb64">
        <img class="object-contain" :src="qrb64">
      </div>
      <div class="modal-action">
        <label for="qr-modal" class="btn">Close</label>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref ,watch} from '@vue/runtime-core'
import { initializeApp } from "firebase/app";
import { getStorage, uploadString ,ref as cloudref} from "firebase/storage";
import QrcodeVue from 'qrcode.vue'


export default defineComponent({
  name: 'ImageUpload',
  components: {
    QrcodeVue,
  },
  emits:[],
  props:{
  },

  setup(){
    //画像
    const sendPic = ref()
    const checkbox = ref()
    const isSending = ref(false)

    // Set the configuration for your app
    // TODO: Replace with your app's config object
    //firebaseのrefはcloudrefになってるので注意！！！！！！！！
    const firebaseConfig = {
      apiKey: "AIzaSyCT03mC4euHXtM27D8b1AKAF4k6rwMnE-U",
      authDomain: "nazopri-399e3.firebaseapp.com",
      databaseURL: "https://nazopri-399e3-default-rtdb.firebaseio.com",
      projectId: "nazopri-399e3",
      storageBucket: "nazopri-399e3.appspot.com",
      messagingSenderId: "564475978123",
      appId: "1:564475978123:web:c43086c504c8d5e041cf8e",
      measurementId: "G-YCC6FXZSNC"
    };
    const metadata = {
      contentType: 'image/png',
      cacheControl: "public max-age=30"
    };


    
    const firebaseApp = initializeApp(firebaseConfig);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage(firebaseApp);
    console.log("APIにアクセス")

    //QRのせってい
    const picb64 = ref()
    const qrb64 = ref()
    const pictureURL = ref("noimage")
    const QRURL = ref("noimage")
    const size = 300

    const makeImage = () =>{
      let img = new Image()
      img.src = localStorage.latastImage
      img.onload = ()=>{
        sendPic.value.getContext("2d").drawImage(img,0,0,localStorage.cameraWidth, localStorage.cameraHeight)
      }
      sendPic.value.width = localStorage.cameraWidth
      sendPic.value.height = localStorage.cameraHeight
      let course = localStorage.getItem("course")
      let frame = new Image()
      frame.src = require('@/assets/frames/'+course+".png")
      frame.onload = ()=>{
        sendPic.value.getContext("2d").drawImage(frame,0,0,localStorage.cameraWidth, localStorage.cameraHeight)
        picb64.value = sendPic.value.toDataURL("image/png")
      }
    }

    const sendImage = () =>{
      const b64 = picb64.value      
      const generateRandomText = (function(){
        let S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let N=32
        return Array.from(crypto.getRandomValues(new Uint8Array(N))).map((n)=>S[n%S.length]).join('')
      })
      //picture_(ランダム32文字)
      const filename = "picture_"+generateRandomText()
      //QRコードのファイル名変更
      const QRfilename = "QR_"+generateRandomText()
      const imageRef = cloudref(storage,filename+".png")
      const QRRef = cloudref(storage,QRfilename+".png")
      pictureURL.value = "https://storage.googleapis.com/nazopri-399e3.appspot.com/"+filename+".png"
      QRURL.value = "https://storage.googleapis.com/nazopri-399e3.appspot.com/"+QRfilename+".png"
      //const file = storage.bucket('nazopri-399e3.appspot.com').file(filename+".png");
      uploadString(imageRef, b64, 'data_url',metadata).then((snapshot) => {
        if(snapshot){
        console.log('画像の送信に成功,QRコードの生成を開始');
        }
      })
      setTimeout(() => {
        //QRを生成して、その画像もアップロード
        const cvs = document.getElementById('qrcanvas');
        qrb64.value = cvs.toDataURL("image/png");
        uploadString(QRRef, qrb64.value, 'data_url',metadata).then((snapshot) => {
        if(snapshot){
        console.log('QRコードの更新を完了,URLは\nhttps://storage.googleapis.com/nazopri-399e3.appspot.com/'+QRfilename+".png");
        }
      });
      }, 3000);
    }

    const sendExecute = ()=>{
      isSending.value = true
      makeImage()
      setTimeout(()=>{
        sendImage()
        sendWebhook()
      },2000)
    }

    watch(qrb64,()=>{
      isSending.value = false
      checkbox.value.checked = true
    })

    const sendWebhook = ()=>{
            
      const axios = require('axios')
      const URL = "https://maker.ifttt.com/trigger/url/with/key/o-pQlih5WJrM6hMDIX7YEZ1FZ7GBJxmbQq8N659bQTJ"

      //ヘッダーなどの設定
      const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      }

      //Slackに送信するデータ

      var params = new URLSearchParams();
      params.append('value1', pictureURL.value);
      params.append('value2', 'test');
      params.append("value3",QRURL.value);

      const main = async () => {
          const res = await axios.post(URL, params, config)
          console.log(res)
          console.log(pictureURL.value)
      }
      main()
    }
     
    return{
      pictureURL,
      size,
      sendPic,
      sendExecute,
      picb64,
      qrb64,
      checkbox,
      isSending,
      QRURL
    }
  }
})
</script>

