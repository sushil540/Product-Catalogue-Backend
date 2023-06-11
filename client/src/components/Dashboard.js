import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import EditProduct from './EditProduct'
import ProductShow from './ProductShow'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'

const Dashboard = (props) =>{
    const [products, setProducts] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [show, setShow] = useState({})
    const [isHover, setIsHover] = useState(false)

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const role = jwt_decode(JSON.parse(localStorage.getItem('token'))).role

    const admin_Or_Moderator = ['admin','moderator'].includes(role)

    useEffect(()=>{
        axios.get('/api/products',{
            headers:{
                "Authorization":JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((res)=>{
                setProducts(res.data)
            })
            .catch((err)=>{
                console.log("err",err)
            })
    },[isEdit])

    const handleRemove =(id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              axios.delete(`/api/products/${id}`,{
                headers:{
                    "Authorization":JSON.parse(localStorage.getItem('token'))
                }
                })
                .then((res)=>{
                    const data = products.filter((ele)=>ele._id !== res.data._id)
                    setProducts(data)
                })
                .catch((err)=>{
                    console.log("err",err)
                })
            }
          })
    }

    const handleShow = (id) =>{
        toggle()
        axios.get(`/api/products/${id}`,{
            headers:{
                "Authorization":JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((res)=>{
                const data = res.data
                setShow(data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const handleEditToggle = ()=>{
        setIsEdit(!isEdit)
    }

    const handleEdit = (ele)=>{
        setShow(ele)
        setIsEdit(!isEdit)
    }

    const handleAdd = () =>{
        props.history.push('/product')  
    }

    const handleIsHover = ()=>setIsHover(!isHover)

    return (
        <div className="container">
            <div className="row gap-4">
                <h1 className="text-center display-4 my-4"><u> Product Dashboard </u></h1>
                       {admin_Or_Moderator && <div 
                            className="card p-3 fs-2 fw-bold gap-2 d-flex justify-content-center align-items-center" 
                            style={
                                {
                                    width:"18rem",
                                    cursor:"pointer",
                                    border:"none",
                                    transition:"1.8s",
                                    boxShadow: isHover? "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px" : "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                                }
                            }
                            onMouseEnter={handleIsHover}
                            onMouseLeave={handleIsHover}
                            onClick={handleAdd}>
                                    +   
                        </div>}
                    {products.map((ele)=>{
                        return <div
                                    className="card p-3 gap-2 col-md-4"
                                    key={ele._id} style={{width:"18rem"}}>  
                                        <h2> {ele.name} </h2>
                                        <hr/>
                                        <p> Price - {ele.price} </p>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-info rounded-3" 
                                            onClick={()=>{handleShow(ele._id)}}>
                                                View
                                        </button>
                                       {admin_Or_Moderator && <button 
                                            className="btn btn-primary rounded-3" 
                                            onClick={()=>{handleEdit(ele)}}>
                                                Edit
                                        </button>}
                                        {role === "admin" && <button 
                                            className="btn btn-danger rounded-3"
                                            onClick={
                                                ()=>{handleRemove(ele._id)}
                                            }>
                                            Remove
                                        </button>}
                                    </div>  
                            </div>
                    })}
                    {isEdit && <div className="card p-3 shadow-lg position-absolute top-50 start-50 translate-middle bg-body-tertiary" 
                                    style={{width:"20rem"}}>
                                <EditProduct
                                    data={show}
                                    handleEditToggle={handleEditToggle}/>
                                </div>}
                        </div>
                <ProductShow 
                    product={show}
                    toggle={toggle}
                    modal={modal}
                />
            </div>
    )
}

export default Dashboard