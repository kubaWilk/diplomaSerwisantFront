import Button from '../Button'
const Navbar = ({sectionName}) => {
  return (
    <nav className="navbar">
        <h1>{sectionName}</h1>
        <ul>
          <li>
            <Button text="Wyloguj" style="btn" link="#"/>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar