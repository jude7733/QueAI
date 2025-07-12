import React, {forwardRef} from "react";

const RightSideBar = forwardRef(({
  rightSidebarRef,
  drawerCollapsed,
  setDrawerCollapsed,
  searched,
  onSearch,
  isLoggedIn,
  setShowSettings,
  Logo
}, ref) => {

  return (
    <div ref={ref} className="right-sidebar">
        <div className="right-sidebar-header">
            <span className="material-symbols-outlined">manage_search</span>
            <h3>Related</h3>
        </div>
        <div className="right-sidebar-body">
            <div className="related-ques">
            <ul className="related-ques-list">
                <li className="related-ques-item">
                <p>What is the current time right now in delhi?</p>
                <span className="material-symbols-outlined">arrow_outward</span>
                </li>
                <li className="related-ques-item">
                <p>Who is the chief minister of kerala?</p>
                <span className="material-symbols-outlined">arrow_outward</span>
                </li>
                <li className="related-ques-item">
                <p>Whats</p>
                <span className="material-symbols-outlined">arrow_outward</span>
                </li>
            </ul>
            </div>
            <div className="right-sidebar-footer">
            <div className="footer-logo">
                <img src={Logo} alt="" />
                <p className='logo-txt' >Que AI</p>
                <p>Beta &nbsp;v0.1</p>
            </div>
            <div className="dvlpr">
                <p>Designed & Developed by <a href='https://github.com/SafwanKS' onClick={(e)=> {
                e.preventDefault()
                window.open("https://github.com/SafwanKS")
                }}>Safwan KS</a></p>
            </div>
            <div className="social-media-handle-container">
                <div className="github">
                
                </div>
                <div className="instagram"></div>
                <div className="gmail"></div>
            </div>
            </div>
        </div>
    </div>
  );
})

export default RightSideBar
