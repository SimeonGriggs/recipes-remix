import React from 'react'

import Heading from '~/components/Heading'
import type {Ingredient} from '~/routes/recipes'

type ModalProps = {
  ingredient: Ingredient
  close: () => void
}

export default function Modal(props: ModalProps) {
  const {ingredient, close} = props
  const {alternativeNames, title} = ingredient

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-caramel-900 bg-opacity-90 p-4 md:p-12">
      <button className="absolute inset-0 h-full w-full" type="button" onClick={() => close()}>
        <span className="sr-only">Close</span>
      </button>
      <div className="relative w-full max-w-xl bg-white p-4 shadow-lg md:p-12">
        <Heading>{title}</Heading>
        {alternativeNames && alternativeNames.length > 0 && (
          <div className="border-t border-dashed border-caramel-300 pt-4">
            <Heading as="h3">Alternative Names</Heading>
            <ul className="mb-2 space-y-2 pr-4 font-serif">
              {alternativeNames.map((name) => (
                <li key={name}>
                  <span className="hidden pr-1 text-lg leading-none text-caramel-400 sm:inline">
                    •
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4 border-t border-dashed border-caramel-300 pt-4 text-right">
          <button
            className="font-display text-2xs font-black uppercase tracking-widest"
            type="button"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
