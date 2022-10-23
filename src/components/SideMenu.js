import Logo from './Logo'

const SideMenu = ({text}) => {
  return (
    <div id="side-menu">
      <Logo text={text}/>
      <ul>
        <li><a className="menu active" href="#">Start</a></li>
        <li><a className="menu" href="#">Naprawy</a></li>
        <li><a className="menu" href="#">Klienci</a></li>
        <li><a className="menu" href="#">Statystyki</a></li>
      </ul>
    </div>
  )
}

export default SideMenu