import { lazy, Suspense } from 'react' // Para mejorar el performance de la aplicación, por defecto al hacer el npm run build, se crea un archivo js con toda la aplicación, osea que el usuario sin ingresar a las demás páginas ya las ha descargado. Con ese lazy queremos que al hacer el npm run build se cree un archivo tanto para toda la aplicación y uno aparte para favorite, si tuviéramos más archivo se crea uno para cada uno, de esa forma se vuelven más ligeros, y esto se hace para que solo se descarguen cuándo el usuario se dirija a esa página. 
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Importamos con npm i react-router-dom y eso instala react-router que nos permite navegar por diferentes páginas.
import Layout from './layouts/Layout'
const IndexPage = lazy(() => import('./views/IndexPage'))
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))

export default function AppRouter() {
  return ( // El react-router-dom nos dá 3 componentes necesarios para crear nuestro router, el primer componente es BrowserRouter que nos permite crear nuestro router, Routes es el grupo de rutas y Route es cada ruta. El path es un prop que se le pasa a ese Route y es básicamente la url que se le pasa a determinada página, es donde el usuario va a navegar, siempre la página principal es /, elemento es otro prop y es el componente que se va a cargar, en este caso las páginas principales las nombramos en la carpeta views. En ese Route renderizamos el componente de <Layout /> para que se muestre en ambas páginas, tanto en la principal como en favoritos, de esa forma ya no se muestra el contenido de IndexPage ni de FavoritePage sinó el de Laout, y es ahí donde entra el componente de <Outlet/>, básicamente lo que permite outlet es, mantengo el contenido que tiene el Layout pero inyecto el contenido de IndexPage e inyecto el contenido de FavoritesPage.


    // Ese Suspense toma un prop que se llama falback ese fallback es lo que se va a mostrar en lo que se descarga o carga ese componente. Es para mejorar el performance de la aplicación.  A ese componente también se le puede colocar un spinner.
    <BrowserRouter>
        <Routes>
           <Route element={<Layout />}>
              <Route path='/' element={
                  <Suspense fallback="Cargando...">
                      <IndexPage />
                  </Suspense>
              } index />
              <Route path='/favoritos' element={
                <Suspense fallback="Cargando...">
                    <FavoritesPage />
                </Suspense>
              } />
           </Route>
        </Routes>
    </BrowserRouter>
  )
}
