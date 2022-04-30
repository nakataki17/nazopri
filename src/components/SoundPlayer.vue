

<script>
import { defineComponent, watchEffect,} from "vue";
import voiceData from "../assets/voiceData/voices.json";

import { Howl,  } from 'howler';


export default defineComponent({
  name: "SoundPlayer",
  props:{
    course: String,
    imageInd: String,
    time: Number,
  },
  
  setup(props) {

    //ファイル名一覧の作成
    let audioList = {}
    Object.keys(voiceData).forEach((course)=>{
      Object.keys(voiceData[course]).forEach((imgInd)=>{
        Object.keys(voiceData[course][imgInd]).forEach((time)=>{
          audioList[voiceData[course][imgInd][time]["ファイル名"]]= null
        })
      })
    })   

    const loadVoices = (course)=>{
      //courseを指定してそこの音声読み込みを行う
      Object.keys(voiceData[course]).forEach((imgInd)=>{
        Object.keys(voiceData[course][imgInd]).forEach((time)=>{
          console.log(voiceData[course][imgInd])
          const fileName = voiceData[course][imgInd][time]["ファイル名"]
          console.log(fileName)
          if(audioList[fileName] === null){
          const sound = new Howl({
          src: "https://fusma.github.io/nazopri_Sound/" + fileName
          })
          audioList[fileName] = sound
          console.log("Successfully loaded "+fileName )
          console.log(audioList[fileName])
          }
        })
      })   
    }


    //courseの変更をウォッチして音声データの読み込み
    watchEffect(()=>{
      loadVoices(props.course)
    })

    watchEffect(()=>{
      if(props.time in voiceData[props.course][props.imageInd]){
      const fileName = voiceData[props.course][props.imageInd][props.time]["ファイル名"]
      console.log(audioList[fileName])
      audioList[fileName].play()
      }

    })

    return{   
    }
  },
})
</script>