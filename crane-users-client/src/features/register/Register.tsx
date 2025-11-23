import {useState} from 'react'
import axios, {AxiosError} from 'axios'
import {useNavigate} from 'react-router'


 type RegisterResponse = {
   message?: string;
 };

 type ErrorResponse = {
   message?: string;
 };

const Register = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("Hi Register");
        
        try {
        const response = await axios.post<RegisterResponse>(
        "http://localhost:5005/api/user/register",
         {email, password,firstName, lastName, phoneNumber},
         {withCredentials: true}
       );

            console.log(response.data);
            setError(response.data.message ?? "")
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        
        } catch (err) {
          const axiosErr = err as AxiosError<ErrorResponse>;
          setError(axiosErr.response?.data?.message ?? "Register Failed")
        }
    }

  return (
    <>
    <h2>Register</h2>
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column",gap:"10px" }}>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} placeholder ="Email" />
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} placeholder ="Password"/>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFirstName(e.target.value)} placeholder ="First Name"/>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setLastName(e.target.value)} placeholder ="Last Name"/>
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPhoneNumber(e.target.value)} placeholder="Phone Number" type="tel" maxLength={10} pattern="[0-9]{10}" title="Phone number must be exactly 10 digits"/>
        <input type="submit" value={"Register"} />
        {error && <div>{error}</div>}
    </form>
    </>
    
  )
}

export default Register