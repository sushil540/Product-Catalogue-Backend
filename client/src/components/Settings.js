import React, { useEffect, useState } from 'react'
import axios from '../config/axios'
import ShowUser from './ShowUser'

const Settings = (props) =>{
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)
    
    useEffect(()=>{
        axios.get("/api/users",{
            headers:{
                "Authorization":JSON.parse(localStorage.getItem('token'))
            }
        })
            .then((res)=>{
                const response = res.data 
                const data = response.filter((ele)=>ele.role === "customer" || ele.role === "moderator")
                setUsers(data)
            })
            .catch((err)=>{
                alert(err)
            })
    },[user])
    
    const userRoleChange = (data)=>{
        setUser(data)
    }

    const handleClickChange = async(id)=>{
        toggle()
        try{
            const user = await axios.get(`/api/users/${id}`,{headers:{"Authorization":JSON.parse(localStorage.getItem('token'))}})            
            if(user){
                setUser(user.data)
            }
        }
        catch(e){
            alert(e)
        }
    }

    return (
        <div className="container my-5">
            <table className="table table-bordered table-hover" border="2">
                <thead className="fs-2 text-center">
                    <tr>
                        <th> Name </th>
                        <th> Role </th>
                        <th> Change Role </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider fs-4">
                    {users.map((ele)=>{
                        return (
                            <tr key={ele._id}>
                                <td> {ele.username} </td>
                                <td className="text-center"> {ele.role} </td>
                                <td className="text-center"> <button 
                                        type="button"
                                        className="btn btn-secondary" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal"
                                        onClick={()=>{handleClickChange(ele._id)}}>
                                            Change 
                                    </button> 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {user.role 
                && <ShowUser 
                        user={user} 
                        toggle={toggle}
                        modal={modal} 
                        userRoleChange={userRoleChange}
                    />}
        </div>
    )
}

export default  Settings