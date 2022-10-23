const Button = ({text, style, link}) => {
  return (
    <a href="{link}" className={style}>{text}</a>
  )
}

export default Button