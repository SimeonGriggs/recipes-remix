import {useEffect, useState} from 'react'

interface FormFieldProps {
  htmlFor: string
  label: string
  type?: string
  value: any
  onChange?: (...args: any) => any
  error?: string
}

export default function FormField({
  htmlFor,
  label,
  type = 'text',
  value,
  onChange = () => {},
  error = '',
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error)
  useEffect(() => {
    setErrorText(error)
  }, [error])

  return (
    <>
      <label htmlFor={htmlFor} className="font-semibold text-blue-600">
        {label}
      </label>
      <input
        onChange={(e) => {
          onChange(e)
          setErrorText('')
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="my-2 w-full rounded-xl p-2"
        value={value}
      />
      <div className="w-full text-center text-xs font-semibold tracking-wide text-red-500">
        {errorText || ''}
      </div>
    </>
  )
}
