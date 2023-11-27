export const options = [
  {
    title: 'Conversion',
    options: ['Automatic', 'Manual'],
  },
]

export const units = {
  cup: {
    single: 'Cup',
    plural: 'Cups',
    type: 'Volume',
    standard: 'Traditional',
  },
  tsp: {single: 'Tsp', type: 'Volume', standard: 'Traditional'},
  Tbs: {single: 'Tbsp', type: 'Volume', standard: 'Traditional'},
  g: {
    single: 'Gram',
    plural: 'Grams',
    type: 'Weight',
    standard: 'Metric',
  },
  ml: {single: 'mL', type: 'Volume', standard: 'Metric'},
  oz: {single: 'Oz', type: 'Weight', standard: 'Imperial'},
  'fl-oz': {single: 'Fl Oz', type: 'Volume', standard: 'Imperial'},
  quantity: {single: 'Quantity', standard: 'Fuzzy'},
  pinch: {single: 'Pinch', plural: 'Pinches', standard: 'Fuzzy'},
  sprinkle: {
    single: 'Sprinkle',
    plural: 'Sprinkles',
    standard: 'Fuzzy',
  },
}

// Reshape Units Object to create dropdown menu
export const unitDropdown = () => {
  const dropdown = {}

  Object.keys(units).forEach((unitKey) => {
    if (!dropdown[units[unitKey].standard]) {
      dropdown[units[unitKey].standard] = []
    }

    dropdown[units[unitKey].standard].push({
      value: unitKey,
      ...units[unitKey],
    })
  })

  return dropdown
}

export function getUnitDetails(Standard, unitValue) {
  const unit = units[Standard]
    ? units[Standard].filter((measure) => measure.value === unitValue)
    : false

  if (unit && unit.length > 0) {
    return {
      type: unit[0].type,
    }
  }

  return {}
}
