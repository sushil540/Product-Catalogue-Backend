import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min"

const ProtectedRoute = ({component:Component, ...rest})=>{
    const {path, permitted} = rest
    return (
        <Route
            {...rest}
            render = {(props)=>{
                if(path === "/product"){
                    return (
                        localStorage.getItem("token") && ["admin", "moderator"].includes(permitted)?
                        (
                            <Component {...props}/>
                        ):(
                            <Redirect
                                to = {{
                                    pathname:"/dashboard"
                                }}
                            />
                        )
                    )
                }else if(path === "/setting"){
                    return (
                        localStorage.getItem("token") && permitted === "admin"?
                        (
                            <Component {...props}/>
                        ):(
                            <Redirect
                                to = {{
                                    pathname:"/dashboard"
                                }}
                            />
                        )
                    )
                }
            }}
        />
    )
}

export default ProtectedRoute