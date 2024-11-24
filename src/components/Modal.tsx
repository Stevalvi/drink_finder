import { Dialog, Transition } from '@headlessui/react'; // Se instala con npm i @headlessui/react, es la parte de tailwind css cuándo queremos tener elementos más dinámicos, headless nos facilita una serie de componentes bastante interactivos y que se ven muy bien. En este caso lo usamos para crear ese modal.
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

    const modal = useAppStore((state) => state.modal) // Importamos el state de modal

    const closeModal = useAppStore((state) => state.closeModal) // Importamos esa función

    const selectedRecipe = useAppStore((state) => state.selectedRecipe) // Importamos ese state, ya que ahí es donde se almacena la información de la receta, necesitamos mostrar esa información en el modal.

    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite) // Esta función es para ver si existe o no ese favorito en el state, si ya existe lo eliminamos pero si no existe lo agregamos a favoritos, esa función va a tomar una receta 

    const favoriteExists = useAppStore((state) => state.favoriteExists) // Esta función se va a encargar de averiguar si existe o no la receta en favoritos, de esa forma siempre que presionemos o la agrega o la elimina, debemos hacer dinámico ese botón de Agregar a favoritos para que también muestre eliminar favoritos cuando ya exista en el state. Toma el id de la receta

    const renderIngredients = () => {
        const ingredients : JSX.Element[] = [] // Creamos un arreglo llamado ingredients y es algo que queremos mostrar en pantalla, ya que van a ser los ingredientes, react por defecto nos da el type que es JSX.Element, pero como van a ser muchos le colocamos el [], ese type se lo colocamos para que no quede como any.
        for(let i = 1; i <= 6; i++) { // En nuestro schema, tenemos 6 ingredientes, por lo tanto, iniciamos en 1 y cuándo llegue a 6 queremos que se detenga.
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe] // De esa forma accedemos dinámicamente a cada ingrediente. Y como ese ingredient vuelve a ser de tipo any, le colocamos ese Keyof y ese Keyof lo que hace es que va a utilizar cualquiera de esas llaves del objeto o la forma que deinifimos en el type Recipe pero específicamente en el Schema. De esa forma ingredient va a ser string o null.

            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe] // Hacemos lo mismo con Measure, measure es una propiedad que definimos en ese schema.

            if(ingredient && measure) { // Si tenemos un ingrediente y una cantidad, ejecutamos lo siguiente, de nuevo, porque no todos tienen la misma cantidad de ingredientes.:
                ingredients.push( // Ese ingredients es un arreglo, así que le colocamos el método push, y usualmente en react no usaríamos push ya que muta el arreglo original, pero este no es un state, este es un arreglo que se está llenando de información

                    // Le asignamos un key a ese li para crear la lista y le colocamos el index actual 
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure} 
                    </li> // Concatenamos y unimos ese ingrediente y la cantidad
                )
            }
        }
        return ingredients // Retornamos los ingredientes y ya se va a llenar ese arreglo.
    }
    
    return ( // Este código se sacó de un gist, es el código de un componente modal que se sacó de headlessui
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                {selectedRecipe.strDrink}
                            </Dialog.Title>

                            <img
                                src={selectedRecipe.strDrinkThumb}
                                alt={`Imagen de ${selectedRecipe.strDrink}`}
                                className='mx-auto w-96'
                            />
                            <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Ingredientes y Cantidades
                            </Dialog.Title>

                            {renderIngredients()}
                            <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Instrucciones
                            </Dialog.Title>

                            <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                            <div className='mt-5 flex justify-between gap-4'>
                                <button
                                    type='button'
                                    className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                                    onClick={closeModal}
                                >Cerrar</button>

                                <button
                                    type='button'
                                    className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500'
                                    onClick={() => handleClickFavorite(selectedRecipe)} // Le pasamos selectedRecipe porque ahí se almacenan las recetas
                                        >{favoriteExists(selectedRecipe.idDrink) // De esa forma si existe esa receta entonces ese botón muestra Eliminar favorito, pero si no existe esa receta se muestra Agregar a favoritos
                                                ? 'Eliminar favorito'
                                                : 'Agregar a favoritos'
                                        }
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}