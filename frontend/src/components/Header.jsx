import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router'
import '../css/Header.css'
import Logo from '../assets/logosmall.png'
import SmallBtn from './SmallBtn.jsx'
export default function Header(props){
  
  const navigate = useNavigate()
  const [route,
    setRoute] = useState("/")
  const location = useLocation() 
  useEffect(()=>{
    setRoute(location.pathname)
  }, [location])
  
  return(
    <header>
      <div className="headcol">
        {route !== "/" ? <>
          <SmallBtn icon={"arrow_back_ios_new"} onClick={()=> navigate('/')} />
        </> : null}
      </div>
      <div className="headcol" >
        <p>{props.text}</p>
      </div>
      <div className="headcol">
        <SmallBtn icon={"more_horiz"} />
      </div>
    </header>
  )
}
