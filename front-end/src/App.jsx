import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts/MainLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { AdminRoute } from '../src/components/admin/AdminRoute'

const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Index = lazy(() => import('./pages/admin/Index'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminProductPage = lazy(() => import('./pages/admin/AdminProductPage'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'))
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'))
const AdminVendors = lazy(()=> import('./pages/admin/AdminVendors'))
const AdminVendorsPage = lazy(() => import('./pages/admin/AdminVendorsPage'))

function App() {
  return (
    <div className='m-0 p-0 '>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:name" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<Index />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="product" element={<AdminProductPage />} />
          <Route path="product/:id" element={<AdminProductPage />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="user" element={<AdminUsersPage />} />
          <Route path="user/:id" element={<AdminUsersPage />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="order/:id" element={<AdminOrdersPage />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="vendor/:id" element={<AdminVendorsPage />} />
          <Route path='categories' element={<AdminCategories />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App