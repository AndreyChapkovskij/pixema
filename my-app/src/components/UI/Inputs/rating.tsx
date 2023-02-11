import { UseFormRegister } from 'react-hook-form'

interface IRatingProps {
  register: UseFormRegister<any>
  name: string
  placeholder: string
}

const Rating: React.FC<IRatingProps> = ({ register, name, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      {...register(name, {
        pattern: {
          value: /^(\d|10|\d[.,]\d)$/,
          message: 'Please enter valid rating from 0.0 to 10',
        },
      })}
    />
  )
}

export default Rating
