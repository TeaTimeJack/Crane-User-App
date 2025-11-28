import { useEffect} from 'react';
import type {FillerPostsType, UserTypeFromAPI} from '../../types/types.ts'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState, AppDispatch} from '../../app/store.ts'
import {fetchAllPosts} from './state/fillerPostsSlice.ts'
import FillerCard from "./components/FillerCard"
import {useNavigate} from 'react-router'

const FillerPosts = () => {
    const allPosts:FillerPostsType[]|null = useSelector((state: RootState)=>state.fillerPostsReducer.fillerPosts);
    const userInfo:UserTypeFromAPI|null = useSelector((state: RootState)=>state.userInfoReducer.info);
    const status = useSelector((state:RootState)=>state.fillerPostsReducer.status);
    const dispatch:AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(fetchAllPosts())
    }, []);
    // console.log(userInfo);
    if(status === "loading") return <h2> loading...</h2>;
    if(status === "failed") return <h2>OOPS...</h2>;
    
  return (
    <>
        <div className="col s12">
            <h2>Filler Posts</h2>
        </div>
        {
            userInfo&& <button className="btn" onClick={()=>navigate("/fillerPosts/addpost")}>Add Post</button>
        }
        <div className="row">
            {allPosts && allPosts.map(post =>{
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



