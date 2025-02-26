import '../css/SelectionChip.css'

export default function SelectionChip({onClick, icon, body}){
  return(
    <div className='chip' onClick={onClick} >
      <span className='material-symbols-outlined'>{icon}</span>
      <p>{body}</p>
    </div>
  )
}