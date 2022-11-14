import React from 'react'
import { Outlet } from 'react-router-dom';
import DashButton from '../startPage/DashButton';

const dummyRepairs = [
  {
    id: 1,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Lenovo',
    deviceModel: 'Thinkpad L420',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
  {
    id: 2,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Asus',
    deviceModel: 'jakiśtam',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
  {
    id: 3,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Asus',
    deviceModel: 'jakiśtam',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
  {
    id: 4,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Asus',
    deviceModel: 'jakiśtam',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
  {
    id: 5,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Asus',
    deviceModel: 'jakiśtam',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
  {
    id: 6,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Asus',
    deviceModel: 'jakiśtam',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
  {
    id: 7,
    repairStatus: 'W trakcie',
    deviceType: 'Laptop',
    deviceManufacturer: 'Asus',
    deviceModel: 'jakiśtam',  
    userName: 'Jakub',
    userLastName: 'Wilk'
  },
];

const tableRows = dummyRepairs.map((repair) => {
  return (
    <tr>
      <td>{repair.id}</td>
      <td>{repair.repairStatus}</td>
      <td>{repair.deviceType}</td>
      <td>{repair.deviceManufacturer}</td>
      <td>{repair.deviceModel}</td>
      <td>{repair.userName}</td>
      <td>{repair.userLastName}</td>
    </tr>
  )
});

const Repairs = () => {
  return (
    <div className="container">
      <DashButton link="/repairs/add" text="Nowa Naprawa" />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Typ urządzenia</th>
            <th>Producent</th>
            <th>Model</th>
            <th>Imię zgłaszającego</th>
            <th>Nazwisko zgłaszającego</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}

export default Repairs