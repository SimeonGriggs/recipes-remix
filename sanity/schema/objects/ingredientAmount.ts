import {defineField} from 'sanity'
// import IngredientAmount from '../components/IngredientAmount'

const ingredientShape = [
  defineField({name: 'value', type: 'number'}),
  defineField({name: 'unit', type: 'string'}),
  defineField({name: 'standard', type: 'string'}),
  defineField({name: 'type', type: 'string'}),
]

export default {
  name: 'ingredientAmount',
  title: 'Ingredient Amount',
  type: 'object',
  //   inputComponent: IngredientAmount,
  fields: [
    ...ingredientShape,
    defineField({
      name: 'amounts',
      type: 'array',
      of: ingredientShape,
    }),
  ],
}
