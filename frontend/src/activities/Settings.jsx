import React, {useState, useEffect, useRef} from 'react'
import '../css/Settings.css'

function Settings({animations, setShowSettings, setAnimState, animState, Logo}) {

const [selectedSettingsItem, setSelectedSettingsItem] = useState("general")

//for devices with width less than 768
const [showSettingsContent, setShowSettingsContent] = useState(false)

const settingsWrapper = useRef(null)

  return (
    <div className="settingsContainer">
        <div ref={settingsWrapper} className="settings-wrapper">
            <div className="settings-header">
                <h2 className={`settingsTitle ${window.innerWidth < 768 && (showSettingsContent && "hide")}`}>Settings</h2>
                {
                    window.innerWidth < 768 && (showSettingsContent && 
                    <div className='settings-back'>
                        <div className="back-btn" onClick={()=> setShowSettingsContent(false)}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </div>
                        <h2>{selectedSettingsItem}</h2>
                    </div>)

                }
                <div className="close-btn btn" onClick={() =>
                    {
                        settingsWrapper.current.classList.add("hide")
                        setTimeout(() => {
                            setShowSettings(false) 
                        }, 300);
                        
                    }} >
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>
            <div className="settings-body">
                <div className={`settingsMenuContainer ${showSettingsContent && "hide"}`}>
                    <div className={`settings-menu-item ${selectedSettingsItem === "general" && "active"}`}  onClick={()=> {
                        setSelectedSettingsItem("general")
                        window.innerWidth < 768 && setShowSettingsContent(true)
                        }} >
                            {/* <span className="material-symbols-outlined">settings</span> */}
                            <h4>General</h4>
                        </div>
                    <div className={`settings-menu-item ${selectedSettingsItem === "animation" && "active"}`} onClick={()=> {
                        setSelectedSettingsItem("animation")
                        window.innerWidth < 768 && setShowSettingsContent(true)
                        }}>
                            {/* <span className="material-symbols-outlined">resume</span> */}
                            <h4>Animations</h4>
                        </div>
                    <div className={`settings-menu-item ${selectedSettingsItem === "datacontrols" && "active"}`} onClick={()=> {
                        setSelectedSettingsItem("datacontrols")
                        window.innerWidth < 768 && setShowSettingsContent(true)
                        }}>
                            {/* <span className="material-symbols-outlined">database</span> */}
                            <h4>Data controls</h4>
                        </div>
                    <div className={`settings-menu-item ${selectedSettingsItem === "about" && "active"}`}  onClick={()=> {
                        setSelectedSettingsItem("about")
                        window.innerWidth < 768 && setShowSettingsContent(true)
                        }}>
                            {/* <span className="material-symbols-outlined"> </span> */}
                            <h4>About</h4>
                        </div>
                </div>
                <div className={`settingsContentContainer ${showSettingsContent ? "showContent" : "hideContent"}`}>
                    {
                        selectedSettingsItem == "general" && 
                        <div className='general'>
                            <h3>Account</h3> 

                            <div className="accountContainer">
                                <div className="profileContainer">
                                    <span className="material-symbols-outlined">account_circle</span>
                                </div>
                                <div className="infoContainer">
                                    <h4>Sign-in into Que AI</h4>
                                    <p>Login to save your chats</p>
                                </div>
                                <div className="buttonContainer">
                                    <div className="login-btn">
                                    Sign in
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selectedSettingsItem == "animation" &&  
                        <div className='animations'>
                            <div className="settings-item">
                                <p className="item-name">Animations</p>
                                <div className={`switch ${animations && "active"}`} onClick={() => setAnimState(!animState)} >
                                    <div className="switch-btn"></div>
                                </div>
                            </div>
                            <div className="settings-item">
                                <p className="item-name">Custom animation colour</p>
                                <div className={`switch ${animations && "active"}`} onClick={() => setAnimState(!animState)} >
                                    <div className="switch-btn"></div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        selectedSettingsItem == "about" &&  
                        <div className='about'>
                            <div className="about-logo">
                                <div>
                                    <img src={Logo} alt="" />
                                    <h1>Que AI</h1>
                                </div>
                                <div><p>Beta v0.1</p></div>   
                            </div>
                            <div className="about-author">
                                <div className="dvlpr">
                                    <p>Designed & Developed by <a href='https://github.com/SafwanKS' onClick={(e)=> {
                                    e.preventDefault()
                                    window.open("https://github.com/SafwanKS")
                                    }}>Safwan KS</a></p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                {/* <div className="settings-item">
                        <p className="item-name">Animations</p>
                        <div className={`switch ${animations && "active"}`} onClick={() => setAnimState(!animState)} >
                        <div className="switch-btn"></div>
                    </div>
                </div>
                <div className="settings-item">
                    <p className="item-name">Enter is send</p>
                    <div className={`switch ${animations && "active"}`} onClick={() => setAnimState(!animState)} >
                    <div className="switch-btn"></div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Settings