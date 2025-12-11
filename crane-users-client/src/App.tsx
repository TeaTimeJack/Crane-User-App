import {useEffect} from 'react'
import {Routes, Route, Link, useNavigate} from 'react-router'
import Home from "./features/home-page/Home"
import Login from './features/login/Login'
import Register from './features/register/Register'
import Profile from './features/user-info/Profile'
import Shop from './features/shop/Shop'
import News from './features/news/News'
import LiftingCalculator from './features/lifting-accessorys/LiftingCalculator'
import FillerPosts from './features/temp-fillers/FillerPosts'
import GovermentLinks from './features/government-facilities/GovermentLinks'
import  defProfilePic from "./assets/images/profile/def-profile-pic.jpg";
import LogoutButton from './features/login/LogoutButton'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from './app/store.ts'
import type {UserTypeFromAPI} from './types/types.ts'
import {capitalizeFirstLetter} from './app/helpers.ts'
import AddFillerPostForm from './features/temp-fillers/components/AddFillerPostForm'
import {fetchUserInfo} from './features/user-info/state/userInfoSlice.ts'

function App() {
 
  const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info)
  const navigate = useNavigate()
  const dispatch:AppDispatch = useDispatch();
  useEffect(()=>{
            dispatch(fetchUserInfo());
  },[dispatch])

  useEffect(() => {
    localStorage.setItem("userInfo",JSON.stringify(userInfo))
  }, [])
  

  return (
    <div>
        <nav>
          <div className="nav-wrapper">
            <ul className="left">
              <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
              <li><Link to={'/'}>Home</Link></li>
              {!userInfo&& <>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
              </>}
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/liftingCalculator'}>Lifting-Calculator</Link></li>
              <li><Link to={'/fillerPosts'}>Filler Posts</Link></li>
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><Link to={'/news'}>News</Link></li> 
              <li><Link to={'/govermentLinks'}>GovermentLinks</Link></li>
              
            </ul>          
          </div>
        </nav>

         <ul id="slide-out" className="sidenav">
              <li><div className="user-view">
                <a href="/profile"><img className="circle center" src={defProfilePic}/></a>
                {userInfo === null?(
                  <Link to={'/login'}><span className="red-text name">Guest</span></Link>
                ):(
                  <Link to={'/profile'}><span className="red-text name">Hello {capitalizeFirstLetter(userInfo.first_name)}</span></Link>
                )}
              </div></li>
              <li><Link to={'/'}>Home</Link></li>
              {!userInfo&& <>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
              </>}
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/liftingCalculator'}>Lifting-Calculator</Link></li>
              <li><Link to={'/fillerPosts'}>Filler Posts</Link></li>
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><Link to={'/news'}>News</Link></li> 
              <li><Link to={'/govermentLinks'}>GovermentLinks</Link></li>
              <div className="center">
                {userInfo === null?(
                  <div>
                    <button className="btn-large teal" onClick={()=>navigate("/login")}>Log In</button>
                  </div>
                ):(
                  <li><LogoutButton/></li>
                )}
              
            </div>
        </ul>
        {/* <a href="#" data-target="slide-out" className="sidenav-trigger hide-on-med-and-up"><i className="material-icons">menu</i></a> */}
        
        
        <div className="center">
          <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="/login"  element={<Login/>}/>
            <Route path="/register"  element={<Register/>}/>
            <Route path="/profile"  element={<Profile/>}/>
            <Route path="/shop"  element={<Shop/>}/>
            <Route path="/news"  element={<News/>}/>
            <Route path="/liftingCalculator"  element={<LiftingCalculator/>}/>
            <Route path="/govermentLinks"  element={<GovermentLinks/>}/>
            <Route path="/fillerPosts"  element={<FillerPosts/>}/>
            <Route path="/fillerPosts/addpost"  element={<AddFillerPostForm/>}/>
          </Routes>
        </div>   
    </div>
  )
}

export default App
