import { Link } from "react-router-dom"

const Button = ({text, style, link, onClick}) => {
  return (
    <Link to={link} onClick={onClick} className={style}>{text}</Link>
  )
}

export default Button