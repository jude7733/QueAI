import {useState, useEffect} from 'react'
import {useLocation} from 'react-router'
import '../css/Header.css'
import Logo from '../assets/logosmall.png'
import SmallBtn from './SmallBtn.jsx'
export default function Header(props){
  const [route,
    setRoute] = useState("/")
  const location = useLocation() 
  useEffect(()=>{
    setRoute(location.pathname)
  }, [location])
  
  return(
    <header>
      <div className="headcol">
        {route !== "/" ? <img id="headLogo" src={Logo}/> : null}
      </div>
      <div className="headcol" >
        <p>{props.text}</p>
      </div>
      <div className="headcol">
        <SmallBtn icon={"menu"} />
      </div>
    </header>
  )
}
