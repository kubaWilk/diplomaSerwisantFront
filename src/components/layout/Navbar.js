import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button'

const Navbar = ({sectionName}) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <h1>{sectionName}</h1>
        <ul>
          <li>
            <Button text="Wróć" style="btn" onClick={() => navigate(-1)}/>
            <Button text="Wyloguj" style="btn" link="/"/>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar