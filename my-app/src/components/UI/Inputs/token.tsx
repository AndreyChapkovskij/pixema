import { UseFormRegister } from 'react-hook-form'

interface ITokenProps {
  register: UseFormRegister<any>
}

const Token: React.FC<ITokenProps> = ({ register }) => {
  return (
    <input
      placeholder="Your token"
      {...register('token', {
        required: 'You need to fill in this input',
        value: '',
        pattern: {
          value: /^[A-Z0-9._%+-]+\/[A-Z0-9._%+-]+$/i,
          message: 'Please enter valid token',
        },
      })}
    />
  )
}

export default Token
