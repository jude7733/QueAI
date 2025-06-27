import {
  useState,
  useRef,
  useEffect
} from 'react'
import {
  useNavigate
} from 'react-router'
import { Link } from 'react-router'
import Logo from '../assets/logosmall.png'
import Gemini from "../assets/gemini.png"
import '../css/Home.css'
import SearchBox from '../components/SearchBox.jsx'
import Sidebar from '../components/Sidebar.jsx'
export default function Home() {
  
  const HomeRef = useRef(null)
  const titleRef = useRef(null)
  const smallTitleRef = useRef(null)
  const recentsTitle = useRef(null)
  
  const navigate = useNavigate()
  
  const [smallTitleTxt, setSmallTitle] = useState("Home")
  
  
  const getRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
  
  
  useEffect(()=>{
    const Home = HomeRef.current;
    const Title = titleRef.current;
    const SmallTitle = smallTitleRef.current;
    const RecentsTitle = recentsTitle.current;
    const handleScroll = () =>{
      if(Home.scrollTop > 50){
        Title.classList.add('hide')
        Title.classList.remove('show')
        SmallTitle.classList.add('show')
        SmallTitle.classList.remove('hide')
      }else{
        Title.classList.add('show')
        Title.classList.remove('hide')
        SmallTitle.classList.add('hide')
        SmallTitle.classList.remove('show')
      }
      if(Home.scrollTop > 390){
        setSmallTitle("Recents")
        RecentsTitle.classList.add('hide')
        RecentsTitle.classList.remove('show')
      }else{
        setSmallTitle("Home")
        RecentsTitle.classList.add('show')
        RecentsTitle.classList.remove('remove')
      }
    }
    Home.addEventListener("scroll", handleScroll)
    
    return () => Home.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(()=>{
    setTimeout(()=>{
      setEmptyChats(true)
      setShowLoading(false)
    }, 3000)
  }, [()=> clearTimeout()])
  
  const [searchText, setSearchText] = useState('')
  const [searchLang, setSearchLang] = useState('')
  const [searchMode, setSearchMode] = useState('')
  
  const [showLoading, setShowLoading] = useState(true)
  const [emptyChats, setEmptyChats] = useState(false)
  
  
  const [text, setText] = useState("")
  
  const handleSearch = (text) =>{
    setSearchText(text)
  }
  const handleLang = (lang) =>{
    setSearchLang(lang)
  }
  const handleMode = (mode) =>{
    setSearchMode(mode)
  }
  
  const handleButtonClick = () =>{
    
    const newId = getRandomString(8)
    
    const chatId = newId
    
    localStorage.setItem(chatId, JSON.stringify({
      messages:[
        {
          que: text,
          ans: null
        }
      ]
    }))
    
    const Home = HomeRef.current;
    Home.classList.add('exit')
    
    setTimeout(()=>{
      navigate(`/chat/${newId}`, { state: { message: text  }, viewTransition: true })
      
    }, 250)
  }

  return (
    <>
      <div ref={HomeRef} className="home">
        <div className="AppBar">
          <div>
            <h1 ref={titleRef} className="title">Que AI</h1>
          </div>
          <div>
            <h3 ref={smallTitleRef} >{smallTitleTxt}</h3>
          </div>
          <div>
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </div>
        {
          window.innerWidth > 768 && 
          <div className="desktop-header">
            <h1>Que AI</h1>
            <div className="model-changer">
              <img src={Gemini} alt="Gemini" />
              <h5> Gemini 2.5 Flash</h5>
            </div>
          </div>
        }
        
        <div className="homeBody">
          <h5 className="ques">What are you searching for?</h5 >
          <SearchBox focus placeHolder={"Ask QueAI"} onSearch={handleSearch} onLang={handleLang} onMode={handleMode} onBtnClick={handleButtonClick} value={text} onChange={e => setText(e.target.value)} onKeyDown={handleButtonClick} />
          <div className="toolsContainer">
            <div className="tool">
              <span className='material-symbols-outlined'>draw</span>
              <p>Create an image</p>
            </div>
            <div className="tool">
              <span className='material-symbols-outlined'>code</span>
              <p>Write a code</p>
            </div>
            <div className="tool">
              <span className='material-symbols-outlined'>assignment</span>
              <p>Summarise text</p>
            </div>
            <div className="tool">
              <span className='material-symbols-outlined'>ink_pen</span>
              <p>Write a story</p>
            </div>
            <div className="tool">
              <span className='material-symbols-outlined'>book_2</span>
              <p>Learn a topic</p>
            </div>
          </div>
        </div>
        
        {
          window.innerWidth < 768 && (
            <div className="recents" style={{
              marginTop: "30px"
            }}>
              <h2 ref={recentsTitle} >Recents</h2>
              <div className="recentsContainer" >
                { emptyChats && "You do not have any chats yet." }
                <br/>
                <br/>
                { showLoading && 
                  <div className="loading">
                    <div class="spinner">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                  </div>
                  </div>
                }
              </div>
            </div> 
            )
        }
        
        <div className="empty"/>
    </div>
  </>
)
}