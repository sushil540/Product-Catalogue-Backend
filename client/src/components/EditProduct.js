import React from 'react'
import axios from '../config/axios'
import Form from './Form'
import Swal from 'sweetalert2'

const EditProduct = (props) =>{
    const { data, handleEditToggle } = props

    const formSubmittion = (formData, reset) =>{
        reset()
        axios.put(`/api/products/${data._id}`,formData,{
            headers:{
                "Authorization":JSON.parse(localStorage.getItem('token'))
            }
        })
        .then((res)=>{
            const response = res.data
            if(response.hasOwnProperty('errors')){
                alert(response.errors)
            }
            Swal.fire(`${response.name} \n has been successfully edited`)
            handleEditToggle()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>   
            <h2 className="text-center"> Edit Product </h2> 
            <Form 
                {...data} 
                formSubmittion={formSubmittion}
            />
        </div>
    )
}

export default EditProduct