import Dashboard from "./Dashboard"
import Footer from "./Footer"
import Navbar from "./Navbar"

const DashContainer = ({sectionName}) => {
  return (
    <div id="dashboard">
      <Navbar sectionName={sectionName}/>
      <Dashboard />
      <Footer />
    </div>
  )
}

export default DashContainer