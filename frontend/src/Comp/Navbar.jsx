import { Link, useNavigate} from "react-router-dom"
import { FaSearch} from "react-icons/fa";
import {useContext, useState} from 'react'
import { GlobContext } from "../Global";
import Axios from "../Api";

export const Navbar = () => {
  const {Auth,logout,setResult}=useContext(GlobContext);
    const navigate = useNavigate();
    const [query,setQuery] = useState('');
   const handlesearch =()=>{
        if (!query.trim()) return; // prevent empty search
        navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  return (
    <div>
         <div className="navbar navbar-expand-lg ">
            <div className="container"> 
                <h1 className="navbar-brand">Bloggers</h1>
                <div className="search">
                    <div className="form-group d-flex">
                        <input type="search" className="form-control "onChange={(e)=>{setQuery(e.target.value)}} placeholder="search"/>
                        <button type="submit" onClick={handlesearch} className="btn bg-white "> <FaSearch/> </button>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                <span className="navbar-toggler-icon"> </span></button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link to="/" className="nav-link  ">Home</Link></li>
                        <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs</Link></li>
                        {!Auth &&
                            <>
                                <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
                                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                            </> 
                            }  
                        { Auth &&
                            <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                        }  
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
