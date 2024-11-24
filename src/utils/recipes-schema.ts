import { z } from 'zod' // npm i zod

// Creamos los esquemas 

export const CategoriesAPIResponseSchema = z.object({ // Como esa api nos da una respuesta como objeto, por eso usamos object
    drinks: z.array( // En esa api tenemos drinks y luego viene un arreglo con varios objetos que contienen la información de cada categoría
        z.object({
            strCategory: z.string() // Y luego viene los nombres de las categorias
        })
    )
})

export const SearchFilterSchema = z.object({ // Esto tiene que ser lo mismoq que tenemos en el useState de Header.tsx
    ingredient: z.string(),
    category: z.string()
})
// Tenemos la versión en singular
export const DrinkAPIResponse = z.object({ // Es un arreglo que dentro contiene los objetos
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})
// Tenemos la versión en plural
export const DrinksAPIResponse = z.object({ // Es la primera forma de la respuesta de la url, por eso primero es un objeto y luego un array
    drinks: z.array(DrinkAPIResponse)
})

export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(), // Ese nullable lo que quiere decir es que ese valor puede o no existir, ya que hay recetas que tienen 5 ingredientes, hay otras que hasta 3, entonces por eso.
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
});