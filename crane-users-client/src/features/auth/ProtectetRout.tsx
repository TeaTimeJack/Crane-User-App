// import {useAuth} from './useAuth';
// import {useEffect} from 'react'

// const ProtectetRout = ({children}) => {
//     const {isAuthenticated, refreshToken} = useAuth()

//     useEffect(() => {
//        refreshToken();
//     }, [])
    
   

//     if(!isAuthenticated){
//         return (<h2>User Not logged in</h2>)
//     }
//   return children;
// }

// export default ProtectetRout


import {useEffect } from 'react';
import type {ReactNode} from 'react'
import { useAuth } from './useAuth'; 


interface ProtectedRouteProps {
    children: ReactNode; 
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, refreshToken } = useAuth();

    useEffect(() => {
        refreshToken(); 
    }, [refreshToken]); 
    
    if (!isAuthenticated) {
        return (<h2>User Not logged in</h2>);
    }
    
    return children;
}

export default ProtectedRoute;