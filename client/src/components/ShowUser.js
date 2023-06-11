import React, { useState } from 'react'
import axios from '../config/axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ShowUser = (props) =>{
    const {user, userRoleChange, modal, toggle} = props 

    const [role, setRole] = useState(user?.role)
            
    const handleChange = (e) =>{
        axios.put(`/api/users?id=${user._id}&text=${e.target.value}`,{},{   
            headers:{
                "Authorization":JSON.parse(localStorage.getItem('token'))
            }
        })
        .then((res)=>{
            userRoleChange(res.data)
            setRole(res.data.role)
        })
        .catch((err)=>{
            alert(err)
        })
    } 
    return (
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> User Name :<span className="text-danger fs-3"> {user.username} </span> </ModalHeader>
                    <ModalBody>
                        <div className="fs-4 d-flex justify-content-center">
                            <input 
                                type="radio"
                                value="customer"
                                name="role"
                                checked={role === "customer"}
                                className="m-2"
                                onChange={handleChange}
                            /> 
                            <label> Customer </label> <br/> 
                            <span className="px-3 fs-4"> | </span>
                            <input 
                                type="radio"
                                value="moderator"
                                name="role"
                                checked={role === "moderator"} 
                                className="m-2"
                                onChange={handleChange}
                            /> 
                            <label> Moderator </label> 
                        </div>
                    </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
    )
}

export default ShowUser