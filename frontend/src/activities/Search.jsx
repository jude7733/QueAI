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
const getResult = async (prompt, lang, resType) => {
  try {
    const response = await axios.post(apiEndpoint, {
      prompt: prompt,
      lang: lang,
      type: resType
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
  const [tempLang, setTempLang] = useState('English')
  const [tempResType, setTempResType] = useState('Balanced')
  const [resType, setResType] = useState('Balanced')
  const [showLangDialog, setShowLangDialog] = useState(false)
  const [showTypeDialog, setShowTypeDialog] = useState(false)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const q = query.get('q')
  const qlang = query.get('lang')
  const qtype = query.get('type')
  useEffect(()=> {
    setAns("")
    const setResp = async () => {
      await setAns(getResult(q, qlang, qtype))
    }
    setTimeout(()=> {
      if(q) setResp()
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
  
  const ifCancel = (dType) =>{
    if(dType==='lang')
      setShowLangDialog(false)
    else if(dType==='type')
      setShowTypeDialog(false)
  }
  
  const ifConfirm = (dType) =>{
    if(dType ==='lang'){
      setLang(tempLang)
      setShowLangDialog(false)
    }else if(dType === 'type'){
      setResType(tempResType)
      setShowTypeDialog(false)
    }
    
  }
  
  const showDialog = (d) =>{
    if(d==='lang')
      setShowLangDialog(true)
    else if(d==='type')
      setShowTypeDialog(true)
  }

  return(
    <div className="search">
      <SearchBox
        placeHolder={"Search QueAI"}
        responseRef={responseRef}
        language={lang}
        type={resType}
        />
        
         <div className='chipContainer'>
          <SelectionChip
          onClick={()=> showDialog('type')}
          icon={'bolt'}
          body={resType} />
          <SelectionChip
          onClick={()=> showDialog('lang')}
          icon={'language'}
          body={lang} />
        </div>
        
        
        {
          showLangDialog === true && 
          <Dialog type={'selection'} icon={'language'} title={'Choose language'} cancelTxt={'Cancel'} confirmTxt={'Confirm'} onCancel={()=> ifCancel('lang')} onConfirm={()=> ifConfirm('lang')} >
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
          showTypeDialog === true &&
          <Dialog
            type={'selection'}
            icon={'bolt'}
            title={'Response Type'}
            cancelTxt={'Cancel'}
            confirmTxt={'Confirm'}
            onCancel={()=> ifCancel('type')}
            onConfirm={()=> ifConfirm('type')}
            >
            <div className='typeSelector-container'>
              
              {
                ["Fast", "Balanced", "Pro"].map((type, index)=>(
                  <div className='typeSelector'>
                <input type='radio' checked ={type === tempResType} onChange={()=> setTempResType(type)} />
                <div className ='typeSelector-body' onClick={()=> setTempResType(type)} >
                  <div className='typeSelector-title-container'>
                    <span className='material-symbols-outlined'>bolt</span>
                     <p>{type === 'Balanced' ? 'Balaced (Recommended)' : type}</p>
                  </div>
                  <p>
                    {
                      type === 'Fast' && 
                      "Short and snappy answers for instant help. Takes less time to process."
                    }
                    {
                      type === 'Balanced' && 
                      "Thoughtful and balanced responses for everyday needs."
                    }
                    {
                      type === 'Pro' && 
                      "Detailed and thorough explanations for complex topics. Takes more time to process."
                    }
                  </p>
                </div>
              </div>
                  
                ))
              }
              
            </div>
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