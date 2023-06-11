import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import PrivateRoute from './helper/PrivateRoute'
import { Link, Route, withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Swal from 'sweetalert2'
import Register from './Register'
import jwt_decode from 'jwt-decode'
import AddProduct from './AddProduct'
import Settings from './Settings'
import ProtectedRoute from './helper/ProtectedRoute'

const Navbar = (props) =>{
    const { handleIsLoggedIn, isLoggedIn } = props
    
    let role
    if(localStorage.getItem('token')){
        role = jwt_decode(localStorage.getItem('token')).role
    }

    const admin_Or_moderator = ['admin','moderator'].includes(role)

    return (
        <div>
            <div className="d-flex gap-4 bg-secondary-subtle p-4 shadow-lg">
                {isLoggedIn ? (
                    <>  
                        {admin_Or_moderator && <Link to="/product" className="text-decoration-none fs-5"> Add Product </Link>}
                        {role === "admin" && <Link to="/setting" className="text-decoration-none fs-5" > Settings </Link>}
                        <Link to="/dashboard" className="text-decoration-none fs-5"> DashBoard </Link>
                        <Link to="/login" onClick={()=>{
                            localStorage.removeItem('token')
                            handleIsLoggedIn()
                            Swal.fire('Successfully logged out')
                            props.history.push('/login') 
                        }} className="text-decoration-none fs-5"> Logout </Link> 
                    </>
                ) : (
                    <>
                        <Link to="/" className="text-decoration-none fs-5"> Register </Link>
                        <Link to="/login" className="text-decoration-none fs-5"> Login </Link>
                    </>
                )}
            </div>

            <Route path="/" component={Register} exact/>
            <Route path="/login" render={(props)=>{
                return <Login
                        {...props}
                        handleIsLoggedIn={handleIsLoggedIn} exact/>}
                } exact/> 
            <PrivateRoute path="/dashboard" component={Dashboard} exact/>
            <ProtectedRoute path="/product" permitted={role} component={AddProduct} exact/> 
            <ProtectedRoute path="/setting" permitted={role} component={Settings} exact/>
        </div>
    )
}

export default withRouter(Navbar)