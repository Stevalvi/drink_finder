import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

export type RecipesSliceType = { // Definimos esos types
    // Definimos nuestros states y luego las funciones abajo
    categories: Categories // Le definimos como tipo el type que contiene el esquema con la forma que recibimos esas categories desde la api 
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void> // Es un promise que no retorna nada
    searchRecipes: (searchFilters: SearchFilter) => Promise<void> // Le definimos como tipo ese type de SearchFilter que contiene el esquema con la estructura del useState de Headet.tsx, que sería los valores del input y el select
    selectRecipe: (id: Drink['idDrink']) => Promise<void> // Esta función se va a encargar de tomar el id y de colocarlo en el state como la receta que nos interesa obtener detalles. De esta forma cuándo demos click en ver receta nos podemos traer esa información de la receta. Toma un id
    closeModal: () => void // Solamente va a ser un arrow function que no retorna nada.
}

// Creamos el store para las recetas que buscamos y las categorías

// Utilizamos un type llamado StateCreator y nos va a permitir aparte de crear el state, definirle cuál va a ser el type que va a tener este slice, en este caso sería RecipesSliceType y de esa forma va a tener el autocompletado
export const createRecipesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({ // Le pasamos los types o valores que se usan para que no nos presente errores, y esos [], [] arreglos vacíos son para indicarle que no le vamos a pasar parámetros adicionales. Lo mismo se hace con el slice de favoriteSlice
    categories: { // Estas categorias se llenan con el llamado de esa función getCategories(), y como ese esquema tiene definido el drinks que es el que contiene el arreglo con los objetos con las categorias, debemos definirlo acá.
        drinks: []
    },
    drinks: { // Su valor inicial va a ser un arreglo vacío
        drinks: [] // Va a ser un arreglo vacío
    },
    selectedRecipe: {} as Recipe,
    modal: false, // Por defecto no se muestra hasta que lo mandemos a llamar cuando demos click en vere receta
    fetchCategories: async () => {
        const categories = await getCategories() // Con esto van a aparecer las categorias desde este slice
        set({ // seteamos esos valores, de esa forma ya va a escribir en el state una vez que hagamos la búsqueda, ese state es el que vemos en redux, eso se explica en el useAppStore.
            categories
        })
    },
    // Acá es donde vamos a buscar las recetas
    searchRecipes: async (filters) => {
       const drinks = await getRecipes(filters) // Mandamos a llamar esa función de getRecipes y le pasamos los filtros que sería ingredient y category
       set({ // seteamos esos valores, de esa forma ya va a escribir en el state una vez que hagamos la búsqueda, ese state es el que vemos en redux, eso se explica en el useAppStore.
            drinks
       })
    },
    
    selectRecipe: async (id) => { // Va a ser asíncrono porque va a interactuar con nuestra api y va a tomar un id.
        const selectedRecipe = await getRecipeById(id) // Le pasamos el id
        set({ // Lo colocamos en el state y de nuevo, podemos usar redux developer tools para ver como se agregan los valores en el state.
            selectedRecipe,
            modal: true // Y mostramos ese modal para mostrar la receta cuando demos click en ver receta
        })
    },
    closeModal: () => {
        set({
            modal: false, // Cerramos el modal
            selectedRecipe: {} as Recipe // Y selectedRecipe pasa a ser un objeto vacío, ya que cuándo damos click en ver receta ese selectedRecipe se llena con toda la información de esa bebida, pero al cerrar el modal lo regresamos a un objeto vacío.
        })
    }
})