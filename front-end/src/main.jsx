import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { FilterProvider } from '../context/filtersContext.jsx'
import { AuthProvider } from '../context/authContext.jsx'
import { CartProvider } from '../context/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
)
