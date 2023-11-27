import React, {useState} from 'react'
import {Portal} from 'react-portal'
// import { InformationCircleSolid } from '@graywolfai/react-heroicons'

import useStore from '~/hooks/useStore'
import Modal from './Modal'
import {convertCups, filterAmounts, valueFraction} from './amountHelpers'

function hasModalContent(ingredient) {
  const {alternativeNames} = ingredient

  return alternativeNames && alternativeNames.length > 0
}

function Amount({ingredient, dot}) {
  const [openModal, setOpenModal] = useState(false)

  const {amount, note} = ingredient

  const unit = amount ? amount.unit : ''
  const amounts = amount ? amount.amounts : []

  const {cupInGrams} = ingredient.ingredient
  const displayIngredient = ingredient.ingredient

  const cup = useStore((state) => state.cup)
  const serves = useStore((state) => state.serves)
  const standard = useStore((state) => state.standard)

  // const amountBase = {}
  // unit ? { ...amountBase, ...units[unit] } : { ...amountBase }

  const amountBase = amount?.unit ? {...amount, ...units[amount.unit]} : amount

  // Get all amounts and update values for serves
  const displayAmounts = amounts.map((item) => ({
    ...item, // Item base
    value: item.value * serves, // Update value client-side for serves
    ...units[item.unit], // Get unit title/plural
  }))

  let displayAmount = {}

  if (displayAmounts.length > 0) {
    // Show converted amounts depending on state
    if (amountBase.standard === 'Imperial' || amountBase.standard === 'Metric') {
      displayAmount = filterAmounts(displayAmounts, {standard})
    } else if (amountBase.standard === 'Traditional' && amountBase.unit === 'cup') {
      switch (cup) {
        case 'Cups':
          displayAmount = filterAmounts(displayAmounts, {unit: 'cup'})
          break

        case 'Volume':
        case 'Weight':
          displayAmount = filterAmounts(displayAmounts, {standard, type: cup})

          // Only volume unit details come along, we need to add weight unit details
          if (cup === 'Weight') {
            displayAmount = {
              ...displayAmount,
              ...units[standard === 'Imperial' ? 'oz' : 'g'],
            }
          }

          // Dynamically create weight / volume
          if (cupInGrams) {
            displayAmount = {
              ...displayAmount,
              ...convertCups(amountBase.value * serves, cupInGrams, cup, standard),
            }
          }
          break

        default:
          displayAmount = filterAmounts(displayAmounts, {unit: 'cup'})

          break
      }
    } else {
      const [displayAmountsFirst] = displayAmounts
      displayAmount = displayAmountsFirst
    }
  } else {
    // Fallback to initial value
    displayAmount = {...amount}
  }

  // Does the amount have decimals?
  if (displayAmount && displayAmount.standard === 'Traditional' && displayAmount.value % 1 > 0) {
    if (cup === 'Cups' || (cup !== 'Cups' && unit !== 'Cup')) {
      displayAmount.valueFraction = valueFraction(displayAmount.value)
    }
  }

  // Clean up
  if (displayAmount && displayAmount.single === 'Quantity') {
    displayAmount.single = ''

    if (displayAmount.value > 1 && displayIngredient.plural) {
      displayIngredient.title = displayIngredient.plural
    }
  }

  return (
    <span className="group relative inline-flex w-full py-1">
      {dot && (
        <span className="hidden pr-1 text-lg leading-none text-caramel-400 sm:inline">•</span>
      )}
      <span className="flex-1">
        {displayAmount.value && (
          <span className="whitespace-nowrap font-mono text-xs text-caramel-700">
            {displayAmount.value && !displayAmount.valueFraction ? (
              parseFloat(displayAmount.value.toFixed())
            ) : (
              <span className="inline-block scale-125 transform">
                {displayAmount.valueFraction}
              </span>
            )}
            {` `}
            {displayAmount.value > 1 && displayAmount.plural
              ? displayAmount.plural
              : displayAmount.single}
            {` `}
          </span>
        )}
        <span className="font-serif text-sm text-caramel-900 group-hover:text-caramel-700">
          {note ? (
            <>
              {displayIngredient.title}
              <br />
              <span className="italic text-caramel-500">{note}</span>
            </>
          ) : (
            displayIngredient.title
          )}
        </span>
      </span>
      {hasModalContent(ingredient.ingredient) && (
        <>
          <button
            className="ml-auto pl-2 opacity-10 transition-opacity duration-100 group-hover:opacity-100"
            type="button"
            onClick={() => setOpenModal(true)}
          >
            <span className="absolute inset-0" />
            {/* <InformationCircleSolid className="h-auto w-4 text-caramel-500" /> */}
          </button>
          {openModal && (
            <Portal>
              <Modal ingredient={ingredient.ingredient} close={() => setOpenModal(false)} />
            </Portal>
          )}
        </>
      )}
    </span>
  )
}

export default Amount
