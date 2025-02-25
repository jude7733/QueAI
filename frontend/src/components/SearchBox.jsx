import {
  useState,
  useRef
} from 'react'
import {useNavigate} from 'react-router'
import '../css/SearchBox.css'
import SmallBtn from "./SmallBtn.jsx"

export default function SearchBox(props){
  const navigate = useNavigate()
  const [btnState,
    setBtnState] = useState(false)
  const [rows, setRows] = useState(1)
  
  const inputBoxRef = useRef(null)
  const searchBoxRef = useRef(null)
  
  const handleInputChange = (event) =>{
    const inputBox = inputBoxRef.current
    const searchBox = searchBoxRef.current
    inputBox.rows = inputBox.value.split('\n').length;
    
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    if (inputBox.value.length > 0) {
      setBtnState(true)
      searchBox.style.borderRadius = '20px'
    } else {
      setBtnState(false)
      searchBox.style.borderRadius = '45px'
    }
  }
  
  const handleBtnClick = () =>{
    const inputBox = inputBoxRef.current
    const searchBox = searchBoxRef.current
    if(props.responseRef){
      const responseRef = props.responseRef
      const resRef = responseRef.current
      
    }
    let query = inputBox.value.trim()
    navigate(`/search?q=${query}`)
    inputBox.value = ""
    setBtnState(false)
    searchBox.style.borderRadius = '45px'
  }
  
  return(
    <div className="searchBox" ref={searchBoxRef}>
      <textarea
      type="text"
      rows="1"
      placeholder={props.placeHolder}
      id="promptText"
      ref={inputBoxRef}
      onChange={handleInputChange}
      defaultValue = {""}
      />
      <SmallBtn
      state={btnState == true ? "active" : "inactive"}
      icon={"send"}
      onClick={handleBtnClick}
      />
    </div>
  )
}