import { UseFormRegister } from 'react-hook-form'

interface IPasswordProps {
  register: UseFormRegister<any>
  name: string
  required?: boolean
  placeholder?: string
}

const Password: React.FC<IPasswordProps> = ({
  register,
  name,
  required,
  placeholder,
}) => {
  return (
    <>
      {required || required === undefined ? (
        <input
          type={'password'}
          placeholder={placeholder || 'Your password'}
          {...register(name, {
            required: 'You need to fill in this input',
            minLength: {
              value: 4,
              message: "Min length can't be less 4 symbols",
            },
          })}
        />
      ) : (
        <input
          type={'password'}
          placeholder={placeholder || 'Your password'}
          {...register(name, {
            minLength: {
              value: 4,
              message: "Min length can't be less 4 symbols",
            },
          })}
        />
      )}
    </>
  )
}

export default Password
