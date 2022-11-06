import React from 'react'
import NewCustomerForm from './NewCustomerForm'
import NewDeviceForm from './NewDeviceForm'

const NewRepair = () => {
  return (
    <div className="new-repair container">
      <div className="device-info">
        <NewDeviceForm />
      </div>
      <div className="customer-info">
        <NewCustomerForm />
      </div>
    </div>
  )
}

export default NewRepair
