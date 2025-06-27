import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import '../css/Sidebar.css'
import profilePic from '../assets/myPic.png'

export default function Recents() {

  const [emptyChats, setEmptyChats] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setShowLoading(false)
      setEmptyChats(true)
    }, 2000)
  }, [clearTimeout()])

  

  

  return (
    <div className="sidebar" >
      <div className="sidebarHeader">
        <div className='sideHeadCols'></div>
        <div className='sideHeadCols'><p>Recents</p></div>
        <div className='sideHeadCols'>
          <div></div>
          <div className="sidebarButton" title='Collapse sidebar' >
            <span className='material-symbols-outlined'>dock_to_right</span>
          </div>
        </div>
      </div>
      <div className="recents">
          <h1>Recents</h1>
          { window.innerWidth > 768 &&
            <div className='newChatButton'>
              <span className='material-symbols-outlined'>add</span>
              <p>New Chat</p>
            </div>}
          <div className="recentsContainer" >
            <div className='loading'>
                { showLoading && 
                <div className="loading">
                  <div class="spinner">
                  <div class="bar1"></div>
                  <div class="bar2"></div>
                  <div class="bar3"></div>
                  <div class="bar4"></div>
                  <div class="bar5"></div>
                  <div class="bar6"></div>
                  <div class="bar7"></div>
                  <div class="bar8"></div>
                  <div class="bar9"></div>
                  <div class="bar10"></div>
                  <div class="bar11"></div>
                  <div class="bar12"></div>
                </div>
                </div>
              }
              { emptyChats &&
                <div className='nochat'>
                  <span className='material-symbols-outlined'>chat_bubble</span>
                  <p>Create a new chat to get started</p>
                </div>
              }
            </div>
          </div>
        </div>

        <div className='sidebarFooter'>
          <div className="profileContainer">
              <img src={profilePic} alt="profile" />
          </div>
          <div className="infoContainer">
            <h4>Safwan Salim</h4>
          </div>
          <div className='settingsContainer' style={{
            cursor: "pointer",
          }}>
            <span style={{
              fontSize: "1.2rem",
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "50%",
            }} className='material-symbols-outlined'>settings</span>
          </div>
        </div>
    </div>
    
  )
}