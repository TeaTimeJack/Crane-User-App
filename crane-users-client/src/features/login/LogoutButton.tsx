
import axios, {AxiosError} from 'axios';
import { useDispatch} from 'react-redux'
import type {AppDispatch} from '../../app/store.ts'
import { logOut} from '../user-info/state/userInfoSlice.ts'

const LogoutButton = () => {

    const dispatch:AppDispatch = useDispatch();
    
    type ErrorResponse = {
        message?: string;
        };

    const handleLogOut =async() =>{
        console.log("Hi Log Out");
        // "http://localhost:5005/api/user/logout"
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL+"/user/logout/",
              {},
              {withCredentials: true}
            );
            console.log(response);
        } catch (error) {
            const axiosErr = error as AxiosError<ErrorResponse>;
            console.log(axiosErr);
        }
        dispatch(logOut())
        localStorage.remove("userInfo")
    }

  return (
    <div>
      <button className="btn-large teal" onClick={()=>handleLogOut()}>Log Out</button>
    </div>
  )
}

export default LogoutButton
