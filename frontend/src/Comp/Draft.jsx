import { useContext } from "react"
import { GlobContext } from "../Global";
import { Link} from "react-router-dom"
import { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";

export const Draft = () => {
  const {myblogs,getmyblogs,draft} = useContext(GlobContext);
  const [publish,setPublish] = useState(true);
  
  
  const handlepublish = (id)=>{
        Axios.put(`http://localhost:3000/publish/${id}`,{publish}).then((res)=>{
          if (res.data.status){
            console.log(res.data.message);
           setPublish(false);
           getmyblogs();
          }else{
            console.log(res.data.error);
          }
        }).catch((err)=>{
          console.log(err);
        })
  }
  
  const handledelete = (id)=>{
        Axios.delete(`http://localhost:3000/deleteblog/${id}`).then((res)=>{
          if (res.data.status){
            console.log(res.data.messagge);
            getmyblogs();
          }else{
            console.log(res.data.message);
          }
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className="comp-cont">
        { draft.length !== 0 ?
        <div>
          <h3 className="text-center">My Draft</h3>
            <div className="row row-cols-lg-4 myblogs">
              {
                draft.map((element,index)=>(
                  <div className="col" key={index}>
                      <div className="card">
                          <img src={`http://localhost:3000/public/images/${element.profilepic}`} alt="img" className="card-img-top cards-img"/>
                          <div className="card-body">
                              <h4 className="card-title">{element.title}</h4>
                            <Link to={`/viewpost/${element._id}`} className="btn btn-warning">View Blog</Link>
                                  <div className="btn-group dropend">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      Action
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li className="btn-grp"><button onClick={()=>{handledelete(element._id)}} className="btn btn-danger">delete</button></li>
                                      <li className="btn-grp"><button onClick={()=>{handlepublish(element._id)}} className="btn btn-warning">publish</button></li>
                                    </ul>
                                  </div>

                          </div>
                      </div>
                  </div>
                ))
              } 
          </div> </div>:
          <div>
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No draft yet Created........!</p>
          </div>}
        </div>
    </div>
  )
}
