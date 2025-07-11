import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import '../css/Sidebar.css'
import profilePic from '../assets/myPic.png'

export default function Recents() {

  const [emptyChats, setEmptyChats] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [showTitle, setShowTitle] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setShowLoading(false)
      setEmptyChats(true)
    }, 2000)
  }, [clearTimeout()])


  useEffect(()=>{
    
  }, [])

  

  

  return (
    <div className="sidebar" >
      <nav className="nav-container">
        <div className="nav-item">
          <span className="material-symbols-outlined nav-icon" onhover={()=> console.log("sndajn") }>draw</span>
          <h3 className={`nav-title ${showTitle && "show"}`}>New chat</h3>
        </div>
        <div className="nav-item">
          <span className="material-symbols-outlined" onMouseEnter={()=> setShowTitle(true) }>search</span>
          <h3 className={`nav-title ${showTitle && "show"}`}>Search chats</h3>
        </div>
        <div className="nav-item">
          <span className="material-symbols-outlined" onMouseEnter={()=> setShowTitle(true)}>history</span>
          <h3 className={`nav-title ${showTitle && "show"}`}>Recent chats</h3>
        </div>
      </nav>
    </div>
    
  )
}