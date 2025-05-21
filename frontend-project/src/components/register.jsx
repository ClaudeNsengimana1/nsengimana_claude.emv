import React,{useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Register = () => {

    const[username,setUsername]=useState("");
    const[userEmail,setUserEmail]=useState("");
    const[password,setPassword]=useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

     await axios.post(`http://localhost:3000/insert`, {username,userEmail,password});
    setUsername("");
    setUserEmail("");
    setPassword("");
    
  }
return(
    <>
    

       <form action="" onSubmit={handleSubmit} >
      
        <h1>Create account here</h1>
        <input 
        type="text"
         placeholder="enter student name"
         value={username}
          required
        onChange={(e)=>setUsername(e.target.value)}
         /><br/><br/>
<input 
type="email"
placeholder="ente student email"
value={userEmail}
required

onChange={(e)=>setUserEmail(e.target.value)}
 /><br/><br/>

  <input 
      type="password"
      placeholder="enter your password"
      value={password}
       required
       onChange={(e)=>setPassword(e.target.value)}
/><br/><br/>

<button type="submit">Create</button>
<a href="/login">
  <button type="button">Login here</button>
</a>

        </form> 
   
    </>
)
    
}
export default Register;