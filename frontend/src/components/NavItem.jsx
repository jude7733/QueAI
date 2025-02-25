import '../css/NavItem.css'
import {Link} from 'react-router'
export default function NavItem({children, icon, title, route, isActive}){
  return(
    <Link to={route} className="link">
      <div className={`navitem ${isActive ? "active" : null}`} >
        <span className="material-symbols-outlined" >{icon}</span>
        <p>{title}</p>
      </div>
    </Link>
  )
}