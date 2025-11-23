import {useState, useEffect} from 'react';
import axios from 'axios';
import type {UserTypeFromAPI} from '../../types/types.ts'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from '../../app/store.ts'
import {fetchUserInfo} from './state/userInfoSlice.ts'
import {capitalizeFirstLetter} from '../../app/helpers.ts'
import  defProfilePic from "../../assets/images/profile/def-profile-pic-small.jpg";


const Profile = () => {
  const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info)
  const status = useSelector((state: RootState)=>state.userInfoReducer.status)
  const dispatch:AppDispatch = useDispatch();
  
  useEffect(()=>{
   dispatch(fetchUserInfo());
  },[])

    if(status === "loading") return <h2> loading...</h2>;
    if(status === "failed") return <h2>Opps....</h2>
  console.log(userInfo);
  
  return (
    <div>
        <h1>Profile</h1>
        {userInfo && 
        <>
        <h3>Hello {capitalizeFirstLetter(userInfo.first_name)} {capitalizeFirstLetter(userInfo.last_name)}</h3>
        {/* <img className={"responsive-img circle"} style={{border:"1px solid purple"}}/> */}
        <p>Your Email: {userInfo.email}</p>
        <p>Your Phone Number: {userInfo.phone_number}</p>
        <p>Your Phone Role: {capitalizeFirstLetter(userInfo.role)}</p>



        <button>Log Out</button>
        </>
        
        }
    </div>
  )
}

export default Profile