import React,{useState} from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import validator from 'validator'

const Login = (props) =>{
    const { handleIsLoggedIn } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setErrors] = useState({})
    const errors = {}

    const handleValidation =()=>{
        if(email.length === 0){
            errors.email ={
                empty:"Email is required"
            }
        }else if(!validator.isEmail(email)){
            errors.email ={
                invalid:"Invalid Email"
            } 
        }

        if(password.length === 0){
            errors.password ={
                empty:"Password is required"
            }
        }
        setErrors(errors)
    }

    const handleSubmit =(e)=>{  
        e.preventDefault()

        handleValidation()

        if(Object.keys(errors).length === 0){

            const formData = {
                email:email,
                password:password
            }

            axios.post('/api/users/login', formData)
                .then((res)=>{
                    const response = res.data
                    if(response.hasOwnProperty('error')){
                        // alert(response.error)
                    }else{
                        localStorage.setItem('token', JSON.stringify(res.data.token))
                        handleIsLoggedIn()
                        props.history.push('/dashboard')
                        Swal.fire('Successfully logged In')
                    }
                })
                .catch((err)=>{
                    console.log("err",err)
                })
        }
    }

    const handleChange =(e) =>{
        const name = e.target.name
        if(name === "email"){
            setEmail(e.target.value)
        }else if(name === "password"){
            setPassword(e.target.value)
        }
    }

    return (
        <div className="card m-auto mt-5 p-4 shadow" style={{width:"25rem"}}>
            <h2 className="text-center"> Login </h2>
            <form onSubmit={handleSubmit}>
                <label> Email <sup className='text-danger fw-bold'>*</sup> </label> <br/>
                <input 
                    type="text"
                    value={email}
                    onChange={handleChange}
                    name="email"
                    className="form-control"
                    /> 
                    {Object.keys(error).length !== 0 
                        && 
                    <span className="text-danger"> 
                        {error?.email?.invalid || error?.email?.empty } 
                    </span>}

                    <br/>
                <label> Password <sup className='text-danger fw-bold'>*</sup> </label> <br/>
                <input
                    type="text"
                    name="password"
                    value={password}                     
                    onChange={handleChange}
                    className="form-control"
                /> 
                {Object.keys(error).length !== 0 
                        && 
                    <span className="text-danger"> 
                        {error?.password?.empty} 
                    </span>}
                <br/>
                    <input 
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                    />
           </form>
        </div>  
    )
}

export default Login