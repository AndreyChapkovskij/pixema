import { UseFormRegister } from 'react-hook-form'

interface IEmailProps {
  register: UseFormRegister<any>
  value?: string
}

const Email: React.FC<IEmailProps> = ({ register, value }) => {
  return (
    <input
      placeholder="Your email"
      {...register('email', {
        value: value,
        required: 'You need to fill in this input',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
          message: 'Please enter valid email',
        },
      })}
    />
  )
}

export default Email
