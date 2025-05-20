import React,{useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Register = () => {

    const[StudentName,setStudentName]=useState("");
    const[StudentEmail,setStudentEmail]=useState("");
    const[password,setPassword]=useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

     await axios.post(`http://localhost:3000/insert`, {StudentName,StudentEmail,password});
    setStudentName("");
    setStudentEmail("");
    setPassword("");
    
  }
return(
    <>
    

       <form action="" onSubmit={handleSubmit} >
      
        <h1>Create account here</h1>
        <input 
        type="text"
         placeholder="enter student name"
         value={StudentName}
          required
        onChange={(e)=>setStudentName(e.target.value)}
         /><br/><br/>
<input 
type="email"
placeholder="ente student email"
value={StudentEmail}
required

onChange={(e)=>setStudentEmail(e.target.value)}
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