import React from 'react'
import DashButton from '../DashButton'

const StartPage = () => {
  return (
    <div className="container">
      <DashButton text="Nowa Naprawa" link="#"/>
      <DashButton text="Przejrzyj Naprawy" link="#"/>
      <DashButton text="Znajdź klientów" link="#"/>
      <DashButton text="Statystyki" link="#"/>
      </div>
  )
}

export default StartPage