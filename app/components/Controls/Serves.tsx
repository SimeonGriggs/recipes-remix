import React from 'react'
import {PlusIcon, MinusIcon} from '@heroicons/react/24/solid'

import useStore from '~/hooks/useStore'

function Serves() {
  const serves = useStore((state) => state.serves)
  const incrementServes = useStore((state) => state.incrementServes)
  const buttonClasses = `flex items-center justify-center m-1 text-caramel-500 hover:text-caramel-600 hover:bg-white transition-colors duration-100`
  const buttons = [
    {
      increment: serves === 1 ? -0.5 : -1,
      disabled: serves <= 0.5,
      classes: `${buttonClasses} ${serves <= 0.5 ? `opacity-25 pointer-events-none` : ``}`,
      icon: <MinusIcon className="h-auto w-4" />,
      sr: `One Less Serve`,
    },
    {
      increment: serves === 0.5 ? +0.5 : 1,
      disabled: false,
      classes: buttonClasses,
      icon: <PlusIcon className="h-auto w-4" />,
      sr: `One More Serve`,
    },
  ]

  return (
    <>
      {buttons.map((button, index) => (
        <React.Fragment key={button.increment}>
          <button
            type="button"
            onClick={() => incrementServes(button.increment)}
            className={button.classes}
          >
            {button.icon}
            <span className="sr-only">{button.sr}</span>
          </button>
          {!index && (
            <div className="border-l border-r border-caramel-200 p-2 text-center text-caramel-900">
              {serves} {serves > 1 ? `Serves` : `Serve`}
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default Serves
