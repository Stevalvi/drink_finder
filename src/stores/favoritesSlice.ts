import {  StateCreator } from 'zustand'
import { Recipe } from '../types'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice' // Importamos ese slice para tener acceso a los métodos de ese slice, lo hacemos para poder cerrar el modal una vez que hemos agregado o eliminado esa receta de favoritos.
import { NotificationSliceType, createNotificationSlice } from './notificationSlice' // Importamos ese slice para mandar a llamar esa función de mostrar la notificación

// Creamos un slice para la parte de favoritos

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void // Esta función es para ver si existe o no ese favorito en el state, si ya existe lo eliminamos pero si no existe lo agregamos a favoritos, esa función va a tomar una receta por eso el Recipe
    favoriteExists: (id: Recipe['idDrink']) => boolean // Esta función se va a encargar de averiguar si existe o no la receta en favoritos, de esa forma siempre que presionemos o la agrega o la elimina, debemos hacer dinámico ese botón de Agregar a favoritos para que también muestre eliminar favoritos cuando ya exista en el state. Esta función retorna un boolean ya sea true o false.
    loadFromStorage: () => void // Esto se hace porque una vez que agregamos la receta en favoritos se almacena en localStorage pero no en el state de favoritos.
}

//Creamos el slice y le definimos su type que va a ser FavoritesSliceType
export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({ // Le pasamos los types o valores que se usan para que no nos presente errores, y esos [], [] arreglos vacíos son para indicarle que no le vamos a pasar parámetros adicionales. Lo mismo se hace con el slice de recipeSlice.
    favorites: [], // Va a iniciar como un arreglo vacío, como queremos obtener el state se usa get. Ese get se utiliza para obtener ya sea state o acciones que pertenecer a este mismo slice.
    handleClickFavorite: (recipe) => {

        if(get().favoriteExists(recipe.idDrink)) { // Toma un id
            set((state) => ({ // Verificamos si existe esa receta en favoritos, si existe en el state la eliminamos, de esa forma siempre que presionemos o la agrega o la elimina, debemos hacer dinámico ese botón de Agregar a favoritos para que también muestre eliminar favoritos cuando ya exista en el state.
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink) // Con ese filter nos traemos todos los favoritos cuyo id sea diferente a recipe.idDrink es decír al que estamos intentando agregar a favoritos.
            }))

            // Importamos ese slice, para poder usar esa función y para que no salga errores, debemos agregarle el set, get y api
            createNotificationSlice(set, get, api).showNotification({  // Mandamos a llamar esa función y le pasamos el text y el error.
                text: 'Se eliminó de favoritos', 
                error: false // False porque no es una notificación de error, sinó de eliminado correctamente, se muestra en color verde.
            })
        } else {
            set((state) => ({ // Con ese state vamos a tener acceso a la aplicación completa, osea al state
                favorites: [ ...state.favorites, recipe] // En caso de que no exista esa receta en el state. Tomamos una copia del state.favorites y le agregamos la nueva receta
            }))
            createNotificationSlice(set, get, api).showNotification({ 
                text: 'Se agregó a favoritos', 
                error: false // False porque no es una notificación de error, sinó de agregado correctamente, se muestra en color verde.
            })
        }
        createRecipesSlice(set, get, api).closeModal() // Como estamos importando otro slice para poder tener acceso a ese CloseModal, debemos pasarle el set, get y api que es lo que nos permite tener acceso a las funciones y métodos de ese slice. Es por eso que en el useAppStore se le coloca ...a , porque de esa forma mantenemos las funciones y métodos disponibles.
        localStorage.setItem('favorites', JSON.stringify(get().favorites)) // Almacenamos en localStorage, y de nuevo, podemos recuperar u obtener el state con get.
    },
    favoriteExists: (id) => { // Esta función se va a encargar de averiguar si existe o no la receta en favoritos, de esa forma siempre que presionemos o la agrega o la elimina, debemos hacer dinámico ese botón de Agregar a favoritos para que también muestre eliminar favoritos cuando ya exista en el state. Toma el id de la receta
        return get().favorites.some(favorite => favorite.idDrink === id) // Va a verificar que el id de favorite.idDrink sea igual al id que le estamos pasando.
    },
    loadFromStorage: () => { // Esto se hace porque una vez que agregamos la receta en favoritos se almacena en localStorage pero no en el state de favoritos.
        const storedFavorites = localStorage.getItem('favorites') // Obtenemos los favoritos del localStorage
        if(storedFavorites) { // Si tenemos favoritos almacenados vamos a setearlos
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})