import React from 'react'

const customers = [
  {
    id: 1,
    firstName: 'Karol',
    lastName: 'Wojtyla',
    street: 'Kremówkowa 69/1',
    postCode: '21-370',
    city: 'Wadowice'
  },
  {
    id: 2,
    firstName: 'Karol',
    lastName: 'Wojtyla',
    street: 'Kremówkowa 69/1',
    postCode: '21-370',
    city: 'Wadowice'
  },
  {
    id: 3,
    firstName: 'Karol',
    lastName: 'Wojtyla',
    street: 'Kremówkowa 69/1',
    postCode: '21-370',
    city: 'Wadowice'
  },
  {
    id: 4,
    firstName: 'Karol',
    lastName: 'Wojtyla',
    street: 'Kremówkowa 69/1',
    postCode: '21-370',
    city: 'Wadowice'
  },
  {
    id: 5,
    firstName: 'Karol',
    lastName: 'Wojtyla',
    street: 'Kremówkowa 69/1',
    postCode: '21-370',
    city: 'Wadowice'
  },
]

const tableRows = customers.map((customer) => {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.street}</td>
      <td>{customer.postCode}</td>
      <td>{customer.city}</td>
    </tr>
  )
});


const Customers = () => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Ulica</th>
            <th>Kod pocztowy</th>
            <th>Miasto</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}

export default Customers