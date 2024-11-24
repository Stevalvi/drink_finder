import axios from 'axios' // npm i axios
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../utils/recipes-schema' // Importamos los esquemas
import { Drink, SearchFilter } from '../types'

// Acá hacemos los llamados hacia las apis

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url) // Accedemos y aplicamos destructuring a ese data que es la respuesta que nos dá axios para acceder a los datos
    // Para validar la respuesta, le pasamos nuestro schema para que valide que la respuesta coincide con ese esquema
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success) { // Para escribir en el state. Si tenemos que si validó correctamente retornamos esa respuesta
        return result.data
    }
}

// Esta función se encarga de obtener las recetas en base a la categoría y los ingredientes que el usuario seleccionó
export async function getRecipes(filters: SearchFilter) { // Va a tomar los filtros
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}` // Personalizamos la url agregando esa category e ingrediente para filtrar
    const { data } = await axios(url) // Accedemos y aplicamos destructuring a ese data que es la respuesta que nos dá axios para acceder a los datos
    // Para validar la respuesta, le pasamos nuestro schema para que valide que la respuesta coincide con ese esquema
    const result = DrinksAPIResponse.safeParse(data)
    if(result.success){ // Para escribir en el state. Si tenemos que si validó correctamente retornamos esa respuesta
        return result.data
    }
}

// Para obtener los detalles de esa receta cuándo presionemos en ver receta
export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}` // Reemplazamos ese valor de la url y le colocamos el id
    const { data } = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]) // En la respuesta de la api nos retorna drinks como un arreglo y dentro un arreglo en la posición 0, ahí es donde está toda la información . Como ese data tiene el objeto completo le pasamos drinks en la posición 0
    if(result.success) {
        return result.data
    }
}