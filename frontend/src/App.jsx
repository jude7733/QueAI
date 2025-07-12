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
import leftSideBar from './components/LeftSideBar.jsx'
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
            <main>
              <Routes>
                  <Route path='/' element={<Home />} isActive={ location.pathname === '/' ? true: false } />
                  <Route path='/chat/:chatId?' element={<Search />} />
                  <Route path='/apps' element={<Apps />} />
                  <Route path='/settings' element={<Settings />} />
                </Routes>
            </main>
          </>
        )
        }

    </>
  )
}
export default App