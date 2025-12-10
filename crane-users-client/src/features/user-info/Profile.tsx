import { useEffect , useState} from 'react';
import type {UserTypeFromAPI, licenseTypeFromAPI} from '../../types/types.ts'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from '../../app/store.ts'
import {fetchUserInfo, fetchLicenseInfo} from './state/userInfoSlice.ts'
import {capitalizeFirstLetter, formatDate, getDaysUntil} from '../../app/helpers.ts'
import  defProfilePic from "../../assets/images/profile/def-profile-pic.jpg";
import {useNavigate} from 'react-router'
import LogoutButton from '../login/LogoutButton'


const Profile = () => {
  const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info)
  const infostatus = useSelector((state: RootState)=>state.userInfoReducer.infoStatus)
  const licenseInfo:licenseTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.license)
  const licensestatus = useSelector((state: RootState)=>state.userInfoReducer.licenseStatus);
  const [daysLeft, setDaysLeft] = useState<number|null>(null)
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
      dispatch(fetchUserInfo());
      // localStorage.getItem("userInfo")
  },[dispatch])

  useEffect( () => {
    if (userInfo) { 
        if (userInfo.role !== "guest") {
            if (licensestatus !== 'success') { 
                dispatch(fetchLicenseInfo());
            }
        }
    }
}, [userInfo]);

 useEffect(() => {
        if(licenseInfo){
          const licenseDaysLeft = getDaysUntil(licenseInfo.end_date);
          setDaysLeft(licenseDaysLeft)
          console.log(`You have ${licenseDaysLeft} days untils your license EXPIRES!`)
        }
      }, [licenseInfo, dispatch])

  

    if(infostatus === "loading") return <h2> loading...</h2>;
    if(infostatus === "failed") {
      const demoUser = {"id":18,"email":"tohar@email.com","first_name":"tohar","last_name":"jackson","phone_number":"0525666669","role":"operator"}
      const demoUserLicense = {"licenses_id": 9,"user_id": 18,"license_number": "8877799","certification": "B1","license_max_load": "30 Tons","start_date": "2025-10-31T22:00:00.000Z","end_date": "2025-12-31T22:00:00.000Z"}

      return (
      <div className="row">
        <h2>OOPS...</h2> 
        <h2>To see this page - <a className="btn-large" onClick={()=>navigate("/login")}>Log in</a></h2>
        <h3>Considering Sever is Ofline - This is A Demo Version:</h3>

        <div className="container">
        <h1>Profile</h1>
        {demoUser && 
        <>
        <h3>Hello {capitalizeFirstLetter(demoUser.first_name)} {capitalizeFirstLetter(demoUser.last_name)}</h3>
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
          <li><p> <i className="material-icons prefix">email</i> Your Email: {demoUser.email}</p></li>
          <li><p> <i className="material-icons prefix">phone</i> Your Phone Number: {demoUser.phone_number}</p></li>
          <li><p> <i className="material-icons prefix">business_center</i> Your Role: {capitalizeFirstLetter(demoUser.role)}</p></li>
        </ul>
        </>
        }
        {demoUserLicense&& <>
          <ul>
            <li><h4>License Info:</h4></li>
            <li><h5>You have {daysLeft} days untils your license EXPIRES!</h5></li>
            <li><p> <i className="material-icons prefix">email</i> Your licenses number: {demoUserLicense.license_number}</p></li>
            <li><p> <i className="material-icons prefix">phone</i> Your certification: {capitalizeFirstLetter(demoUserLicense.certification)}</p></li>
            <li><p> <i className="material-icons prefix">business_center</i> Your licenses max load: {demoUserLicense.license_max_load}</p></li>
            <li><p> <i className="material-icons prefix">business_center</i> Your licenses start date: {formatDate(demoUserLicense.start_date)}</p></li>
            <li><p> <i className="material-icons prefix">business_center</i> Your licenses end date: {formatDate(demoUserLicense.end_date)}</p></li>
          </ul>
        </>}
        <LogoutButton/>
    </div>
      </div>
      )
    }
    if(infostatus === "idle") return (
      <div className="row">
        <h2>To see this page - <a className="btn-large" onClick={()=>navigate("/login")}>Log in</a></h2>
      </div>
    )

  return (
    <div className="container">
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
        </>
        }
        {licenseInfo&& <>
          <ul>
            <li><h4>License Info:</h4></li>
            <li><h5>You have {daysLeft} days untils your license EXPIRES!</h5></li>
            <li><p> <i className="material-icons prefix">email</i> Your licenses number: {licenseInfo.license_number}</p></li>
            <li><p> <i className="material-icons prefix">phone</i> Your certification: {capitalizeFirstLetter(licenseInfo.certification)}</p></li>
            <li><p> <i className="material-icons prefix">business_center</i> Your licenses max load: {licenseInfo.license_max_load}</p></li>
            <li><p> <i className="material-icons prefix">business_center</i> Your licenses start date: {formatDate(licenseInfo.start_date)}</p></li>
            <li><p> <i className="material-icons prefix">business_center</i> Your licenses end date: {formatDate(licenseInfo.end_date)}</p></li>
          </ul>
        </>}
        <LogoutButton/>
    </div>
  )
}

export default Profile