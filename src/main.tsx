import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render( // Importamos nuestro Router que contiene esas páginas principales y lo rodeamos dentro de la aplicación como si fuera el App.tsx que nos dá vite por defecto
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
