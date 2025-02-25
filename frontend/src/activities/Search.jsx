import {useLocation} from 'react-router'
import axios from 'axios'
import {useState, useRef, useEffect} from 'react'
import SearchBox from '../components/SearchBox.jsx'
import Toolbar from '../components/Toolbar.jsx'
import '../css/Search.css'
import '../css/LoadingBar.css'
const apiEndpoint = "https://queai-backend.vercel.app/api/askai"
const getResult = async (prompt) =>{
  try{
    const response = await axios.post(apiEndpoint, {prompt: prompt})
    return response.data.text
  }catch(err){
    console.log(err)
  }
}

export default function Search(props){
  const responseRef = useRef(null)
  const [ans, setAns] = useState("")
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const q = query.get('q')
  useEffect(()=>{
    setAns("")
    const setResp = async () =>{
      await setAns(getResult(q))
    }
    setTimeout(()=>{
      setResp()
    }, 10)
  }, [q])
  
  return(
    <div className="search">
      <SearchBox
        placeHolder={"Search QueAI"}
        responseRef = {responseRef}
      />
      {
        q  ? 
        <>
          <div className="responseDiv" >
        <h1>{q}</h1>
        <div id="response" ref={responseRef} >
          {
            ans !== "" ? ans :
            <div className="loadingBars" >
              <div className = "loadingBar" />
              <div className = "loadingBar" />
              <div className = "loadingBar" />
            </div>
          }
        </div>
      </div>
        </>
        :
        <></>
      }
      
    </div>
  )
}
