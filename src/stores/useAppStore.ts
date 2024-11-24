import { create } from 'zustand' // create nos permite crear un store
import { devtools } from 'zustand/middleware' // Registramos devtools
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { FavoritesSliceType, createFavoritesSlice } from './favoritesSlice'
import { NotificationSliceType, createNotificationSlice} from './notificationSlice'

// Como dividimos nuestro store en varios componentes, con Slice Pattern dividimos ese store en varias piezas y los unimos en nuestro store principa que sería este de acál. Básicamente los otros componentes son slices que solo son otros archivos que sirven para separación y más orden, al unirlos acá forman nuestro store y lo creamos con ese create.

// Como este archivo es el que une los demás slices, acá es dónde debemos colocar las categorías en el State. Ese devtools es para crear ese redux que muestra el state desde el aapartado donde se reflejan los componentes y la consola.

// Eso lo que hace es que esta función de create que tiene las funciones para obtener datos del state, se las pasamos a esos slices con ...a
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({ // Tomamos una copia de nuestros slices, y ese ...a lo que hace es tomar una copia de todos los argumentos, todas las funciones de set, de get, etcétera. El argumento de set nos permite escribir en el state, con ese ...a le estamos pasando 3 argumentos que son set, get y api
    ...createRecipesSlice(...a), // Pasamos esa copia de ...a para que tenga la copia de todos los argumentos
    ...createFavoritesSlice (...a),
    ...createNotificationSlice(...a),
}))) // Le asignamos ese generic con cada uno de los slices que creamos create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>