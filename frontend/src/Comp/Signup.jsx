import { useContext, useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobContext } from "../Global"
import Axios from '../Api';


export const Signup = () => {
   const navigate = useNavigate();
    const [msg,setmsg]=useState(false);
    const [message,setMessage]=useState();
    const {email,setEmail,password,setPassword,setAuth}=useContext(GlobContext);
    
    const handle= ()=>{
            Axios.post('/signup',{
                email,password
            }).then((res)=>{
                if(res.data.status){
                    console.log(res);
                    navigate('/login');
                }else{
                    console.log(res);
                    setmsg(true);
                    setMessage(res.data.message);
                    setTimeout(() => {
                        setmsg(false);
                    },3000);
                }
            }).catch((err)=>{
                console.log(err);
            })
    }
    useEffect(()=>{
     Axios.get('/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAuth(true);
          navigate('/');
        }else{
          console.log(res.data.message);
          setAuth(false);
          navigate('/signup');
        }
     })
  },[]);
  return (
    <div>
         <div className="container-fluid sign-con comp-cont">
            <h3 className="text-center">Signup</h3>
            { msg && <p className="text-center text-danger">{message}</p>}
            <div className="d-flex justify-content-center align-items-center">
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Your Email</label>
                    <input type="email" className="form-control mb-3 sigfield" autoComplete="off" id="email" name="email"
                     placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/>
                    <label className="form-label" htmlFor="password">Your Password</label>
                    <input type="password" className="form-control  mb-3 sigfield"id="password" name="password"
                     placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <input type="submit" value="Signup" className="signbtn mb-4" onClick={handle}/>
                    <div className="d-flex justify-content-between">
                        <p>Already have an Account ?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
