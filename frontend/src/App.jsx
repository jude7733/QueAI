import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from 'react-router'
import {
  useState,
  useEffect
} from 'react'
import Home from './activities/Home.jsx'
import About from './activities/About.jsx'
import Search from './activities/Search.jsx'
import Apps from './activities/Apps.jsx'
import Settings from './activities/Settings.jsx'
import Sidebar from './components/Sidebar.jsx'
import Login from './activities/Login.jsx'
import NavBar from './components/NavBar.jsx'
import './css/material-symbols-outlined.css'
import SearchBox from './components/SearchBox.jsx'

function App() {

   const [collapsed, setCollapsed] = useState(false)
  
  
    const location = useLocation()
    useEffect(()=>{
      if(location.pathname == '/'){
        setCollapsed(false)
      }else{
        setCollapsed(true)
      }
    }, [location.pathname])

  return (
    <>
      
        {
        window.innerWidth < 768 ? (
          <>
            <main>
              <Routes>
                <Route path='/' element={<Home />} isActive={ location.pathname === '/' ? true: false } />
                <Route path='/chat/:chatId?' element={<Search />} />
                <Route path='/apps' element={<Apps />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </main>
          </>
        ):
        (
          <>
            <main style={{
              display: "flex"
            }}>
              <div id='sideCont'className={collapsed && 'collapsed'} style={{
                width: collapsed ? "70px" : "400px", 
                transition: "width 300ms ease"
              }}>
                <Sidebar />
              </div>
              <div style={{
                marginTop: "10px",
                marginRight: "10px",
                width: '100%',
                borderRadius: "30px 30px 0 0",
                backgroundColor: "var(--main-bg)",
              }}>
                <Routes>
                  <Route path='/' element={<Home />} isActive={ location.pathname === '/' ? true: false } />
                  <Route path='/chat/:chatId?' element={<Search />} />
                  <Route path='/apps' element={<Apps />} />
                  <Route path='/settings' element={<Settings />} />
                </Routes>
              </div>
              
            </main>
          </>
        )
        }

    </>
  )
}
export default App