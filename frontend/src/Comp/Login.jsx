import { Link,useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GlobContext } from "../Global"
import Axios from 'axios';

export const Login = () => {
  const Navigate = useNavigate();
  const [msg,setmsg]=useState(false);
  const [message,setMessage]=useState();
  const {email,setEmail,password,setPassword,setAuth}=useContext(GlobContext);
  
  Axios.defaults.withCredentials=true;
  const handle= ()=>{
            Axios.post('http://localhost:3000/login',{
                email,password
            }).then((res)=>{
                if(res.data.status){
                    console.log(res);
                    setAuth(false);
                    Navigate('/');
                }else{
                    console.log(res);
                    setMessage(res.data.message);
                    setmsg(true);
                    setTimeout(() => {
                        setmsg(false);
                    },2000);
                }
            }).catch((err)=>{
                console.log(err);
            })
  }
   Axios.defaults.withCredentials = true;
  useEffect(()=>{
     Axios.get('http://localhost:3000/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAuth(true);
          Navigate('/');
        }else{
          console.log(res.data.message);
          setAuth(false);
          Navigate('/login');
        }
     })
  },[]);
  return (
    <div>
        <div className="container-fluid sign-con comp-cont">
            <h3 className="text-center">Login</h3>
            { msg && <p className="text-center text-danger">{message}</p>}
            <div className="d-flex justify-content-center align-items-center">
                <div className="form-group">
                    <label className="form-label">Your Email</label>
                    <input type="email" className="form-control sigfield" id="email" autoComplete="off" name="email"
                     onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"required/><br></br>
                    <label className="form-label">Your Password</label>
                    <input type="password" className="form-control sigfield" id="password" name="password"
                     onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required/><br></br>
                    <input type="submit" value="Login" onClick={handle} className="signbtn"/><br></br><br></br>
                    <div className="d-flex justify-content-between">
                        <p>Dont you have an Account ?</p>
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
