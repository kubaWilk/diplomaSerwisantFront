import React from 'react'

const users = [
  {
    id: 1,
    userName: 'admin',
    firstName: 'Jakub',
    lastName: 'Wilk',
    role: 'admin',
  },
  {
    id: 2,
    userName: 'jwilk',
    firstName: 'Jakub',
    lastName: 'Wilk',
    role: 'user',
  },
  {
    id: 3,
    userName: 'wsapon',
    firstName: 'Wojciech',
    lastName: 'Sapoń',
    role: 'user',
  },
  {
    id: 3,
    userName: 'olachowska',
    firstName: 'Oliwia',
    lastName: 'Łachowska',
    role: 'customer',
  },
]

const tableRows = users.map((user) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.userName}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.role}</td>
    </tr>
  )
});

const Users = () => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rola</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}

export default Users