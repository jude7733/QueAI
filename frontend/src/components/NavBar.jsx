import {useState, useEffect} from 'react'
import {useLocation} from 'react-router'
import '../css/NavBar.css'
import NavItem from './NavItem.jsx'

export default function NavBar({children}){
  
  const location = useLocation()
  const [route, setRoute] = useState(location.pathname)
  useEffect(()=>{
    setRoute(location.pathname)
  }, [location])
  
  return(
    <nav className="navbar">
      <NavItem icon={"home"} title={"Home"}  route={"/"} isActive = { route === '/' } />
      <NavItem icon={"search"} title={"Search"} route={"/search"} isActive = { route === '/search' } />
      <NavItem icon={"apps"} title={"Apps"} route={"/apps"} isActive = { route === '/apps' } />
      <NavItem icon={"account_circle"} title={"Settings"} route={"/settings"} isActive = { route === '/settings' } />
    </nav>
  )
}