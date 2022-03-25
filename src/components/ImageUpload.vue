<template>
  <label for="resultModal" class="btn modal-button" @click="sendImage">Send</label>

</template>

<script>
import { defineComponent} from '@vue/runtime-core'
import { initializeApp } from "firebase/app";
import { getStorage, uploadString ,ref} from "firebase/storage";


export default defineComponent({
  name: 'ImageUpload',
  components: {
  },
  emits:[],
  props:{
  },

  setup(){
    // Set the configuration for your app
    // TODO: Replace with your app's config object
    //ここだけ「ref」がfirebaseのものなので注意！！！！！！！！
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
    
    const firebaseApp = initializeApp(firebaseConfig);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage,"image.png")

    const sendImage = () =>{
      const b64 = localStorage.latastImage
      uploadString(imageRef, b64, 'data_url').then((snapshot) => {
        if(snapshot){
      console.log('Uploaded a data_url string!');
      console.log(ref(storage, 'image.png'))
      }
    });

    }

    return{
      sendImage
    }
  }
})
</script>

