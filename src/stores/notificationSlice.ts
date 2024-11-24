import {  StateCreator } from 'zustand'
import { FavoritesSliceType } from './favoritesSlice'

type Notification = {
    text: string // El texto que va a tener esa notificación, ej: se agregó o se eliminó correctamente
    error: boolean // Es true o false, si error vamos a mostrar una notificación en rojo, si no lo es sería un color normal
    show: boolean // True o false para mostrar u ocultar esa notificación
}

export type NotificationSliceType = {
    notification: Notification // Asignamos ese type
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void // Esa función toma un payload, le decimos que ese payload va a requerir text y error, tomamos de Notification ese text y error. Y con ese payload vamos a simular como si fuera con use-reducer 
    hideNotification: () => void
}

// Creamos el store para las notificaciones

export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '', // El texto va a estar vacío, inicia así
        error: false, // El error no se muestra hasta que se mande a llamar en base a las acciones del usuario
        show: false // Lo mismo la notificación
    },
    showNotification: (payload) => { // Le pasamos el payload, y de nuevo, solo toma text y error.
        set({ // Lo seteamos
            notification: { // Y como arriba declaramos ese objeto de notification, acá también deben estar esos valores
                text: payload.text, // El text va a ser lo que esté en payload
                error: payload.error, // Lo mismo error
                show: true // Para mostrar esa notificación
            }
        })
        // Como mandamos a llamar desde esta función de showNotification la otra función de hideNotification debemos usar get y declararlo en el parámetro del slice
        setTimeout(() => { // Para que esa notificación se oculte en 5 segundos
            get().hideNotification()
        }, 5000);
    },
    hideNotification: () => { // Ocultar esa notificación
        set({
            notification: { // Restablecemos sus valores a como estaban inicialmente, osea regresamos el state a su estado inicial.
                text: '',
                error: false,
                show: false
            },
        })
    }
})