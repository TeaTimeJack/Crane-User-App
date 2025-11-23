
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
         <div className="nav-wrapper">
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/register'}>Register</Link></li>
            <li><Link to={'/profile'}>Profile</Link></li>
            <li><Link to={'/shop'}>Shop</Link></li>
            <li><Link to={'/news'}>News</Link></li>
            <li><Link to={'/liftingCalculator'}>Lifting-Calculator</Link></li>
            <li><Link to={'/chat'}>Chat</Link></li>
          </ul>          
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/register'}>Register</Link></li>
            <li><Link to={'/profile'}>Profile</Link></li>
            <li><Link to={'/shop'}>Shop</Link></li>
            <li><Link to={'/news'}>News</Link></li>
            <li><Link to={'/liftingCalculator'}>Lifting-Calculator</Link></li>
            <li><Link to={'/chat'}>Chat</Link></li>
      </ul>

       
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
