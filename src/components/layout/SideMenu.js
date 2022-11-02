import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const SideMenu = ({text, onLinkClick}) => {
  return (
    <div id="side-menu">
      <Logo text={text}/>
      <ul>
        <li><Link onClick={() => onLinkClick('Start')} className="menu" to={''}>Start</Link></li>
        <li><Link onClick={() => onLinkClick('Naprawy')} className="menu" to={'/repairs'}>Naprawy</Link></li>
        <li><Link onClick={() => onLinkClick('Klienci')} className="menu" to={'/customers'}>Klienci</Link></li>
        <li><Link onClick={() => onLinkClick('Statystyki')} className="menu" to={'/stats'}>Statystyki</Link></li>
        <li><Link onClick={() => onLinkClick('Użytkownicy')} className="menu" to={'/users'}>Użytkownicy</Link></li>
      </ul>
    </div>
  )
}

export default SideMenu