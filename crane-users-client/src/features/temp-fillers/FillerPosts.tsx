import { useEffect} from 'react';
import type {FillerPostsType, UserTypeFromAPI} from '../../types/types.ts'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from '../../app/store.ts'
import {fetchAllPosts} from './state/fillerPostsSlice.ts'
import {fetchUserInfo} from '../user-info/state/userInfoSlice.ts'
import FillerCard from "./components/FillerCard"
import {useNavigate} from 'react-router'

const FillerPosts = () => {
    const allPosts:FillerPostsType[]|null = useSelector((state: RootState)=>state.fillerPostsReducer.fillerPosts);
    const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info);
    const status = useSelector((state:RootState)=>state.fillerPostsReducer.status);
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();
    

     useEffect(()=>{
          dispatch(fetchUserInfo());
      },[dispatch])

    useEffect(() => {        
      dispatch(fetchAllPosts())
    }, []);
    // console.log(userInfo);
   
    if(status === "loading") return <h2> loading...</h2>;
    if(status === "failed"){
        const demoAllPosts = [{"post_id":10,"user_id":16,"start_date":"2025-12-20","end_date":"2025-12-23","work_hours":"08:00-18:00","place":"אשדוד","certification_needed":"B3","crane_type":"מנוף RT 100 טון גרוב","payment":"120 ש\"ח לשעה","extra_comments":"עבודת קידוחים עם חברת אריאל גבאי, צוות מעולה, אדמה בוצית","is_filler_found":false},{"post_id":11,"user_id":18,"start_date":"2026-02-13","end_date":"2026-02-20","work_hours":"07:30-17:30","place":"haifa","certification_needed":"B1","crane_type":"RT Terex 20T","payment":"1,000 per day","extra_comments":"unloading trucks that come to the construction site - one worker who assists you","is_filler_found":false},{"post_id":1,"user_id":9,"start_date":"2026-01-15","end_date":"2026-01-20","work_hours":"7:00-17:00","place":"Reshon Lezion - Shafdan","certification_needed":"B2","crane_type":"Crawler Crane with Hydraulic Boom ","payment":"1,300 per day","extra_comments":"Construction site by TIDHAR , the workers are profecitanls but speek only chinees","is_filler_found":false}]
      return (
        <>
        <h2>OOPS... Server is ofline... </h2>
        <h3>This is the Demo Version:</h3>
        <div className="col s12">
            <h2>Filler Posts</h2>
        </div>
        <div className="row">
            {demoAllPosts && 
             demoAllPosts.map(post =>{
                return (
                        <div className="col s12 l6" key={post.post_id}>
                            <FillerCard postInfo={post}/>
                        </div>
                )
            })}
        </div>
        </>
      );
    } 
    
  return (
    <>
        <div className="col s12">
            <h2>Filler Posts</h2>
        </div>
        {
            userInfo&& <button className="btn" onClick={()=>navigate("/fillerPosts/addpost")}>Add Post</button>
        }
        <div className="row">
            {allPosts && 
             allPosts.map(post =>{
                return (
                        <div className="col s12 l6" key={post.post_id}>
                            <FillerCard postInfo={post}/>
                        </div>
                )
            })}
        </div>
    </>
  )
}

export default FillerPosts



