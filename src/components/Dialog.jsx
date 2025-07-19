import '../css/Dialog.css'
import { useState, useEffect } from 'react'
export default function Dialog( {
  type, icon, title, message, cancelTxt, confirmTxt, onCancel, onConfirm, visible, children
}) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(()=>{
      visible ? setIsVisible(true) : setIsVisible(false)
  }, [visible])
  return(
    <div className='overlay'>
      <div className={`dialog ${type==='selection' && 'selection'} ${ isVisible && 'show' } `}>
        {type==='selection' ? <span className='material-symbols-outlined'>{icon}</span> : <></>}
        <h1 className='dTitle'>{title}</h1>
        {
        type === 'normal' ?
        <p className='dMessage'>
          {message}
        </p> : children
        }
        <div className='dButton-container'>
          <button className='dButton' id='cancelBtn' onClick={onCancel}>{cancelTxt}</button>
          <button className='dButton' id='confirmBtn' onClick={onConfirm}>{confirmTxt}</button>
        </div>
      </div>
    </div>
  )
}