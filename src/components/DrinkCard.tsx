import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCardProps = {
    drink: Drink // Le pasamos ese type que tiene el schema de drink en singular
}

export default function DrinkCard({drink} : DrinkCardProps) { // Le pasamos ese type

    const selectRecipe = useAppStore((state) => state.selectRecipe) // Le pasamos el state que va a ser la encargada de seleccionar una receta

    return ( // Imprimimos la imágen y el nombre de la bebida. Esa clase de hover:scale-125 es lo que hace que las imágen crezcan un 25% adicional cuando nos posicionamos en ellas, y ese transitions-transform mejora ese efecto agregando una transición. Y al div le coloco ese overflow-hidden para que esa imágen no se salga del recuadro, sinó que crezca dentro del recuadro.
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img 
                    src={drink.strDrinkThumb} 
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-125 transition-transform hover:rotate-2"
                />
            </div>
        
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                    onClick={() => selectRecipe(drink.idDrink)} // Le pasamos a esa función el id para identificar que receta es la que queremos obtener más detalles.
                >Ver Receta</button>
            </div>
        </div>
    ) // Esa clase truncate lo que hace es que si un nombre es muy largo lo va a cortar
}
