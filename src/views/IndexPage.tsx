import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

// Este es el componente que muestra la página principal, y muestra los resultados de la búsqueda en la parte inferior.

export default function IndexPage() {
    const drinks = useAppStore((state) => state.drinks) // Lo que queremos extraer es ese drinks por lo tanto le pasamos ese state
    
  // Con ese drinks.drinks,length comprobamos si hay algo en drinks, es como colocar drinks.drinks.length > 0
    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]) // Ese useMemo va a revisar si hay cambios en ese drinks o state, si hay cambios, es decir, tenemos recetas, las mostramos

    return (
      <>
        <h1 className="text-6xl font-extrabold">Recetas</h1>

        {hasDrinks ? ( // Si hay algo en bebidas entonces mostramos esto
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
            {drinks.drinks.map( (drink) => ( // Iteramos sobre esas bebidas
                <DrinkCard
                  key={drink.idDrink} // Le pasamos los props a ese componente, el key y el drink con las bebidas
                  drink={drink} // Le pasamos ese objeto
                />
            ))}
          </div>
        ) : ( // Caso contrario
          <p className="my-10 text-center text-2xl">
              No  hay resultados aún, utiliza el formulario para buscar recetas
          </p>
        )}
      </>
    )
}
