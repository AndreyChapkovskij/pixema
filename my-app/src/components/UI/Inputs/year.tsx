import { UseFormRegister } from 'react-hook-form'

interface IYearProps {
  register: UseFormRegister<any>
  name: string
  placeholder: string
}

const Year: React.FC<IYearProps> = ({ register, name, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      {...register(name, {
        pattern: {
          value: /^[12]\d{3}$/,
          message: 'Please enter valid year 2... or 1...',
        },
      })}
    />
  )
}

export default Year
