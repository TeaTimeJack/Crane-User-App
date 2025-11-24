import { useEffect} from 'react';
import type {UserTypeFromAPI} from '../../types/types.ts'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from '../../app/store.ts'
import {fetchUserInfo} from './state/userInfoSlice.ts'
import {capitalizeFirstLetter} from '../../app/helpers.ts'
import  defProfilePic from "../../assets/images/profile/def-profile-pic.jpg";
import {useNavigate} from 'react-router'
import LogoutButton from '../login/LogoutButton'



const Profile = () => {
  const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info)
  const status = useSelector((state: RootState)=>state.userInfoReducer.status)
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
      dispatch(fetchUserInfo());
  },[])

    if(status === "loading") return <h2> loading...</h2>;
    if(status === "failed") return <h2>Opps....</h2>
    if(status === "idle") return (
      <div className="row">
        <h2>To see this page - <a className="btn-large" onClick={()=>navigate("/login")}>Log in</a></h2>
      </div>
    ) 
  console.log(userInfo);
  
  
  return (
    <div>
        <h1>Profile</h1>
        {userInfo && 
        <>
        <h3>Hello {capitalizeFirstLetter(userInfo.first_name)} {capitalizeFirstLetter(userInfo.last_name)}</h3>
        <div className="row">
          <img className={"responsive-img circle"} style={{height:"30vh" }} src={defProfilePic}/>
          <form action="#">
          <div className="file-field input-field">
            <div className="btn">
              <span>Chnage Photo</span>
              <input type="file"/>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text"/>
            </div>
          </div>
        </form>
        </div>
        
        <ul>
          <li><p> <i className="material-icons prefix">email</i> Your Email: {userInfo.email}</p></li>
          <li><p> <i className="material-icons prefix">phone</i> Your Phone Number: {userInfo.phone_number}</p></li>
          <li><p> <i className="material-icons prefix">business_center</i> Your Role: {capitalizeFirstLetter(userInfo.role)}</p></li>
        </ul>
        
        <LogoutButton/>
        </>
        
        }
    </div>
  )
}

export default Profile