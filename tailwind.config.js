/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { // En esta parte de theme podemos crear nuestras propias clases, se le conoce como Theming en Tailwind, se pueden cambiar los colores o podemos agregar nuevas clases.
    extend: {
      backgroundImage : { // Theming en tailwind para añadir una imágen de fondo
        "header" : "url('/bg.jpg')" // header es el nombre de la clase, lo que va a hacer esto es que como estoy escribiendo en background, me va a crear una clase llamada .bg-header que ya puedo usar en mi código html y luego de los dos puntos se le asigna el valor a la clase, en este caso la url de la imágen que queremos colocar de fondo.
      }
    },
  },
  plugins: [],
}
