import {useState} from 'react'
import axios, {AxiosError} from 'axios'
import {useNavigate} from 'react-router'
import type {UserTypeFromAPI} from '../../types/types.ts'
import {useAuth} from '../auth/useAuth.tsx'
import {useSelector} from 'react-redux'
import type {RootState} from '../../app/store.ts'
import {capitalizeFirstLetter} from '../../app/helpers.ts'
import LogoutButton from './LogoutButton'

 type LoginResponse = {
   message: string;
   user: UserTypeFromAPI,
   token: string
 };

 type ErrorResponse = {
   message?: string;
 };

const Login = () => {
    const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const {login} = useAuth()

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        try {
            const response = await axios.post<LoginResponse>("http://localhost:5005/api/user/login", 
                {email, password},
                {withCredentials: true}
            );

            const {user, token} = response.data
            login(user,token)
            setError(response.data.message ?? "")
            setTimeout(() => {
                navigate("/profile")
            }, 1000);
        
        
        } catch (error) {
            const axiosErr = error as AxiosError<ErrorResponse>;
            console.log(axiosErr);
            setError(axiosErr.response?.data?.message|| "LogIn Failed")
            
        }
    }
    if(userInfo){
      return (
        <div className="row">
          <h2>{capitalizeFirstLetter(userInfo.first_name)} - You are already Logged in!</h2>
          <LogoutButton />
        </div>
      )
    }

  return (
    <div className="container">
      <div className="row">
        <h2>Log In</h2>
        <form className="col s12" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column",gap:"10px" }}>
          <div className="input-field">
            <input id="email" type="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}  />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
          </div>
      
          <input type="submit" value={"Login"} className="btn teal" />
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login