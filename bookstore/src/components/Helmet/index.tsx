interface IProps {
  title: string
  children: React.ReactNode
}

const Helmet: React.FC<IProps> = (props) => {
  document.title = 'Bookstore - ' + props.title
  return <>{props.children}</>
}

export default Helmet
