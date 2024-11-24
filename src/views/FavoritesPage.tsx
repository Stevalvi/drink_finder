import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

// Este componente muestra la otra página principal que es la de favoritos.
export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites) // Extraemos nuestro state
  const hasFavorites = useMemo(() => favorites.length , [favorites]) // Cada vez que cambie ese state de favorites se ejecuta esa función. Comprobamos con favorites.length si tenemos algo en favoritos

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>

      {hasFavorites ? ( // Si hay algo en nuestro state de favoritos, es decir, si hay favoritos, entonces iteramos y los mostramos.
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map( drink => ( // Iteramos y mostramos esos favoritos, como tenemos ese componente DrinkCard que es reutilizable entonces lo renderizamos, de esa forma ya se reflejan en favoritos esas recetas que agreguemos
              <DrinkCard
                key={drink.idDrink}
                drink={drink}
              />
          ) )}
        </div>
      ) : ( // Si no hay favoritos
        <p className="my-10 text-center text-2xl">
          Los favoritos se mostrarán aquí
        </p>
      )}
    </>
  )
}
