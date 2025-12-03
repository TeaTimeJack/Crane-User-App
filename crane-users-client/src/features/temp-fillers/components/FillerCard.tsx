import type {FillerPostsType, UserTypeFromGetByID,UserTypeFromAPI} from '../../../types/types.ts'
import {formatDate, capitalizeFirstLetter} from "../../../app/helpers.ts"
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import type {RootState} from '../../../app/store.ts'
import axios from "axios";

const FillerCard = (props:{ postInfo: FillerPostsType }) => {
    const {post_id, user_id, start_date, end_date,work_hours, place, certification_needed, crane_type, payment, extra_comments, is_filler_found} = props.postInfo;
    const [user, setUser] = useState<UserTypeFromGetByID>()
    const loggedUserInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info);
    const [isFound, setisFound] = useState(is_filler_found)

    const handleDeletePost = async ()=>{
        // `http://localhost:5005/api/fillerposts/remove/${post_id}`
        try {
             await axios.delete(import.meta.env.VITE_BASE_URL+`/fillerposts/remove/${post_id}`,{
                withCredentials: true,
             });
        } catch (error) {
            console.log(error);
        } 
    }

    // import.meta.env.VITE_BASE_URL+`/fillerposts/togglefound/${post_id}`

    const togglefoundPost =async ()=>{
        try {
             await axios.put(import.meta.env.VITE_BASE_URL+`/fillerposts/togglefound/${post_id}`,{
                withCredentials: true,
             });
        } catch (error) {
            console.log(error);
        }
        setisFound(!isFound)
    }

// import.meta.env.VITE_BASE_URL+`/user/getuser/${user_id}`
    useEffect(() => {
      const fetchUserInfo =async ()=>{
        const userResponse = await fetch(import.meta.env.VITE_BASE_URL+`/user/getuser/${user_id}`);
        const userInfo = await userResponse.json();
        // console.log("User:",userInfo);
        setUser(userInfo)
      };
      fetchUserInfo();
    //   console.log("logeged user: ", loggedUserInfo);
    }, [])
    
    if(status === "loading") return <h2> loading...</h2>;
    if(status === "failed") return <h2>OOPS...</h2>;

  return (
        <div className="card blue-grey darken-1">
            <div className="card-content activator white-text">
                <span className="card-title ">{formatDate(start_date)} - {formatDate(end_date)}</span>
                <table>
                    <tbody>
                        <tr>
                            <td><i className="material-icons prefix">access_time</i></td>
                            <td>{work_hours}</td>
                        </tr>
                        <tr>
                            <td><i className="material-icons prefix">location_on</i></td>
                            <td>{place}</td>
                        </tr>
                        <tr>
                            <td><i className="material-icons prefix">folder_shared</i></td>
                            <td>{certification_needed}</td>
                        </tr>
                        <tr>
                            <td><i className="material-icons prefix">event_seat</i></td>
                            <td>{crane_type}</td>
                        </tr>
                        <tr>
                            <td><i className="material-icons prefix">attach_money</i></td>
                            <td>{payment}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-reveal">
                {user? (
                    <>
                        <span className="card-title grey-text text-darken-4">{capitalizeFirstLetter(user.first_name)} {capitalizeFirstLetter(user.last_name)}<i className="material-icons right">close</i></span>
                        <table>
                            <tbody>
                                <tr>
                                    <td><i className="material-icons prefix">phone</i></td>
                                    <td>{user.phone_number}</td>
                                </tr>
                                <tr>
                                    <td><i className="material-icons prefix">email</i></td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td><i className="material-icons prefix">comment</i></td>
                                    <td>{extra_comments}</td>
                                </tr>
                            </tbody>
                        </table>
                    </> 
            ):(
                <>
                <span className="card-title grey-text text-darken-4">No Name<i className="material-icons right">close</i></span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </>
            )}
                
            </div>
            {loggedUserInfo && user && loggedUserInfo.id === user.id ?(
                <div className="card-action">
                    <a>EDIT POST</a>
                    <a onClick={()=>handleDeletePost()}>DELETE POST</a>
                    {isFound?(
                        <a onClick={()=>togglefoundPost()} className="btn-floating green"><i className="material-icons">assistant_photo</i></a>
                    ):(
                        <a onClick={()=>togglefoundPost()} className="btn-floating red"><i className="material-icons">assistant_photo</i></a>   
                    )}
                </div>
            ):(
                <div className="card-action">
                    <a className="activator">Operator Details</a>
                    {isFound?(
                        <a className="btn-floating green"><i className="material-icons">assistant_photo</i></a>
                    ):(
                        <a className="btn-floating red"><i className="material-icons">assistant_photo</i></a>   
                    )}
                </div>
            )}
        </div>
  )
}

export default FillerCard
