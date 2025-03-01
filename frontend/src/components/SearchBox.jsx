import {
  useState,
  useRef,
  useEffect
} from 'react'
import {
  useNavigate
} from 'react-router'
import '../css/SearchBox.css'
import SmallBtn from "./SmallBtn.jsx"

export default function SearchBox(props) {
  const navigate = useNavigate()
  const [btnState,
    setBtnState] = useState(false)
  const [rows,
    setRows] = useState(1)

  const inputBoxRef = useRef(null)
  const searchBoxRef = useRef(null)
  
  useEffect(()=>{
    if(props.focus) inputBoxRef.current.focus()
  }, [])
  
  const handleInputChange = (event) => {
    const inputBox = inputBoxRef.current
    const searchBox = searchBoxRef.current
    inputBox.rows = inputBox.value.split('\n').length;
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    setBtnState(inputBox.value.length > 0)
  }

  const handleBtnClick = () => {
    const inputBox = inputBoxRef.current
    const searchBox = searchBoxRef.current
    if (props.responseRef) {
      const responseRef = props.responseRef
      const resRef = responseRef.current
    }
    let query = inputBox.value.trim()
    navigate(`/search?q=${query}&&lang=${props.language}&&type=${props.type}`)
    inputBox.value = ""
    inputBox.rows = inputBox.value.split('\n').length;
    inputBox.style.height = 'auto';
    inputBox.style.height = inputBox.scrollHeight + 'px';
    setBtnState(false)
  }

  return(
    <div className="searchBox" ref={searchBoxRef}>
      <div className='searchBoxInputContainer'>
        <textarea
          type="text"
          rows="1"
          placeholder={props.placeHolder}
          id="promptText"
          ref={inputBoxRef}
          onChange={handleInputChange}
          defaultValue={""}
          />
        
      </div>
      <div className='searchBoxButtonContainer'>
        <div className='chipContainer'>
          {props.children}
          <span className='blank' />
        <SmallBtn
          state={btnState == true ? "active": "inactive"}
          icon={"send"}
          onClick={handleBtnClick}
          />
        </div>
      </div>
    </div>
  )
}