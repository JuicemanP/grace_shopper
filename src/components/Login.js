import { useState } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../BaseURL"
import { useHistory } from "react-router"
const Login = ()=>{
    
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

const [errorMessage,setErrorMessage]=useState("")
const history = useHistory()
const handlesubmit= async (e)=>{
    e.preventDefault()
    console.log(username,password)

    const response = await fetch(`${BASE_URL}/users/login`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
        username,
        password
        })
      })
      const info=await response.json()
      console.log(info)
      if (info.error){
          setErrorMessage(info.error);
          return
      }
      
      localStorage.setItem("token",info.token)
     history.push("/")
    }

return <div>
<form onSubmit={handlesubmit}>

    <div>
        <label/>
            Username:
        <div>
            <input type ="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            />
        </div>
    </div>
    <div>
        <label/>
            Password:
        <div>
            <input type ="password"
            value ={password}
            onChange ={(e)=>setPassword(e.target.value)}
            minLength = {"8"}
            required
            />
        </div>
    </div>
    
    <div>
       <div>
       <button>Login</button>
       </div>
       <div>
           <Link to = "/Register">Don't Have An Account? Register Here!</Link>
       </div>
    </div>
    <div>
        <p>
            {errorMessage}
        </p>
    </div>
</form>
</div>
    }
    export default Login