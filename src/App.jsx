import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Checkout from './pages/checkout/Checkout'
import ProtectedRoutes from './components/userAuth/ProtectedRoutes'

const App = () => {
  const isLogin =localStorage.getItem("logged")
  return (
   <BrowserRouter>
   <Navbar/>
    <Routes>
    <Route  path='/' element={<Home/>}/>
          <Route path="/" element={<ProtectedRoutes/>}>
          <Route  path='/cart' element={<Cart/>}/>
         <Route  path='checkout' element={<Checkout/>}/>
      </Route>
      <Route  path='/login' element={<Login/>}/>
      <Route  path='/signup' element={<Signup/>}/>
    </Routes>
<Footer/>
   </BrowserRouter>
  )
}

export default App