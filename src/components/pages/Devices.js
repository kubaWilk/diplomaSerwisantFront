import React from "react";

const dummyDevices = [
  {
    id: 1,
    type: "Laptop",
    manufacturer: "Asus",
    model: "Asus",
    serialNumber: "9781694874",
  },
  {
    id: 2,
    type: "Laptop",
    manufacturer: "Asus",
    model: "Asus",
    serialNumber: "9781694874",
  },
  {
    id: 3,
    type: "Laptop",
    manufacturer: "Asus",
    model: "Asus",
    serialNumber: "9781694874",
  },
  {
    id: 4,
    type: "Laptop",
    manufacturer: "Asus",
    model: "Asus",
    serialNumber: "9781694874",
  },
];

const tableRows = dummyDevices.map((customer) => {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>{customer.type}</td>
      <td>{customer.manufacturer}</td>
      <td>{customer.model}</td>
      <td>{customer.serialNumber}</td>
    </tr>
  );
});

const Devices = () => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Typ urzadzenia</th>
            <th>Producent</th>
            <th>Model</th>
            <th>Nr seryjny</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default Devices;
