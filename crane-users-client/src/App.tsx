
import './App.css'
import {Routes, Route, Link} from 'react-router'
import Home from "./features/home-page/Home"
import Login from './features/login/Login'
import Register from './features/register/Register'
import Profile from './features/user-info/Profile'
import Shop from './features/shop/Shop'
import News from './features/news/News'
import LiftingCalculator from './features/lifting-accessorys/LiftingCalculator'
import Chat from './features/chat-platform/Chat'

function App() {
 

  return (
    <>
      <nav>
         <div style = {{display: "flex", gap:"10px"}}>
          <Link to={'/'}>Home</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/shop'}>Shop</Link>
          <Link to={'/news'}>News</Link>
          <Link to={'/liftingCalculator'}>Lifting-Calculator</Link>
          <Link to={'/chat'}>Chat</Link>
        </div>
      </nav>
      <h1>App</h1>

      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Register/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/shop"  element={<Shop/>}/>
        <Route path="/news"  element={<News/>}/>
        <Route path="/liftingCalculator"  element={<LiftingCalculator/>}/>
        <Route path="/chat"  element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App
