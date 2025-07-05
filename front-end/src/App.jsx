import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from '../pages/Home'
import { Shop } from '../pages/Shop'
import { Cart } from '../pages/Cart'
import { ProductPage } from '../pages/ProductPage'
import { Login } from '../pages/auth/Login'
import { Register } from '../pages/auth/Register'
import { MainLayout } from '../layouts/MainLayout'

function App() {
  return (
    <div className='m-0 p-0 '>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:name" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
