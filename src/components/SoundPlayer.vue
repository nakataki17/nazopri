

<script>
import { defineComponent, watchEffect,} from "vue";
import voiceData from "../assets/voiceData/voices.json";
import questionData from "../assets/questionData/questions.json";
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
          const fileName = voiceData[course][imgInd][time]["ファイル名"]
          if(audioList[fileName] === null){
          const sound = new Howl({
          src: "https://fusma.github.io/nazopri_Sound/" + fileName
          })
          audioList[fileName] = sound
          console.log("Successfully loaded "+fileName )
          }
        })
      })   
    }


    //courseの変更をウォッチして音声データの読み込み
    watchEffect(()=>{
      loadVoices(props.course)
    })

    watchEffect(()=>{
      if(props.imageInd != 0){
        if(props.time == questionData[props.course][props.imageInd]["制限時間"] && -1 in voiceData[props.course][props.imageInd] ){
          const fileName = voiceData[props.course][props.imageInd][-1]["ファイル名"]
          setTimeout(()=>{
            audioList[fileName].play()
          },500)
        }else{
        if(props.time in voiceData[props.course][props.imageInd] && props.time > -1){
          const fileName = voiceData[props.course][props.imageInd][props.time]["ファイル名"]
          console.log(audioList[fileName])
          setTimeout(()=>{
            audioList[fileName].play()
        },500)
        }}
      }
    })

    return{   
    }
  },
})
</script>