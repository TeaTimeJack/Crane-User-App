import {useState} from 'react'
import type {ChangeEvent} from 'react'
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

    const [isLicenseChecked, setIsLicenseChecked] = useState<boolean>(false)

    const [licensesNumber, setLicensesNumber] = useState<number>()
    const [certification, setCertification] = useState<string>("")
    const [maxLoad, setMaxLoad] = useState<string>("")
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
        setIsLicenseChecked(event.target.checked);
      };

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCertification(event.target.value);
      };

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
    <div className="row">
      <h2>Register</h2>
      <form className="col s12" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column",gap:"10px" }}>
          <div className="input-field">
            <input id="email" type="email" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}  />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input id="password" type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input id="first" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFirstName(e.target.value)}/>
            <label htmlFor="first">First Name</label>
          </div>
          <div className="input-field">
            <input id="last" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setLastName(e.target.value)}/>
            <label htmlFor="last">Last Name</label>
          </div>
          <div className="input-field">
            <input id="phone" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPhoneNumber(e.target.value)} type="tel" maxLength={10} pattern="[0-9]{10}" title="Phone number must be exactly 10 digits"/>
            <label htmlFor="phone">Phone Number</label>
          </div>

            <label>
              <input type="checkbox" className="filled-in" checked={isLicenseChecked} onChange={handleCheckboxChange} />
              <span>I Have A Crane Operatore License</span>
            </label>

          {isLicenseChecked&& <>
            <h5>Licenses Info:</h5>
            <div className="input-field">
              <input id="liceNum" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setLicensesNumber(e.target.value)}  />
              <label htmlFor="liceNum">Licenses Number (Type only Numbers)</label>
            </div>
            
            
              <div className="row">
                <p className="col s6"> What is your License Certification: </p>
                <label className="col s3">
                  <input className="with-gap" name="group1" type="radio" value="B1" onChange={handleRadioChange}/>
                  <span>B1</span>
                </label>
                <label className="col s3">
                  <input className="with-gap" name="group1" type="radio" value="B2" onChange={handleRadioChange}/>
                  <span>B2</span>
                </label>
                <label className="col s3">
                  <input className="with-gap" name="group1" type="radio" value="B3" onChange={handleRadioChange}/>
                  <span>B3</span>
                </label>
                <label className="col s3">
                  <input className="with-gap" name="group1" type="radio" value="B4" onChange={handleRadioChange}/>
                  <span>B4</span>
                </label>
              </div>
          </>}  
          <br/>
          <input type="submit" value={"Register"} />
          {error && <div>{error}</div>}
      </form>
    </div>
    
  )
}

export default Register