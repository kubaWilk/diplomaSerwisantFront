import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import PropTypes from 'prop-types'

const Dashboard = ({sectionName}) => {
  return (
    <div id="dashboard">
      <Navbar sectionName={sectionName}/>
      <Outlet />
      <Footer />
    </div>
  )
}

Dashboard.propTypes = {
  sectionName: PropTypes.string.isRequired
}

export default Dashboard