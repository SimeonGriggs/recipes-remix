import {defineField} from 'sanity'
// import {units} from 'sanity/amountSettings'

export default {
  name: 'ingredientSet',
  title: 'Ingredient Set',
  type: 'object',
  fields: [
    defineField({name: 'amount', type: 'ingredientAmount'}),
    defineField({name: 'ingredient', type: 'reference', to: {type: 'ingredient'}}),
    defineField({name: 'note', type: 'string'}),
  ],
  // icon: FiDroplet,
  // preview: {
  //   select: {
  //     ingredient: 'ingredient.title',
  //     amount: 'amount.value',
  //     unit: 'amount.unit',
  //     note: 'note',
  //   },
  //   prepare(selection: any) {
  //     const {ingredient, amount, unit, note} = selection

  //     if (!amount && !unit) {
  //       return {
  //         title: ingredient,
  //       }
  //     }

  //     const unitLabel = amount > 1 && units[unit].plural ? units[unit].plural : units[unit].single

  //     return {
  //       title: ingredient,
  //       subtitle: [amount, unitLabel, note ? `– ${note}` : ''].join(' ').trim(),
  //     }
  //   },
  // },
}
