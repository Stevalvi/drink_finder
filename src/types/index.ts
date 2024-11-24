import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from '../utils/recipes-schema' 

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse> // Le pasamos el drink en plural
export type Drink = z.infer<typeof DrinkAPIResponse> // Le pasamos el drink singular
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>