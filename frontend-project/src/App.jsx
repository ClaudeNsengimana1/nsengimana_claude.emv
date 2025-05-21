
import React ,{useEffect}from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Report from './components/report';
import Home from './components/home';
import axios from 'axios';

const App = () =>{
const checkLogin=()=>{
    axios.get(`http://localhost:3000/check,{withCredentials:true}`)
    .then((response) => {
      if (response.data.loggedIn === true) {
        console.log("User is logged in");
      } else {
        console.log("User is not logged in");
      }
    })  
}
useEffect(() => {
  checkLogin();
}, []); // Empty dependency array to run only once on mount


return(


<>
<Router>
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/login" element={<Login />} />
     <Route path="/report" element={<Report/>} />
      <Route path="/home" element={<Home />} />
  </Routes>
</Router>
</>


)
}
export default App;