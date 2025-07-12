import React from 'react'

function Settings({animations, setShowSettings, setAnimState, animState}) {

  return (
    <div className="settingsContainer">
        <div className="settings-wrapper">
            <div className="settings-header">
            <h2>Settings</h2>
            <div className="close-btn btn" onClick={() => setShowSettings(false)} >
                <span className="material-symbols-outlined">close</span>
            </div>
            </div>
            <div className="settings-body">
            <div className="settings-item">
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
            </div>
            </div>
        </div>
    </div>
  )
}

export default Settings