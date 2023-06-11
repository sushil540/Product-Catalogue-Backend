import React,{useState} from 'react'
import axios from '../config/axios'
import validator from 'validator'
import { Link } from 'react-router-dom'

const Register = (props) =>{
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleValidation = () =>{
        if(username.trim().length === 0) {
            errors.name = {
                empty:"Username is required"
            }
        }

        if(email.length === 0){
            errors.email = {
                empty:"Email is required"
            }
        }else if(!validator.isEmail(email)){
            errors.email = {
                invalid:"Invalid Email"
            }
        }

        if(password.length === 0){
            errors.password = {
                empty:"Password is required"
            }
        }
        setFormErrors(errors)
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        handleValidation()

        if(Object.keys(errors).length === 0){
            const formData = {
                username:username,
                email:email,
                password:password,
            }

            axios.post('/api/users/register',formData)
                .then((res)=>{
                    const response = res.data
                    if(response.hasOwnProperty('errors')){
                        // alert(response.message)
                    }else{
                        props.history.push('/login')
                    }
                })
                .catch((err)=>{
                    console.log("err",err)
                })
        }
    }

    const handleChange = (e)=>{
        const name = e.target.name
        if(name === "username"){
            setUserName(e.target.value)
        }else if(name === "email"){
            setEmail(e.target.value)
        }else if(name === "password"){
            setPassword(e.target.value)
        }
    }

    return (
        <div className="card p-4 mt-5 m-auto shadow-lg" style={{width:"30rem"}}> 
            <h1 className="text-center"> Register </h1>
            <form onSubmit={handleSubmit}>
               <label> Username <sup className='text-danger fw-bold'>*</sup> </label> <br/>
               <input 
                    type="text"
                    value={username}
                    onChange={handleChange}
                    className="form-control"
                    name="username"
                    /> 
                    {Object.keys(formErrors).length !== 0 
                            && 
                        <span className="text-danger"> 
                            {formErrors?.name?.empty} 
                        </span>
                    }
                    <br/>
               <label> Email 
                    <sup className='text-danger fw-bold'>*</sup> 
                </label> <br/>
               <input 
                    type="text"
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                    name="email"
                    /> 
                    {Object.keys(formErrors).length !== 0 
                                && 
                        <span className="text-danger"> 
                            {formErrors?.email?.empty || formErrors?.email?.invalid} 
                        </span>
                    }
                    <br/>
               <label> Password 
                    <sup className='text-danger fw-bold'>*</sup> 
                </label> <br/>
               <input 
                    type="text"
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                    name="password"
                    />
                    {Object.keys(formErrors).length !== 0 
                            && 
                        <span className="text-danger"> 
                            {formErrors?.password?.empty} 
                        </span>
                    }
                    <br/>
                <div className="d-flex justify-content-around">
                    <input
                        type="submit" 
                        value="Register"
                        className="btn btn-primary" 
                        />
                    <span className="text-end"> 
                        already have an account? <Link to="/login" className="text-primary text-decoration-none">login</Link> 
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Register