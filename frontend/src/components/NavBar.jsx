import {useState, useEffect} from 'react'
import {useLocation} from 'react-router'
import '../css/NavBar.css'
import Logo from '../assets/logosmall.png'
import NavItem from './NavItem.jsx'

export default function NavBar({children}){
  
  const location = useLocation()
  const [route, setRoute] = useState(location.pathname)
  useEffect(()=>{
    setRoute(location.pathname)
  }, [location])
  
  return(
    <nav className="navbar">
      {
        window.innerWidth > 768 && 
        <div className='logoContainer' >
          <img id="headLogo" src={Logo}/>
        </div>
      }
      <NavItem icon={"home"} title={"Home"}  route={"/"} isActive = { route === '/' } />
      <NavItem icon={"chat"} title={"Chat"} route={`/chat/${localStorage.getItem('lastOpened') ?? ''}`} isActive = { location.pathname.startsWith('/chat') } />
      <NavItem icon={"apps"} title={"Apps"} route={"/apps"} isActive = { route === '/apps' } />
      <NavItem icon={"account_circle"} title={"Settings"} route={"/settings"} isActive = { route === '/settings' } />
    </nav>
  )
}