import '../css/Toast.css'

import {forwardRef} from 'react'

const Toast = forwardRef(({
    text
}, ref) =>{
    return(
        <div ref={ref} className='toast'>
            <p>{text}</p>
        </div>
    )
})


export default Toast