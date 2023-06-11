import React, { useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

const Form = (props) =>{
    const {name:n, price:p, formSubmittion} = props
    const [name, setName] = useState(n ? n : '')
    const [price, setPrice] = useState(p ? p : '')
        
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            name:name,
            price:price
        }

        const reset = () =>{
            setName('')
            setPrice('')
        }
        formSubmittion(formData, reset)
    }

    const handleChange = (e) =>{  
        const name = e.target.name 
        if(name === "name"){
            setName(e.target.value)
        }else if(name === 'price'){
            setPrice(e.target.value)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            <div className="card p-4" style={{width:"25rem"}}>
                <form onSubmit={handleSubmit}>
                    <label> Name </label> <br/>
                    <input 
                        className="form-control"
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                    /><br/>
                    <label> Price </label> <br/>
                    <input 
                        className="form-control"
                        type="text"
                        value={price}
                        name="price"
                        onChange={handleChange}
                    /> <br/>
                    <input 
                        className="btn btn-primary"
                        type="submit" 
                        value={n ? "Edit" : "Add"}/>
                </form> 
            </div>
         </div>
    )
}

export default withRouter(Form)