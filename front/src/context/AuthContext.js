import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;
//The information we want to be available throughout the entire application

export const AuthProvider = ({children}) => {
    //To get the authentication tokens from the local storage
    // [The value of that state, the way to update it] : check if the token is in the local storage, if yes return it else set authTokens to null
    // () => : we use the function so that the value will only be set once in the initial load and it won't call it everytime (nrmlm everytime we refresh the page)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    //To get the user information from the tokens in the local storage
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null) 
    //When the page is first loaded, we want to trigger this and make sure we have a new token generated
    let [loading, setLoading] = useState(false) //We are loading the page in the fist load

    const history = useNavigate()

    //Login function
    let loginUser = async (e) => { //Asyn bc we will use await
        //e = event
        e.preventDefault() //This is to prevent the default actions (it would normally send a request and refresh)
        //We want our function to handle all of it

        //fetch : returns the values of the tokens
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                //To get the token, the endpoint (api/token) need the type application/json
                /*which is :
                {
                    "username": ""
                    "password": ""
                }*/
                //Here we're telling the backend that this is json data,
                // we are just specifiying thetype of information that we are sending
                'Content-Type':'application/json'
            },
            //body = the data we are sending to the backend
            //JSON.stringify : turning the data into a string
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
            // e.target.username.value
            //target : is the form
            //.username.value : we are getting the value of username (username is the "name=" we gave in the html input )
        })
        //We should get back a response with an access and refresh token
        let data = await response.json()
        console.log(data)
        //check if everything goes good
        if(response.status === 200){
            setAuthTokens(data) //Set the tokens to "data"
            console.log(authTokens)
            //Store the data in our state
            //if we set it in our state, we can access the information 
            //and check if we're logged in through different routes in our application
            //like in the PrivateRoute 

            setUser(jwtDecode(data.access)) //Like in the jwt.io the access token here is decoded and the user information is stored
           
            //Store the "data" in the local storage (authTokens = acces and refresh token)
            localStorage.setItem('authTokens', JSON.stringify(data))
            setLoading(true)
            history('/')
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        //Change the state of the authTokens and the user
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens') //Remove the local storage
        history('/login') //Redirect the user to the login page
    }

    // Update AuthContext.js
    let signupUser = async (userData) => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.status === 201) {
                let data = await response.json();
                setAuthTokens(data); // Set tokens received from backend
                // Store tokens in local storage
                localStorage.setItem('authTokens', JSON.stringify(data));
                // Fetch user information from tokens and update state
                setUser(jwtDecode(data.access));
                // Redirect to home page or any other desired route
                history('/');
            } else if (response.status === 400) {
                let errorData = await response.json();
                console.log(errorData); // Log errorData to inspect the response
                if (errorData.error === 'UNIQUE constraint failed: auth_user.username') {
                    alert('Username already exists. Please choose a different username.');
                } else {
                    console.error('Signup failed');
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }


    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){//If everything is fine
            //Update the state, the user state and the local storage
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser() //If something wen wrong we go to the logout method
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
    }


    useEffect(()=> { //For the life cycle effect
        //
        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> { //It returns an id
            if(authTokens){ //If we have some tokens
                updateToken() //Try to refresh these tokens (update them)
            }
        }, fourMinutes) //The function is called every four minutes
        return ()=> clearInterval(interval) //we clear it so that it runs only once each cycle (so that setInterval don't go into an infinit loop. See documentation for more information)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
