import { UseFormRegister } from 'react-hook-form'

interface IUserNameProps {
  register: UseFormRegister<any>
  value?: string
}

const UserName: React.FC<IUserNameProps> = ({ register, value }) => {
  return (
    <input
      placeholder="Your name"
      {...register('userName', {
        value: value,
        required: 'You need to fill in this input',
        minLength: {
          value: 4,
          message: "Min length can't be less 4 symbols",
        },
        maxLength: {
          value: 30,
          message: "Max length can't be more 30 symbols",
        },
      })}
    />
  )
}

export default UserName
