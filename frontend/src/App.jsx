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
import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'
import './css/material-symbols-outlined.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />}  isActive = { location.pathname === '/' ? true : false } />
            <Route path='/search' element={<Search/>} />
            <Route path='/apps' element={<Apps/>} />
            <Route path='/settings' element={<Settings/>} />
          </Routes>
        </main>
        <NavBar />
      </BrowserRouter>
  </>
)
}
export default App