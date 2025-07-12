import React, {useEffect, useState, forwardRef} from "react";
import ReactMarkdown from 'react-markdown';
const Result = forwardRef(({
    introRef,
    toolsRef,
    headerRef,
    resultRef,
    leftSidebarRef,
    rightSidebarRef,
    homeContainerRef,
    searchBoxRef,
    setSearched,
    messages,
    lastElement,
    resultTitle,
    chatID, 
    setChatID,
    setChats,
    getRandomString,
    chats
}, ref)=>{

  useEffect(()=>{
    if(messages[0]){
      const node = lastElement.current
      if(messages[messages.length - 1].ans == "" && node) node.scrollIntoView(true)
      if(chatID){
        localStorage.setItem(chatID, JSON.stringify(messages))
        localStorage.setItem(messages[0].que, chatID)
      }else{
        const chatid = getRandomString(10)
        setChatID(chatid)
        setChats((prev) => {})
        localStorage.setItem("chats", JSON.stringify(chats) )
        localStorage.setItem(chatid, JSON.stringify(messages))
        localStorage.setItem(messages[0].que, chatid)
      }
    }
  }, [messages])

    return (
        <div ref={ref} className="result">
            <div className="result-header">
                <div className="result-header-left">
                    <div className="back_btn" onClick={() => {
                        introRef.current.classList.remove("hide")
                        toolsRef.current.classList.remove("hide")
                        headerRef.current.classList.remove("hide")
                        ref.current.classList.remove("show")
                        leftSidebarRef.current.classList.remove("show")
                        rightSidebarRef.current.classList.remove("show")
                        homeContainerRef.current.style.paddingTop = "150px"
                        searchBoxRef.current.classList.remove('onsearch')
                        searchBoxRef.current.classList.add('active')
                        homeContainerRef.current.classList.remove('onsearch')
                        setSearched(false)
                    }} >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </div>
                    <h1 ref={resultTitle} ></h1>
                </div>
                <div className="result-header-right">
                <div className="more_btn">
                    <span className="material-symbols-outlined">more_horiz</span>
                </div>
                </div>
            </div>

            <div className="result-body">
                {
                messages.map((message, index) =>
                    <div key={index} ref={index === messages.length - 1 ? lastElement : null} className="responseDiv">
                    <h1>{message.que}</h1>
                    <div className='line' ></div>
                    <div id="response"
                    >
                        {
                        message.ans && message.ans !== "" ?
                            (
                            <>
                            <div className='resans markdown-output' >
                                <ReactMarkdown>
                                {message.ans}
                                </ReactMarkdown>
                            </div>
                            <div className="actions">
                                <div className="bigActions">
                                    <div className="actionBtn action-share">
                                    <span className="material-symbols-outlined">ios_share</span>
                                    <p>Share</p>
                                    </div>
                                    <div className="actionBtn actionExport">
                                    <span className="material-symbols-outlined">save_alt</span>
                                    <p>Export</p>
                                    </div>
                                </div>
                                <div className="quickActions">
                                    <div className="actionBtn action-like">
                                        <span className="material-symbols-outlined">thumb_up</span>
                                    </div>
                                    <div className="actionBtn action-dislike">
                                        <span className="material-symbols-outlined">thumb_down</span>
                                    </div>
                                    <div className="actionBtn action-copy">
                                        <span className="material-symbols-outlined">content_copy</span>
                                    </div>
                                    <div className="actionBtn actionMenu">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </div>
                                </div>
                            </div>
                                <div className='line' ></div></>
                            )
                            :
                            (
                            <div className='loadingBars'>
                                <div className='loadingBar' />
                                <div className='loadingBar' />
                                <div className='loadingBar' />
                            </div>
                            )
                        }
                    </div>
                    </div>
                )
                }
            </div>
        </div>
    );
})

export default Result;