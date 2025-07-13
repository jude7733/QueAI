import {
  useState,
  useRef,
  useEffect
} from 'react'
import {
  useNavigate
} from 'react-router'
import axios from 'axios'

import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown';
import Logo from '../assets/logosmall.png'
import Gemini from "../assets/gemini.png"
import '../css/Home.css'
import SearchBox from '../components/SearchBox.jsx'
import Header from '../components/Header.jsx';
import profilePic from '../assets/myPic.png'
import LeftSideBar from '../components/LeftSideBar.jsx';
import RightSideBar from '../components/RightSideBar.jsx';
import Settings from './Settings.jsx';
import Recents from '../components/Recents.jsx';
import SearchTools from '../components/SearchTools.jsx';
import Search from './Search.jsx';
import Result from './Result.jsx';

export default function Home() {

  const HomeRef = useRef(null)
  const titleRef = useRef(null)
  const smallTitleRef = useRef(null)
  const recentsTitle = useRef(null)

  const inputRef = useRef(null)
  const searchBoxRef = useRef(null)
  const introRef = useRef(null)
  const toolsRef = useRef(null)
  const resultRef = useRef(null)
  const headerRef = useRef(null)
  const homeWrapperRef = useRef(null)
  const homeContainerRef = useRef(null)
  const resultTitle = useRef(null)
  const leftSidebarRef = useRef(null)
  const rightSidebarRef = useRef(null)
  

  const lastElement = useRef(null)

  const navigate = useNavigate()

  const [smallTitleTxt, setSmallTitle] = useState("Home")

  const [btnState, setBtnState] = useState(false)
  const [animactive, setAnimactive] = useState(true)
  const [animations, setAnimations] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showRecents, setShowRecents] = useState(false)
  const [drawerCollapsed, setDrawerCollapsed] = useState(true)

  const [animState, setAnimState] = useState(true)

  const [searched, setSearched] = useState(false)

  const [messages, setMessages] = useState([])

  const [question, setQuestion] = useState()
  const [placeHolder, setPlaceHolder] = useState("")

  const [onSearch, setOnSearch] = useState(false)

  const [answering, setAnswering] = useState(false)

  const [chatID, setChatID] = useState("")
  const [isLoggedIn, setLoginState] = useState(false)
  const [toolMode, setToolMode] = useState(false)
  const [toolName, setToolName] = useState("")

  const [chats, setChats] = useState({})
  const [chatNames, setChatNames] = useState({})



  useEffect(() => {
    setAnimactive(animState)
    setAnimations(animState)
  }, [animState])


  const getRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const apiEndpoint = "https://queai-backend.vercel.app/api/askai"
  // const apiEndpoint = "http://localhost:9001/api/askai"


  const getResult = async (history, prompt, lang, resType) => {
    try {
      const response = await axios.post(apiEndpoint, {
        history: history,
        prompt: prompt,
        lang: lang,
        type: resType
      })
      return response.data.responseText
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const [searchText, setSearchText] = useState('')
  const [searchLang, setSearchLang] = useState('English')
  const [searchMode, setSearchMode] = useState('Balanced')

  const [showLoading, setShowLoading] = useState(true)
  const [emptyChats, setEmptyChats] = useState(false)


  const [text, setText] = useState("")

  const onInputChanged = (e) => {
    const inputBox = inputRef.current
    inputBox.rows = inputBox.value.split('\n').length;
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    setBtnState(inputBox.value.length > 0)
    setQuestion(e.target.value)
  }

  


  const handleButtonClick = () => {
    if (!searched) {
      setSearched(true)
      introRef.current.classList.add("hide")
      toolsRef.current.classList.add("hide")
      toolsRef.current.classList.add("hide")
      headerRef.current.classList.add("hide")
      resultRef.current.classList.add("show")
      leftSidebarRef.current.classList.add("show")
      rightSidebarRef.current.classList.add("show")
      homeWrapperRef.current.style.paddingTop = "0"
      searchBoxRef.current.classList.add('onsearch')
      searchBoxRef.current.classList.remove('active')
      homeContainerRef.current.classList.add('onsearch')
      setDrawerCollapsed(true)
      setOnSearch(true)
    }

    const inputBox = inputRef.current
    inputBox.value = ''
    inputBox.rows = 1;
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    setBtnState(false)


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
    });


    setMessages([...messages, {
      que: question,
      ans: ""
    }]);

    setAnswering(true);

    (async () => {
      const response = await getResult(history, question, searchLang, searchMode)
      setAnswering(false)
      setMessages((prevMessages)=> {
        const updatedMessages = [...prevMessages]
        updatedMessages[updatedMessages.length - 1].ans = response      
        return updatedMessages
      })
    })()

  }

  return (
    <>
      <div ref={HomeRef} className="home" style={{
        background: !animations && "var(--main-bg)"
      }} >
        <div ref={homeWrapperRef} className="home-wrapper">
          <LeftSideBar
            ref={leftSidebarRef}
            drawerCollapsed={drawerCollapsed}
            setDrawerCollapsed={setDrawerCollapsed}
            searched={searched}
            onSearch={onSearch}
            isLoggedIn={isLoggedIn}
            setShowSettings={setShowSettings}
          />
            <div ref={homeContainerRef} style={{
              padding: searched ? (window.innerWidth < 768 ? "0" : (drawerCollapsed && searched ? "10px 10px 10px 80px" : "10px 10px 10px 0")) : "150px 0 0"
            }} className="homeContainer" >
              <Header
                ref={headerRef}
                drawerCollapsed={drawerCollapsed}
                setDrawerCollapsed={setDrawerCollapsed}
                leftSidebarRef={leftSidebarRef}
                isLoggedIn={false}
                setShowRecents={setShowRecents}
              />
              <div ref={introRef} className="intro">
                <h1>Meet Que AI</h1>
                <p>Your personal AI, ready to help you think better and move faster.</p>
              </div>
              <Result 
                ref={resultRef}
                introRef={introRef}
                toolsRef={toolsRef}
                headerRef={headerRef}
                resultTitle={resultTitle}
                leftSidebarRef={leftSidebarRef}
                rightSidebarRef={rightSidebarRef}
                homeContainerRef={homeContainerRef}
                searchBoxRef={searchBoxRef}
                setSearched={setSearched}
                messages={messages}
                lastElement={lastElement}
                chatID={chatID}
                setChatID={setChatID}
                setChats={setChats}
                getRandomString={getRandomString}
                chats={chats}
              />
              <SearchBox
                ref={searchBoxRef}
                inputRef={inputRef}
                handleInputChange={onInputChanged}
                handleButtonClick={handleButtonClick}
                btnState={btnState}
                answering={answering}
                animactive={animactive}
                setAnimactive={setAnimactive}
                setOnSearch={setOnSearch}
                searched={searched}
                placeHolder= {`${toolMode ? (toolName === "draw" && "Describe your image" || toolName === "code" && "Write a code for..." || toolName === "summarise" && "Enter text to summarise " || toolName === "story" && "Write a story about..." || toolName === "learn" && "What is the..." ) : "Ask anything..."}`}
                onKeyDown={handleButtonClick}
                setBtnState={setBtnState}
                onLangChanged={setSearchLang}
                toolMode={toolMode}
                toolName={toolName}
                setToolMode={setToolMode}
              />              
              <SearchTools
                ref={toolsRef}
                setQuestion={setQuestion}
                inputRef={inputRef}
                setBtnState={setBtnState}
                setToolMode={setToolMode}
                setToolName={setToolName}
                setAnimactive={setAnimactive}
              />
            </div>

            <RightSideBar
              ref={rightSidebarRef}
              drawerCollapsed
              setDrawerCollapsed
              searched
              onSearch
              isLoggedIn
              setShowSettings
              Logo={Logo}
            />

          </div>

        <div className={`bg-wrapper ${toolMode && (toolName == "draw" && "red" || toolName == "code" && "green" || toolName == "summarise" && "blue" || toolName == "story" && "purple" || toolName == "learn" && "yellow" )} ${animations ? "active" : "inactive"}`}>
          <div className="box1">
            <div className="neon1"></div>
          </div>
          <div className="box2">
            <div className="neon2"></div>
          </div>
        </div>
        {
          showSettings && 
          <Settings
            animations={animations}
            setShowSettings={setShowSettings} 
            setAnimState={setAnimState} 
            animState={animState}
          />
        }
        {
          showRecents &&
          <Recents 
            setShowRecents={setShowRecents}
          /> 
        }

      </div>
    </>
  )
}