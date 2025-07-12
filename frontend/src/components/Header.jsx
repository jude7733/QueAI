import {useState, useEffect, forwardRef} from 'react'
import {useLocation, useNavigate} from 'react-router'
import '../css/Header.css'
import Logo from '../assets/logosmall.png'
import SmallBtn from './SmallBtn.jsx'
import profilePic from '../assets/myPic.png'

const Header = forwardRef(({
  headerRef,
  drawerCollapsed,
  setDrawerCollapsed,
  leftSidebarRef,
  isLoggedIn,
  setShowRecents,
}, ref)=>{
  const navigate = useNavigate()
  const [route,
    setRoute] = useState("/")
  const location = useLocation() 
  useEffect(()=>{
    setRoute(location.pathname)
  }, [location])
  
  return(
    <div ref={ref} className="header" style={{
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
              {window.innerWidth > 768 ? "Sign up for free" : "Sign up"}
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
  )
})

export default Header