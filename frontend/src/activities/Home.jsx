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
import Logo from '../assets/logosmall.png'
import Gemini from "../assets/gemini.png"
import '../css/Home.css'
import SearchBox from '../components/SearchBox.jsx'
import Sidebar from '../components/Sidebar.jsx'
import profilePic from '../assets/myPic.png'

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

  const [onSearch, setOnSearch] = useState(false)

  const [answering, setAnswering] = useState(false)

  const [chatID, setChatID] = useState("")
  const [isLoggedIn, setLoginState] = useState(false)


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








  // useEffect(()=>{
  //   const Home = HomeRef.current;
  //   const Title = titleRef.current;
  //   const SmallTitle = smallTitleRef.current;
  //   const RecentsTitle = recentsTitle.current;
  //   const handleScroll = () =>{
  //     if(Home.scrollTop > 50){
  //       Title.classList.add('hide')
  //       Title.classList.remove('show')
  //       SmallTitle.classList.add('show')
  //       SmallTitle.classList.remove('hide')
  //     }else{
  //       Title.classList.add('show')
  //       Title.classList.remove('hide')
  //       SmallTitle.classList.add('hide')
  //       SmallTitle.classList.remove('show')
  //     }
  //     if(Home.scrollTop > 390){
  //       setSmallTitle("Recents")
  //       RecentsTitle.classList.add('hide')
  //       RecentsTitle.classList.remove('show')
  //     }else{
  //       setSmallTitle("Home")
  //       RecentsTitle.classList.add('show')
  //       RecentsTitle.classList.remove('remove')
  //     }
  //   }
  //   Home.addEventListener("scroll", handleScroll)

  //   return () => Home.removeEventListener("scroll", handleScroll)
  // }, [])

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setEmptyChats(true)
  //     setShowLoading(false)
  //   }, 3000)
  // }, [()=> clearTimeout()])

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

  const handleOnFocus = (e) => {
    // const searchBox = searchBoxRef.current
    // if(!e.target.focus){
    //   searchBox.style.borderRadius = "25px"
    // }else{
    //   searchBox.style.borderRadius = "50px"
    // }
    setAnimactive(false)
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

  useEffect(()=>{
    if(messages[0]){
      const node = lastElement.current
      if(messages[messages.length - 1].ans == "" && node) node.scrollIntoView(true)

      if(chatID){
        localStorage.setItem(chatID, JSON.stringify(messages))
        localStorage.setItem(messages[0].que, chatID)
      }else{
        const chatid = getRandomString(10)
        setChatID(chatid)

        setChats((prev) => {})

        localStorage.setItem("chats", JSON.stringify(chats) )

        localStorage.setItem(chatid, JSON.stringify(messages))
        localStorage.setItem(messages[0].que, chatid)
      }
    }

  }, [messages])

  return (
    <>
      <div ref={HomeRef} className="home" style={{
        background: !animations && "var(--main-bg)"
      }} >
        <div ref={homeWrapperRef} className="home-wrapper">
          <div ref={leftSidebarRef} className={`left-sidebar ${!(window.innerWidth < 768) ? (drawerCollapsed && "collapsed") : "closed"}`} style={{
            display: window.innerWidth < 768 && onSearch ? "none" : "flex",
            position: window.innerWidth < 768 && "absolute",
            left: window.innerWidth < 768 && "0",
            background: (window.innerWidth < 768 || (searched && drawerCollapsed)) && "rgba(13, 13, 15, 0.9)",
            backdropFilter: window.innerWidth < 768 && "20px",
            zIndex: "10000",

          }} >
              <div className="left-sidebar-header">
                <img src={Logo} alt="logo" />
                <div className="sidebar-collapse-btn btn"  onClick={()=> {
                  window.innerWidth > 768 ?
                  setDrawerCollapsed(!drawerCollapsed)
                  : leftSidebarRef.current.classList.add("closed")
                  }} >
                  <span className="material-symbols-outlined">{drawerCollapsed ? "left_panel_open" : "left_panel_close"}</span>
                </div>
              </div>
              <div className="left-sidebar-body">
                <div className="new_chat_button">
                  <span className="material-symbols-outlined">add</span>
                  <p>New chat</p>
                </div>
                <div className="recent-chats">
                  <h3>Recents</h3>
                  <div className="recent-chats-container">
                    {
                      !isLoggedIn &&
                      <>
                        <div className="no-recents">
                          <span className="material-symbols-outlined">history</span>
                          <h4>Login to see your recent chats</h4>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
              <div className="sidebar-footer">
                    <div className="setting-btn" onClick={()=> setShowSettings(true)}>
                      <span className="material-symbols-outlined">settings</span>
                      <p>Settings</p>
                    </div>
                </div>
            </div>
            <div ref={homeContainerRef} style={{
              padding: searched ? (window.innerWidth < 768 ? "0" : (drawerCollapsed && searched ? "10px 10px 10px 80px" : "10px 10px 10px 0")) : "150px 0 0"
            }} className="homeContainer" >
              <div ref={headerRef} className="header" style={{
                padding: !drawerCollapsed && "0 40px"
              }}>
                <div className="firstCol">
                  {
                    window.innerWidth < 768 &&
                    <div className='btn menu-btn' onClick={()=> leftSidebarRef.current.classList.remove("closed")}>
                      <span className="material-symbols-outlined">menu</span>
                    </div>
                  }
                  <h1>Que AI</h1>
                </div>
                <div className="secondCol">
                  {
                    !isLoggedIn ?
                    <div className='login-btns-container'>
                      <div className="login-btn">
                        Login
                      </div>
                      <div className="signup-btn">
                        Sign up for free
                      </div>
                    </div>
                    :
                    <>
                      <div className="btn recents" title='Recents' onClick={()=> setShowRecents(true)} >
                        <span className="material-symbols-outlined">history</span>
                      </div>
                      <div className="profile-container">
                        <img src={profilePic} alt="" />
                      </div>
                    </>
                    
                  }
                </div>
              </div>
              <div ref={introRef} className="intro">
                <h1>Meet Que AI</h1>
                <p>Your personal AI, ready to help you think better and move faster.</p>
              </div>
              <div ref={resultRef} className="result">
                <div className="result-header">
                  <div className="result-header-left">
                    <div className="back_btn" onClick={() => {
                      introRef.current.classList.remove("hide")
                      toolsRef.current.classList.remove("hide")
                      headerRef.current.classList.remove("hide")
                      resultRef.current.classList.remove("show")
                      leftSidebarRef.current.classList.remove("show")
                      rightSidebarRef.current.classList.remove("show")
                      homeContainerRef.current.style.paddingTop = "150px"
                      searchBoxRef.current.classList.remove('onsearch')
                      homeContainerRef.current.classList.remove('onsearch')
                      setSearched(false)
                    }} >
                      <span className="material-symbols-outlined">arrow_back</span>
                    </div>
                    <h1 ref={resultTitle} ></h1>
                  </div>
                  <div className="result-header-right">
                    <div className="more_btn">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </div>
                  </div>
                </div>

                <div className="result-body">
                  {
                    messages.map((message, index) =>
                      <div key={index} ref={index === messages.length - 1 ? lastElement : null} className="responseDiv">
                        <h1>{message.que}</h1>
                        <div className='line' ></div>
                        <div id="response"
                        >
                          {
                            message.ans && message.ans !== "" ?
                              (
                                <><p className='resans' >{message.ans}</p>
                                  <div className="actions">
                                    <div className="bigActions">
                                      <div className="actionBtn action-share">
                                        <span className="material-symbols-outlined">ios_share</span>
                                        <p>Share</p>
                                      </div>
                                      <div className="actionBtn actionExport">
                                        <span className="material-symbols-outlined">save_alt</span>
                                        <p>Export</p>
                                      </div>
                                    </div>
                                    <div className="quickActions">
                                      <div className="actionBtn action-like">
                                        <span className="material-symbols-outlined">thumb_up</span>
                                      </div>
                                      <div className="actionBtn action-dislike">
                                        <span className="material-symbols-outlined">thumb_down</span>
                                      </div>
                                      <div className="actionBtn action-copy">
                                        <span className="material-symbols-outlined">content_copy</span>
                                      </div>
                                      <div className="actionBtn actionMenu">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                      </div>
                                    </div>

                                  </div>
                                  <div className='line' ></div></>
                              )
                              :
                              (
                                <div className='loadingBars'>
                                  <div className='loadingBar' />
                                  <div className='loadingBar' />
                                  <div className='loadingBar' />
                                </div>
                              )
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              
              <div ref={searchBoxRef} onClick={()=> inputRef.current.focus()} className={`searchbox ${animactive && "active"}`}>
                {/* <div className="buttonContainer">
                  <div className={`btn upload ${btnState? "active" : "inactive"}`}>
                    <span className="material-symbols-outlined">add</span>
                  </div>
                </div> */}
                <div className="inputContainer">
                  <textarea
                    ref={inputRef}
                    onFocus={handleOnFocus}
                    onChange={onInputChanged}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        if (btnState) {
                          handleButtonClick();
                        }
                      }
                    }}
                    type="text"
                    rows="1"
                    placeholder='Ask anything...'
                  />
                </div>
                <div className="buttonContainer">
                  <div className={`btn send ${!answering && btnState ? "active" : "inactive"}`} onClick={handleButtonClick}>
                    <span className="material-symbols-outlined">arrow_upward</span>
                  </div>
                </div>
              </div>
              <div ref={toolsRef} className="toolsContainer">
                <div className="tool">
                  <span className='material-symbols-outlined'>draw</span>
                  <p>Create an image</p>
                </div>
                <div className="tool" onClick={()=> {
                  setQuestion("How do I optimize this Python loop for better performance?")
                  inputRef.current.value = "How do I optimize this Python loop for better performance?"
                  inputRef.current.focus()
                  setBtnState(true)
                  }}>
                  <span className='material-symbols-outlined'>code</span>
                  <p>Write a code</p>
                </div>
                <div className="tool" onClick={()=>{
                  setQuestion("Can you summarise this text for me? ")
                  inputRef.current.value = "Can you summarise this text for me? "
                  inputRef.current.focus()
                  setBtnState(true)
                }}>
                  <span className='material-symbols-outlined'>assignment</span>
                  <p>Summarise text</p>
                </div>
                <div className="tool" onClick={()=>{
                  setQuestion("Can you help me write a short story about a brave knight?")
                  inputRef.current.value = "Can you help me write a short story about a brave knight?"
                  inputRef.current.focus()
                  setBtnState(true)
                }} >
                  <span className='material-symbols-outlined'>ink_pen</span>
                  <p>Write a story</p>
                </div>
                <div className="tool" onClick={()=>{
                  setQuestion("What are the key concepts in quantum physics?")
                  inputRef.current.value = "What are the key concepts in quantum physics?"
                  inputRef.current.focus()
                  setBtnState(true)
                }} >
                  <span className='material-symbols-outlined'>book_2</span>
                  <p>Learn a topic</p>
                </div>
              </div>

            </div>

            <div ref={rightSidebarRef} className="right-sidebar">
                <div className="right-sidebar-header">
                  <span className="material-symbols-outlined">manage_search</span>
                  <h3>Related</h3>
                </div>
                <div className="right-sidebar-body">
                  <div className="related-ques">
                    <ul className="related-ques-list">
                      <li className="related-ques-item">
                        <p>What is the current time right now in delhi?</p>
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </li>
                      <li className="related-ques-item">
                        <p>Who is the chief minister of kerala?</p>
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </li>
                      <li className="related-ques-item">
                        <p>Whats</p>
                        <span className="material-symbols-outlined">arrow_outward</span>
                      </li>
                    </ul>
                  </div>
                  <div className="right-sidebar-footer">
                    <div className="footer-logo">
                      <img src={Logo} alt="" />
                      <p className='logo-txt' >Que AI</p>
                      <p>Beta &nbsp;v0.1</p>
                    </div>
                    <div className="dvlpr">
                      <p>Designed & Developed by <a href='https://github.com/SafwanKS' onClick={(e)=> {
                        e.preventDefault()
                        window.open("https://github.com/SafwanKS")
                        }}>Safwan KS</a></p>
                    </div>
                    <div className="social-media-handle-container">
                      <div className="github">
                        
                      </div>
                      <div className="instagram"></div>
                      <div className="gmail"></div>
                    </div>
                  </div>
                </div>
              </div>

          </div>

        <div className={`bg-wrapper ${animations ? "active" : "inactive"}`}>
          <div className="box1">
            <div className="neon1"></div>
          </div>
          <div className="box2">
            <div className="neon2"></div>
          </div>
        </div>
        {
          showSettings &&
          <div className="settingsContainer">
            <div className="settings-wrapper">
              <div className="settings-header">
                <h2>Settings</h2>
                <div className="close-btn btn" onClick={() => setShowSettings(false)} >
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
              <div className="settings-body">
                <div className="settings-item">
                  <p className="item-name">Animations</p>
                  <div className={`switch ${animations && "active"}`} onClick={() => setAnimState(!animState)} >
                    <div className="switch-btn"></div>
                  </div>
                </div>
                <div className="settings-item">
                  <p className="item-name">Enter is send</p>
                  <div className={`switch ${animations && "active"}`} onClick={() => setAnimState(!animState)} >
                    <div className="switch-btn"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {
          showRecents &&
          <div className="recentsContainer">
            <div className="recents-wrapper">
              <div className="recents-header">
                <h2>Recents</h2>
                <div className="close-btn btn" onClick={() => setShowRecents(false)} >
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
              <div className="recents-body">
                jjs
              </div>
            </div>
          </div>
        }

      </div>
    </>
  )
}