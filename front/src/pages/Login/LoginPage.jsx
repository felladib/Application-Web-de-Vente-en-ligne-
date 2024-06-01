import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './LoginStyle.css'


const LoginPage = () => {
    //import the loginUser function that is in AuthContext.js
    let {loginUser} = useContext(AuthContext)
    return (

        <div className='container'>
            <div className='loginBox'>
                <form onSubmit={loginUser}>
                    <div className="logo">
                        <p>Noelle</p>
                    </div>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="submit" value="Login" />
                    <p className='signup'> Don't have an account ? <Link to="/signup">Create a free account</Link></p>

                </form>
            </div>
        </div>



        // <div className='container'>
           
            
        //     /* event handler : When the form is submited, we fire off the loginUser function 
        //     <div className='loginBox'>
        //         <form onSubmit={loginUser}>
        //             {/* <p>Login</p> */}
        //             <div className="logo">
        //                 <p>Noelle</p>
        //             </div>
        //             <p className='signup'> Don't have an account ? <Link to="/signup" >Create a free account</Link></p> 
        //             <input type="text" name="username" placeholder="Username" />
        //             <input type="password" name="password" placeholder="Password" />
        //             <input type="submit"/>
        //         </form>
        //     </div>
            
            // <div>
            //     <Link to="/signup" >Sign Up</Link>
            // </div> 
        // </div>
    )
}

export default LoginPage
