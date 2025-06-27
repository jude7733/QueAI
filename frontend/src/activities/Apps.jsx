import Toolbar from '../components/Toolbar.jsx'
import '../css/Apps.css'
import {
  useEffect
} from 'react'
export default function Apps() {

  return(
    <div className="apps">
      <Toolbar activityName={"Apps"} />
      <div className="nothing">
        <span className="material-symbols-outlined">apps</span>
        <p>
          No apps available
        </p>
      </div>
    </div>
  )
}