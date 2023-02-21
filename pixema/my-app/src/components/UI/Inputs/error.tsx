interface IErrorProps {
  error: string
}

const Error: React.FC<IErrorProps> = ({ error }) => {
  return <div className="error">{error}</div>
}

export default Error
