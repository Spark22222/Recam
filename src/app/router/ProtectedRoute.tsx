import { Navigate, Outlet } from "react-router"
import type { User, UserRole } from "../../types/auth"
import { getCurrentUser, isAuthenticated } from "../../utils/authStorage"

interface ProtectedRouteProps{
    allowedRoles?:UserRole[]
    redirectPath?:string
}

const ProtectedRoute = ({allowedRoles,redirectPath='/login'}:ProtectedRouteProps) =>{
    const currentUser:User | null = getCurrentUser()
    const loggedIn = isAuthenticated()
    if(!currentUser || !loggedIn){
        return <Navigate to='/login' replace />
    }

    if(allowedRoles && !allowedRoles.includes(currentUser.role)){
        return <Navigate to={redirectPath} replace />
    }
    
    return <Outlet />
}

export default ProtectedRoute