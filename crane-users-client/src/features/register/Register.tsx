import {useState, useEffect} from 'react'
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
    const [first_name, setfirst_name] = useState<string>("")
    const [last_name, setlast_name] = useState<string>('')
    const [phone_number, setphone_number] = useState<string>('')
    const [role, setRole] = useState<string>('guest')

    const [isLicenseChecked, setIsLicenseChecked] = useState<boolean>(false)

    const [license_number, setlicense_number] = useState<string|null>(null)
    const [certification, setCertification] = useState<string|null>(null)
    const [start_date, setstart_date] = useState<string|null>(null)
    const [end_date, setend_date] = useState<string|null>(null)

    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    useEffect(() => {
      if (isLicenseChecked) {
        setRole("operator")
      }else{
        setlicense_number(null);
        setCertification(null);
        setstart_date(null);
        setend_date(null);
        setRole("guest")
      }
    }, [isLicenseChecked])
    

    const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
        setIsLicenseChecked(event.target.checked);
      };

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCertification(event.target.value);
      };

    const getMaxLoad=(certificationINP:string|null)=>{
      switch (certificationINP) {
        case "B1":
          return "30 Tons";
        case "B2":
          return "90 Tons";  
        case "B3":
          return "150 Tons";  
        case "B4":
          return "Unlimited"; 
        case null:
          return null;      
      }
    }

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const license_max_load = getMaxLoad(certification);
        // console.log({email, password,first_name, last_name, phone_number,role,license_number,certification,license_max_load, start_date, end_date});
        
        try {
        const response = await axios.post<RegisterResponse>(
        "http://localhost:5005/api/user/register",
         {email, password,first_name, last_name, phone_number,role,license_number,certification,license_max_load, start_date, end_date},
         {withCredentials: true}
       );

            setError(response.data.message ?? "")
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        
        } catch (err) {
          const axiosErr = err as AxiosError<ErrorResponse>;
          setError(axiosErr.response?.data?.message ?? "Register Failed")
        }
    }



  return (
    <div className="container">
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
              <input id="first" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setfirst_name(e.target.value)}/>
              <label htmlFor="first">First Name</label>
            </div>
            <div className="input-field">
              <input id="last" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setlast_name(e.target.value)}/>
              <label htmlFor="last">Last Name</label>
            </div>
            <div className="input-field">
              <input id="phone" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setphone_number(e.target.value)} type="tel" maxLength={10} pattern="[0-9]{10}" title="Phone number must be exactly 10 digits"/>
              <label htmlFor="phone">Phone Number</label>
            </div>

              <label>
                <input type="checkbox" className="filled-in" checked={isLicenseChecked} onChange={handleCheckboxChange} />
                <span>I Have A Crane Operatore License</span>
              </label>

            {isLicenseChecked&& <>
              <h5>Licenses Info:</h5>
              <div className="input-field">
                <input id="liceNum" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setlicense_number(e.target.value)}  />
                <label htmlFor="liceNum">Licenses Number</label>
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

                <div className="input-field">
                  <input id="start_date" type="date" className="datepicker" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setstart_date(e.target.value)}  />
                  <label htmlFor="start_date">Licenses Start Date</label>
                </div>
                <div className="input-field">
                  <input id="end_date" type="date" className="datepicker" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setend_date(e.target.value)}  />
                  <label htmlFor="end_date">Licenses End Date</label>
                </div>

            </>}  
            <br/>
            <input type="submit" value={"Register"} className="btn-large"/>
            {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register