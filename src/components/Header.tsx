import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom' // Se importa NavLink para navegar entre páginas, Link también hace lo mismo, se usa el componente tal cuál como hice con NavLink, la diferencia entre NavLink y Link, es que NavLink tiene un callback que permite resaltar la página actual para decirle al usuario en que página está. El hook useLocation es para saber la información de la ruta actual.
import { useAppStore } from '../stores/useAppStore'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({ // En el state vamos a agregar esa información que el usuario ingrese en el input y en el select para leer los datos ingresados y  mostrar esos resultados más adelante
        ingredient: '', // Como ese input tiene el name ingrediente lo agregamos acá para acceder a ese input
        category: '' // Y ese select tiene el name de category
    })

    const { pathname } = useLocation() // Con ese pathname detectamos la información de la página actual en la que se encuentra el usuario
    const isHome = useMemo(() => pathname === '/' , [pathname]) // Queremos que se ejecute esta función cada que el pathname cambie y para detectar la página de inicio le colocamos pathname === '/', cuando detecte que estamos en esa página de inicio, mostramos ese formulario

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories) // Importamos el state de categories para poder mostrarlas en el select
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => { // Cuándo esté listo este componente mandamos a llamar esa función, luego lo manda a llamar desde el recipeSlice y luego en el RecipeService esa función
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters, // Tomamos una copia de lo que tengamos en searchFilters
            [e.target.name] : e.target.value // Escribimos en cada uno de los campos gracias a ese name que tiene el input y el select
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchFilters).includes('')) { // Agregamos la validación 
            showNotification({ // Mandamos a llamar esa función que muestra la notificación, y toma dos valores, el text y el error
                text: 'Todos los campos son obligatorios',
                error: true // Como en este caso si es de tipo error, le pasamos true y es una notificación en rojo.
            })
            return // Detener la ejecución del código
        }
        // Consultar las recetas
        searchRecipes(searchFilters) // Caso contrario, es decir, se llenaron todos los campos, consultamos las recetas. Le pasamos el state de searchFilters para que pueda entonces nuestro slice comunicarse con el servicio y obtener las recetas.
    }

    return ( // Si tenemos algo en isHome, es decir, estamos en la página / del index, mostramos y le asignamos esa clase de bg-header que creamos en el archivo tailwind.config.js, esa imágen de fondo, caso contrario, es decir, estamos en la página de favoritos, mostramos ese bg-slate-800
        <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className='flex gap-4'>
                        <NavLink
                            to="/"
                            className={({ isActive }) => // isActive es un prop especializado de NavLink que se usa para indicar en que página estamos actualmente, le aplicamos destructuring con { isActive }, entonces le colocamos si es isActive queremos mostrar esas clases al enlace, caso contrario : estas clases.
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Inicio</NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Favoritos</NavLink>
                    </nav>
                </div>

                { isHome && ( // Si estamos en la página de Home, mostramos ese formulario
                    <form
                        className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
                        onSubmit={handleSubmit}
                    >
                        <div className='space-y-4'>
                            <label 
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes</label>

                            <input
                                id='ingredient'
                                type='text'
                                name='ingredient'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                                onChange={handleChange} // Esa clase del focus:outline-none quiere decir que cuádo nos posicionemos en el input no debe de resaltarse nada.
                                value={searchFilters.ingredient} // Le asignamos esa propiedad que creamos en el useState para conectar esos valores que agreguemos acá en el input y se guarden en el state
                            />
                        </div>
                        <div className='space-y-4'>
                            <label 
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Categoría</label>

                            <select
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                onChange={handleChange}
                                value={searchFilters.category} // Le asignamos esa propiedad que creamos en el useState para conectar esos valores que agreguemos acá en el select y se guarden en el state
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map( category => ( // Iteramos sobre las categorías. Como solo tenemos category.strCategory lo usamos para el value y para el key
                                    <option 
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type='submit'
                            value='Buscar Recetas'
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
