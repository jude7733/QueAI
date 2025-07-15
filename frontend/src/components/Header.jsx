import {useState, useEffect, forwardRef} from 'react'
import {useLocation, useNavigate} from 'react-router'
import '../css/Header.css'
import Logo from '../assets/logosmall.png'
import Avatar from '../../public/avatar.png'
import SmallBtn from './SmallBtn.jsx'

const Header = forwardRef(({
  headerRef,
  drawerCollapsed,
  setDrawerCollapsed,
  leftSidebarRef,
  isLoggedIn,
  setShowRecents,
  setShowLoginDialog, 
  user
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
          <div className='login-btn' onClick={() => setShowLoginDialog(true)}>
            {/* <img src={Avatar} alt="" /> */}
            <span className="material-symbols-outlined">account_circle</span>
            <p>Sign in</p>
          </div>
          :
          <>
            <div className="btn recents" title='Recents' onClick={()=> setShowRecents(true)} >
              <span className="material-symbols-outlined">history</span>
            </div>
            <div className="profile-container">
              <img src={user.photoURL} alt="profile" />
            </div>
          </>
          
        }
      </div>
    </div>
  )
})

export default Header