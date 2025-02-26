import {
  useLocation
} from 'react-router'
import axios from 'axios'
import {
  useState,
  useRef,
  useEffect
} from 'react'
import SearchBox from '../components/SearchBox.jsx'
import Toolbar from '../components/Toolbar.jsx'
import Dialog from '../components/Dialog.jsx'
import SelectionChip from '../components/SelectionChip.jsx'
import '../css/Search.css'
import '../css/LoadingBar.css'
const apiEndpoint = "https://queai-backend.vercel.app/api/askai"
const getResult = async (prompt) => {
  try {
    const response = await axios.post(apiEndpoint, {
      prompt: prompt
    })
    console.log(response.data.responseText)
    return response.data.responseText
  }catch(err) {
    console.log(err)
  }
}

export default function Search(props) {
  const responseRef = useRef(null)
  const [ans,
    setAns] = useState("")
  const [lang, setLang] = useState('English')
  const [tempLang, setTempLang] = useState('')
  const [showLangDialog, setShowLangDialog] = useState(false)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const q = query.get('q')
  useEffect(()=> {
    setAns("")
    const setResp = async () => {
      await setAns(getResult(q))
    }
    setTimeout(()=> {
      setResp()
    }, 10)
  }, [q])
  
  const languages = [
"Afrikaans", "Albanian", "Amharic", "Arabic", "Azerbaijani", "Bengali", "Bikol", "Bosnian", "Bulgarian", "Cantonese",
"Cebuano", "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "Fulani", "Georgian", "German", "Greek", "Hausa", "Hebrew", "Hiligaynon", "Hindi", "Hungarian", "Icelandic", "Igbo", "Ilocano", "Irish", "Italian", "Japanese", "Javanese", "Kapampangan", "Kazakh", "Khmer", "Korean", "Kurdish", "Lao", "Latvian", "Lithuanian", "Macedonian", "Maguindanao", "Malay", "Malayalam", "Maltese", "Mandarin Chinese", "Maranao", "Marathi", "Mongolian", "Myanmar", "Nepali", "Norwegian", "Odia", "Oromo", "Pashto", "Pangasinan", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Scottish Gaelic", "Serbian", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Tatar", "Telugu", "Thai", "Tigrinya", "Turkish", "Ukrainian", "Urdu",
"Uzbek", "Vietnamese", "Waray", "Welsh", "Wu Chinese", "Xhosa", "Yiddish", "Yoruba", "Zamboangueño Chavacano", "Zulu"
]
  
  const selectLang = (index) =>{
    setTempLang(languages[index])
  }
  
  const ifCancel = () =>{
    setShowLangDialog(false)
  }
  
  const ifConfirm = () =>{
    setLang(tempLang)
    setShowLangDialog(false)
  }
  
  const showDialog = () =>{
    setShowLangDialog(true)
  }

  return(
    <div className="search">
      <SearchBox
        placeHolder={"Search QueAI"}
        responseRef={responseRef}
        language={lang}
        />
        
        <div className='chipContainer'>
          <SelectionChip
          onClick={showDialog}
          icon={'language'}
          body={lang} />
        </div>
        
        
        {
          showLangDialog === true && 
          <Dialog type={'selection'} icon={'language'} title={'Choose language'} message={'Dialog message'} cancelTxt={'Cancel'} confirmTxt={'Confirm'} onCancel={ifCancel} onConfirm={ifConfirm} >
        <ul className='langmap' >
          {
            languages.map((lang, index)=>(
              <li key={index} onClick={()=> selectLang(index)} >
                <p>{lang}</p>
              </li>
            ))
          }
        </ul>
      </Dialog>
        }
        
      
      {
      q ?
      <>
        <div className="responseDiv">
          <h1>{q}</h1>
          <div id="response" ref={responseRef}>
            {
            ans !== "" ? ans:
            <div className="loadingBars">
              <div className="loadingBar" />
              <div className="loadingBar" />
              <div className="loadingBar" />
            </div>
            }
          </div>
        </div>
      </>:
      <>
      </>
      }

    </div>
  )
}