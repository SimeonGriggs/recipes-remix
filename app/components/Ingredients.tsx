import React from 'react'

import Amount from './Ingredient/Amount'
import Heading from './Heading'

function Ingredients({ingredientSets}) {
  if (!ingredientSets?.length) {
    return null
  }

  return (
    <>
      <Heading>Ingredients</Heading>
      <div className="-mx-4 mt-6 mb-12 divide-x divide-caramel-200 pb-2 sm:flex">
        {ingredientSets.map((set) => (
          <div key={set._key} className="mb-8 flex-1 px-4 sm:mb-0">
            <Heading as="h3">{set.title}</Heading>
            <ul
              className={`grid grid-cols-2 gap-x-4 text-sm ${
                ingredientSets.length === 1 ? `sm:grid-cols-3` : `sm:grid-cols-1 sm:gap-0`
              } `}
            >
              {set.ingredients.map((ingredient) => (
                <li key={ingredient._key} className="border-b border-caramel-200 py-1">
                  <Amount dot={false} ingredient={ingredient} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Ingredients
