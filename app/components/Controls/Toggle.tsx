import React from 'react'

type ToggleProps = {
  name: string
  current: string
  options: string[] | {value: string; abbr: string}[]
  changeFunction: (value: string) => void
}

export default function Toggle(props: ToggleProps) {
  const {name, options, current, changeFunction} = props
  return (
    <div className="ml-auto flex justify-end px-1">
      {options.map((option) => (
        <button
          key={typeof option === 'string' ? `${name}-${option}` : `${name}-${option.value}`}
          type="button"
          onClick={() => changeFunction(typeof option === 'string' ? option : option.value)}
          className={`my-1 py-4 px-2 text-2xs font-black uppercase leading-none tracking-widest transition-colors duration-100 md:py-2 
            ${
              option === current || option.value === current
                ? `text-caramel-900`
                : `text-caramel-500 hover:bg-white hover:text-caramel-600`
            }
          `}
        >
          {typeof option === 'string' ? option : option.abbr}
        </button>
      ))}
    </div>
  )
}
