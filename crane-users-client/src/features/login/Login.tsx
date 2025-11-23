import {useState} from 'react'
import axios, {AxiosError} from 'axios'
import {useNavigate} from 'react-router'
import type {UserTypeFromAPI} from '../../types/types.ts'
import {useAuth} from '../auth/useAuth.tsx'


 type LoginResponse = {
   message: string;
   user: UserTypeFromAPI,
   token: string
 };

 type ErrorResponse = {
   message?: string;
 };

const Login = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const {login} = useAuth()

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("Hi Login");
        
        try {
            const response = await axios.post<LoginResponse>("http://localhost:5005/api/user/login", 
                {email, password},
                {withCredentials: true}
            );

            console.log(response.data);
            const {user, token} = response.data
            login(user,token)
            setError(response.data.message ?? "")
            setTimeout(() => {
                navigate("/profile")
            }, 2000);
        
        
        } catch (error) {
            const axiosErr = error as AxiosError<ErrorResponse>;
            console.log(axiosErr);
            setError(axiosErr.response?.data?.message|| "LogIn Failed")
            
        }
        
        
    }
  return (
    <>
    <h2>Log In</h2>
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column",gap:"10px" }}>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} placeholder ="Email" />
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} placeholder ="Password"/>
        <input type="submit" value={"Login"} />
        {error && <div>{error}</div>}
    </form>
    </>
  )
}

export default Login