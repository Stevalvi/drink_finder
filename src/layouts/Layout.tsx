import { useEffect } from 'react'
import { Outlet } from 'react-router-dom' // Importamos con npm i react-router-dom
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useAppStore } from '../stores/useAppStore'
import Notification from '../components/Notification'

// Creamos el Layout Principal que contenga ese Header
export default function Layout() {
  const loadFromStorage = useAppStore((state) => state.loadFromStorage) // Importamos esa función.

  useEffect(() => { // Esto se hace porque una vez que agregamos la receta en favoritos se almacena en localStorage pero no en el state de favoritos. Con ese useEffect se carga una sola vez ese loadFromStorage
    loadFromStorage()
  }, [])

  return ( // Renderizamos esos componentes, el Outlet es un componente que nos permite inyectar el contenido del componente IndexPage y FavoritesPage pero nos va a permitir tener elementos que comparten o que son comunes en esta página, como puede ser el Header o el Footer o una Navegación. De esta forma el Layout ya va a contener el contenido del Header y se va a mostrar en todas las páginas que tenemos agrupadas en ese router.tsx como un elemento en compun entre esas páginas, sin necesidad de tener que importar el Header en cada página. El Header y el contenido de cada página se inyecta en el Outlet, osea que si vamos a IndexPage se muestra el Header y su  propio contenido, si vamos a FavoritesPage se inyecta el Header y su propio contenido. Importamos ese componente de Modal porque queremos mostrarlos en ambas páginas.
    <>
        <Header />

        <main className='container mx-auto py-16'>
            <Outlet />
        </main>

        <Modal />
        <Notification />
    </>
  )
}
