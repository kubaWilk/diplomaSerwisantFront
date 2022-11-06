import { Link } from "react-router-dom"

const DashButton = ({link, text}) => {
  return (
    <div className="dash-rectangle">
      <h3><Link to={link}>{text}</Link></h3>
    </div>
  )
}

export default DashButton