const DashButton = ({link, text}) => {
  return (
    <div className="dash-rectangle">
      <h3><a className="" href={link}>{text}</a></h3>
    </div>
  )
}

export default DashButton