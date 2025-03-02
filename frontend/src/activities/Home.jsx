import {
  useState,
  useRef
} from 'react'
import { Link } from 'react-router'
import Logo from '../assets/logosmall.png'
import '../css/Home.css'
import SearchBox from '../components/SearchBox.jsx'
export default function Home() {
  
  return (
    <>
      <div className="home">
        <div className="logo">
          <img src={Logo} />
        <h1>Que AI</h1>
      </div>
      <Link to = '/chat'>
        <SearchBox placeHolder={"Search QueAI"} />
      </Link>
    </div>
  </>
)
}