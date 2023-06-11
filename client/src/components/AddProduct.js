import React from 'react'
import axios from '../config/axios'
import Form from './Form'
import Swal from 'sweetalert2'

const AddProduct = (props) =>{

    const formSubmittion =(formData, reset)=>{
        reset()
        axios.post('/api/products',formData,{
            headers:{
                "Authorization":JSON.parse(localStorage.getItem('token'))
                }
            })
            .then((res)=>{
                const response = res.data
                console.log("res",res)
                if(response.hasOwnProperty('errors')){
                    alert(response.errors)
                }else{  
                    Swal.fire({
                        title:`"${response.name}" \n Added to Product Dashboard`
                    })
                    props.history.push('/dashboard')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h2 className="text-center my-5"> Add Product </h2>
            <Form 
                formSubmittion={formSubmittion}
            />
        </div>
    )
}

export default AddProduct