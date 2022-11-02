import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Dashboard = ({sectionName}) => {
  return (
    <div id="dashboard">
      <Navbar sectionName={sectionName}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Dashboard