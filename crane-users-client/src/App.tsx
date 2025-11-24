import {Routes, Route, Link} from 'react-router'
import Home from "./features/home-page/Home"
import Login from './features/login/Login'
import Register from './features/register/Register'
import Profile from './features/user-info/Profile'
import Shop from './features/shop/Shop'
import News from './features/news/News'
import LiftingCalculator from './features/lifting-accessorys/LiftingCalculator'
import Chat from './features/chat-platform/Chat'
import GovermentLinks from './features/government-facilities/GovermentLinks'
import  defProfilePic from "./assets/images/profile/def-profile-pic.jpg";
import LogoutButton from './features/login/LogoutButton'
import {useSelector} from 'react-redux'
import type {RootState} from './app/store.ts'
import type {UserTypeFromAPI} from './types/types.ts'
import {capitalizeFirstLetter} from './app/helpers.ts'


function App() {
 
  const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info)

  return (
    <>
      <div>
        <nav>
          <div className="nav-wrapper">
            <ul className="left hide-on-med-and-down">
              <li></li>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><Link to={'/news'}>News</Link></li> 
              <li><Link to={'/liftingCalculator'}>Lifting-Calculator</Link></li>
              <li><Link to={'/chat'}>Chat</Link></li>
              <li><Link to={'/govermentLinks'}>GovermentLinks</Link></li>
            </ul>          
          </div>
        </nav>

         <ul id="slide-out" className="sidenav">
              <li><div className="user-view">
                <a href="#user"><img className="circle" src={defProfilePic}/></a>
                {userInfo === null?(
                  <Link to={'/login'}><span className="red-text name">Guest</span></Link>
                ):(
                  <Link to={'/profile'}><span className="red-text name">Hello {capitalizeFirstLetter(userInfo.first_name)}</span></Link>
                )}
              </div></li>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><Link to={'/news'}>News</Link></li>
              <li><Link to={'/liftingCalculator'}>Lifting-Calculator</Link></li>
              <li><Link to={'/chat'}>Chat</Link></li>
              <li><Link to={'/govermentLinks'}>GovermentLinks</Link></li>
              <li><LogoutButton/></li>
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>

        <div className="container center">
          <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="/login"  element={<Login/>}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/profile"  element={<Profile/>}/>
            <Route path="/shop"  element={<Shop/>}/>
            <Route path="/news"  element={<News/>}/>
            <Route path="/liftingCalculator"  element={<LiftingCalculator/>}/>
            <Route path="/chat"  element={<Chat/>}/>
            <Route path="/govermentLinks"  element={<GovermentLinks/>}/>
          </Routes>
        </div>   
      </div>
    </>

    
  )
}

export default App
