import {
  useLocation,
  useParams,
  useNavigate
} from 'react-router'

import axios from 'axios'
import {
  useState,
  useRef,
  useEffect
} from 'react'
import SearchBox from '../components/SearchBox.jsx'
import Header from '../components/Header.jsx'
import Toolbar from '../components/Toolbar.jsx'
import Dialog from '../components/Dialog.jsx'
import SmallBtn from "../components/SmallBtn.jsx"
import SelectionChip from '../components/SelectionChip.jsx'
import '../css/Search.css'
import '../css/LoadingBar.css'
const apiEndpoint = "https://queai-backend.vercel.app/api/askai"
const getRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
const getResult = async (history, prompt, lang, resType) => {
  try {
    const response = await axios.post(apiEndpoint, {
      history: history,
      prompt: prompt,
      lang: lang,
      type: resType
    })
    return response.data.responseText
  }catch(err) {
    console.log(err)
  }
}

export default function Search(props) {

  const responseRef = useRef(null)
  const [showDialogBox,
    setShowDialogBox] = useState(false)
  const [lang,
    setLang] = useState('English')
  const [tempLang,
    setTempLang] = useState('English')
  const [tempResType,
    setTempResType] = useState('Balanced')
  const [resType,
    setResType] = useState('Balanced')
  const [btnState,
    setBtnState] = useState(false)
  const [question,
    setQuestion] = useState("")
  const [spanHeight,
    setSpanHeight] = useState()
  const [messages,
    setMessages] = useState([])


  const [showLangDialog,
    setShowLangDialog] = useState(false)
  const [showTypeDialog,
    setShowTypeDialog] = useState(false)
  const location = useLocation()

  const inputBoxRef = useRef(null)
  const scrollEndRef = useRef(null)
  const lastElement = useRef(null)
  const searchDivRef = useRef(null)

  const {
    chatId
  } = useParams()

  const navigate = useNavigate()

  useEffect(()=> {
    if (chatId && !messages[0]) {
      
    }
  },[])

  useEffect(()=> {
    if (messages[0]) {
      const node = lastElement.current
      const searchDiv = searchDivRef.current
      const scrollEnd = scrollEndRef.current
      const parentHeight = scrollEnd.parentElement.offsetHeight
      if (node.offsetHeight < parentHeight) {

        scrollEnd.style.height = `${parentHeight - node.offsetHeight - 330 }px`
      }
      node.scrollIntoView(true)


      if (messages[messages.length - 1].ans !== "") {
        const title = messages[0].que

        localStorage.setItem(chatId, JSON.stringify({
          title: title,
          messages: messages
        }))
      }
    }else{
      if(chatId){
        if (localStorage.getItem(chatId)) {
        setMessages(JSON.parse(localStorage.getItem(chatId)).messages)
      } else {
        navigate('/chat', {
          replace: true
        })
      }
      }
    }
  },
    [messages])

  const handleInputChange = (e) => {
    const inputBox = inputBoxRef.current
    inputBox.rows = inputBox.value.split('\n').length;
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    setBtnState(inputBox.value.length > 0)
    setQuestion(inputBox.value)
  }

  const handleBtnClick = async (e) => {

    if (!chatId) {
      const newId = getRandomString(8)
      navigate(`/chat/${newId}`)
      localStorage.setItem('lastOpened', newId)
    }

    const history = []

    messages.map((message, index)=> {
      history.push(
        {
          role: "user",
          parts: [{
            text: message.que
          }]
        },
        {
          role: "model",
          parts: [{
            text: message.ans
          }]
        }
      )
    })

    setMessages([...messages,
      {
        que: question,
        ans: ""
      }]
    )


    const inputBox = inputBoxRef.current
    inputBox.value = ""
    inputBox.rows = inputBox.value.split('\n').length;
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    setBtnState(false)

    const response = await getResult(history, question, lang, resType)

    setMessages((prevMessages)=> {
      const updatedMessages = [...prevMessages]
      updatedMessages[updatedMessages.length - 1].ans = response
      return updatedMessages
    })

  }



  const languages = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Azerbaijani",
    "Bengali",
    "Bikol",
    "Bosnian",
    "Bulgarian",
    "Cantonese",
    "Cebuano",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Estonian",
    "Finnish",
    "French",
    "Fulani",
    "Georgian",
    "German",
    "Greek",
    "Hausa",
    "Hebrew",
    "Hiligaynon",
    "Hindi",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Ilocano",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kapampangan",
    "Kazakh",
    "Khmer",
    "Korean",
    "Kurdish",
    "Lao",
    "Latvian",
    "Lithuanian",
    "Macedonian",
    "Maguindanao",
    "Malay",
    "Malayalam",
    "Maltese",
    "Mandarin Chinese",
    "Maranao",
    "Marathi",
    "Mongolian",
    "Myanmar",
    "Nepali",
    "Norwegian",
    "Odia",
    "Oromo",
    "Pashto",
    "Pangasinan",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Scottish Gaelic",
    "Serbian",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Swahili",
    "Swedish",
    "Tagalog",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Tigrinya",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Waray",
    "Welsh",
    "Wu Chinese",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zamboangueño Chavacano",
    "Zulu"
  ]

  const selectLang = (index) => {
    setTempLang(languages[index])
  }

  const ifCancel = (dType) => {
    if (dType === 'lang') {
      setShowDialogBox(false)
      setTimeout(()=> {
        setShowLangDialog(false)
      }, 200)
    } else if (dType === 'type') {
      setShowDialogBox(false)
      setTimeout(()=> {
        setShowTypeDialog(false)
      }, 200)
    }
  }

  const ifConfirm = (dType) => {
    if (dType === 'lang') {
      setLang(tempLang)
      setShowDialogBox(false)
      setTimeout(()=> {
        setShowLangDialog(false)
      }, 200)
    } else if (dType === 'type') {
      setResType(tempResType)
      setShowDialogBox(false)
      setTimeout(()=> {
        setShowTypeDialog(false)
      }, 200)
    }

  }

  const showDialog = (d) => {
    if (d === 'lang')
      setShowLangDialog(true)
    else if (d === 'type')
      setShowTypeDialog(true)
  }

  return(
    <>
      <Header />
      <div className="search" ref={searchDivRef}>
        {
        messages.map((message, index) =>
          <div key={index} ref={ index === messages.length - 1 ? lastElement: null } className="responseDiv">
            <h1>{message.que}</h1>
            <div id="response"
              >
              {
              message.ans !== "" ?
              message.ans:
              <div className='loadingBars'>
                <div className='loadingBar' />
                <div className='loadingBar' />
                <div className='loadingBar' />
              </div>
              }
            </div>
          </div>
        )
        }


        {
        showLangDialog === true &&
        <Dialog
          type={'selection'}
          icon={'language'}
          title={'Choose language'}
          cancelTxt={'Cancel'} confirmTxt={'Confirm'}
          onCancel={()=> ifCancel('lang')}
          onConfirm={()=> ifConfirm('lang')}
          visible={showDialogBox}
          >
          <ul className='langmap'>
            {
            languages.map((lang, index)=>(
              <li key={index} style={
                {
                  backgroundColor: lang === tempLang && 'rgba(0,0,0,0.3)'
                }
                } onClick={()=> selectLang(index)}>
                <p>
                  {lang}
                </p>
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
          visible={showDialogBox}
          >
          <div className='typeSelector-container'>

            {
            ["Fast", "Balanced", "Pro"].map((type, index)=>(
              <div className='typeSelector'>
                <input type='radio' checked={type === tempResType} onChange={()=> setTempResType(type)} />
              <div className='typeSelector-body' onClick={()=> setTempResType(type)}>
                <div className='typeSelector-title-container'>
                  <span className='material-symbols-outlined'>bolt</span>
                  <p>
                    {type === 'Balanced' ? 'Balaced (Recommended)': type}
                  </p>
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

      <div className='searchBoxContainer'>
        <div className="searchBox">
          <div className='searchBoxInputContainer'>
            <textarea
              type="text"
              rows="1"
              placeholder="Ask QueAi"
              id="promptText"
              onChange={handleInputChange}
              defaultValue={""}
              ref={inputBoxRef}
              />
          </div>
          <div className='searchBoxButtonContainer'>
            <div className='chipContainer'>

              <SelectionChip
                onClick={()=> {
                  showDialog('type')
                  setShowDialogBox(true)
                }}
                icon={'bolt'}
                body={resType} />
              <SelectionChip
                onClick={()=> {
                  showDialog('lang')
                  setShowDialogBox(true)
                }}
                icon={'language'}
                body={lang} />


              <span className='blank' />
              <SmallBtn
                state={btnState == true ? "active": "inactive"}
                icon={"send"}
                onClick={handleBtnClick}
                />
            </div>
          </div>
        </div>

      </div>
      <div ref={scrollEndRef} />
    </div>
  </>
)
}