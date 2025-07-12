import React from 'react'

function Recents({setShowRecents}) {
  return (
    <div className="recentsContainer">
        <div className="recents-wrapper">
            <div className="recents-header">
            <h2>Recents</h2>
            <div className="close-btn btn" onClick={() => setShowRecents(false)} >
                <span className="material-symbols-outlined">close</span>
            </div>
            </div>
            <div className="recents-body">
            jjs
            </div>
        </div>
    </div>
  )
}

export default Recents