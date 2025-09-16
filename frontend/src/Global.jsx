import {createContext, useEffect, useState} from 'react'
//import PropTypes from 'prop-types';
import Axios from 'axios';
import { useNavigate } from "react-router-dom"
export const GlobContext =createContext(null);

export const Global = ({children}) => {
  const [Auth,setAuth] = useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const Navigate= useNavigate();
    const [myblogs,setMyblogs] = useState([]);
    const [allblogs,setAllblogs]= useState([]);
    const [result,setResult] = useState([]);
    const [draft,setdraft] = useState([]);

    useEffect(()=>{
       getmyblogs();
    },[Auth]);

   

  Axios.defaults.withCredentials=true;
  const getmyblogs= ()=>{
     Axios.get('http://localhost:3000/getmyblogs').then((res)=>{
        if(res.data.status){
           console.log(res.data.message);
           setMyblogs(res.data.data);
           setdraft(res.data.mydraft);
        }
     }).catch((err)=>{
        console.log(err);
     })
  }

  const getallblogs = ()=>{
     Axios.get('http://localhost:3000/getallblogs').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAllblogs(res.data.data);
        }
     }).catch((err)=>{
        console.log(err);
     })
  }
useEffect(()=>{
  getallblogs();
},[]);

    const logout=()=>{
      Axios.post('http://localhost:3000/logout').then((res)=>{
          if(res.data.status){
              console.log(res);
              setAuth(false);
              Navigate('/login');
          }
      }).catch((err)=>{
          console.log(err);
      })
  }
  return (
    <GlobContext.Provider value={{Auth,setAuth,email,setEmail,password,setPassword,logout,
      myblogs,getmyblogs,allblogs,getallblogs,result,setResult,draft}}>
      {children}</GlobContext.Provider>
  )
}


// Global.propTypes={
//     children:PropTypes.node.isRequired,
//   };
