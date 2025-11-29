import {useState} from 'react'
import type {ChangeEvent} from 'react'
import axios, {AxiosError} from 'axios'
import {useNavigate} from 'react-router'
// import {useSelector, useDispatch} from 'react-redux'
// import type {RootState, AppDispatch} from '../../../app/store.ts'
// import type {UserTypeFromAPI} from '../../../types/types.ts'
// import {fetchUserInfo} from '../../user-info/state/userInfoSlice.ts'


const AddFillerPostForm = () => {

    const [start_date, setstart_date] = useState<string|null>(null)
    const [end_date, setend_date] = useState<string|null>(null)
    const [start_hour, setstart_hour] = useState<string|null>(null)
    const [end_hour, setend_hour] = useState<string|null>(null)
    const [place, setplace] = useState<string|null>(null)
    const [certification_needed, setcertification_needed] = useState<string>("B1")
    const [crane_type, setcrane_type] = useState<string|null>(null)
    const [payment, setpayment] = useState<string|null>(null)
    const [extra_comments, setextra_comments] = useState<string|null>(null)
    // const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info);
    // const dispatch:AppDispatch = useDispatch();
    const [error, setError] = useState<string>('')

      // useEffect(()=>{
      //     dispatch(fetchUserInfo());
      // },[dispatch])

    interface addPostResponse{
      message?: string;
    }
    type ErrorResponse = {
      message?: string;
    };
    const navigate = useNavigate()

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setcertification_needed(event.target.value);
      };

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const work_hours = `${start_hour}-${end_hour}`;  
        try {
        const response = await axios.post<addPostResponse>(
        "http://localhost:5005/api/fillerposts/add",
         {start_date, end_date,work_hours, place,certification_needed,crane_type,payment,extra_comments},
         {withCredentials: true}
       );

            setError(response.data.message ?? "")
            setTimeout(() => {
                navigate("/fillerPosts")
            }, 1000);
        
        } catch (err) {
          const axiosErr = err as AxiosError<ErrorResponse>;
          setError(axiosErr.response?.data?.message ?? "Adding A Post Failed")
        }
    }

  return (
    <div className="container">
      <div className="row">
        <h2>Add Filler Post Form</h2>
          <form className="col s12" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column",gap:"10px" }}>
            <div className="input-field">
              <input id="start_date" type="date" className="datepicker" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setstart_date(e.target.value)}  />
              <label htmlFor="start_date">Start Date</label>
            </div>
            <div className="input-field">
              <input id="end_date" type="date" className="datepicker" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setend_date(e.target.value)} />
              <label htmlFor="end_date">End Date</label>
            </div>
            <div className="input-field">
              <input id="start_hour" type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setstart_hour(e.target.value)}/>
              <label htmlFor="start_hour">Start Work Hour</label>
            </div>
            <div className="input-field">
              <input id="end_hour" type="time" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setend_hour(e.target.value)}/>
              <label htmlFor="end_hour">End Work Hour</label>
            </div>
            <div className="input-field">
              <input id="place" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setplace(e.target.value)}/>
              <label htmlFor="place">Place - Location</label>
            </div>

            <div className="row">
                  <p className="col s6"> What is the Minimum Certification Needed? </p>
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
              <input id="crane_type" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setcrane_type(e.target.value)}/>
              <label htmlFor="crane_type">Crane Type</label>
            </div>
            <div className="input-field">
              <input id="payment" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setpayment(e.target.value)}/>
              <label htmlFor="payment">Payment</label>
            </div>
            <div className="input-field">
              <input id="extra_comments" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setextra_comments(e.target.value)}/>
              <label htmlFor="extra_comments">Extra Comments (Example: Workers team, Construction Type, Other Requirements, extra... )</label>
            </div>

            <input type="submit" value={"Submit Post!"} className="btn-large"/>
            {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default AddFillerPostForm



// WHEN ADDING POST
// {
//     "start_date":"2026-01-15",
//     "end_date":"2026-01-20",
//     "work_hours":"7:00-17:00",
//     "place":"Reshon Lezion - Shafdan",
//     "certification_needed": "B2 or greater",
//     "crane_type": "Crawler Crane with Hydraulic Boom ",
//     "payment": "1,300 per day",
//     "extra_comments": "Construction site by TIDHAR , the workers are profecitanls but speek only chinees"
// }