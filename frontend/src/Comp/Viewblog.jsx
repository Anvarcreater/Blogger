import { useContext, useEffect, useState } from "react"
import { GlobContext } from "../Global"
import { useParams } from "react-router-dom";
import Axios from "../Api";
import { Link } from "react-router-dom"

export const Viewblog = () => {
  const {Auth,setAuth,allblogs} = useContext(GlobContext);
  const [details,setDetails] = useState({});
  const [related,setRelated] = useState([]);
  const {id} = useParams();
  

  const getdetails = ()=>{
    Axios.get('/viewblog/'+id).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        setDetails(res.data.data);
        setRelated(res.data.relatedblogs);
      }else{
        console.log(res);
      }
    }).catch((err)=>{
       console.log(err);
    })
  }

//Axios.defaults.withCredentials = true;
  useEffect(()=>{
    Axios.get('/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAuth(true);
        }else{
          setAuth(false);
        }
     })
    },[setAuth]);
    
    useEffect(()=>{
      getdetails();
    },[details])
  return (
    <div>
        <div className="container ">
          <h3 className="text-center mt-3" style={{fontFamily:"sans-serif"}}>Blog Title :{details.title} </h3>
          <div className="view-content">
            { details.profilepic &&  (
              <img src={`${import.meta.env.VITE_BASE_URL }/public/images/${details.profilepic}`} alt="img" className="view-img mt-3"/>
            )}
              <p className="view-des mt-3"><span style={{fontWeight:"bold",fontSize:"25px"}}>Description:</span>{details.description}</p>
            </div>
        </div><br></br><br></br>
                <div className="container">
        <h3 className="text-center mb-3">Related  Blogs</h3>
        { related.length !== 0 ?
        <div>
            <div className="row row-cols-lg-4 myblogs">
              {
                related.map((element,index)=>(
                  <div className="col" key={index}>
                      <div className="card">
                          <img src={`${import.meta.env.VITE_BASE_URL }/public/images/${element.profilepic}`} alt="img" className="card-img-top cards-img"/>
                          <div className="card-body">
                              <h4 className="card-title">{element.title}</h4>
                              <Link to={`/viewpost/${element._id}`} className="btn btn-warning">View Blog</Link>
                          </div>
                      </div>
                  </div>
                ))
              } 
          </div> </div>:
          <div>
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Related Blogs ........!</p>
          </div>}
        </div>
    </div>
  )
}
