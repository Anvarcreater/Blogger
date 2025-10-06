import { useContext } from "react"
import { GlobContext } from "../Global";
import { Link} from "react-router-dom"
import Axios from "../Api";
import { useEffect } from "react";

export const Myblogs = () => {
    const {myblogs,fetchmyblogs} = useContext(GlobContext);

    const handledelete = (id)=>{
        Axios.delete(`/deleteblog/${id}`).then((res)=>{
          if (res.data.status){
            console.log(res.data.messagge);
            fetchmyblogs();
          }else{
            console.log(res.data.message);
          }
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div>
      <div className="">
        { myblogs.length !== 0 ?
        <div>
          <h3 className="text-center">My Blogs</h3>
            <div className="row row-cols-lg-4 myblogs">
              {
                myblogs.map((element,index)=>(
                  <div className="col" key={index}>
                      <div className="card">
                          <img src={`${import.meta.env.VITE_BASE_URL }/public/images/${element.profilepic}`} alt="img" className="card-img-top cards-img"/>
                          <div className="card-body">
                              <h4 className="card-title">{element.title}</h4>
                               <Link to={`/viewpost/${element._id}`} className="btn btn-warning">View Blog</Link>
                                <div class="btn-group dropend">
                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      Action
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li className="btn-grp ms-2 "><Link to={`/update/${element._id}`} className="btn btn-primary">update</Link></li>
                                      <li className="btn-grp ms-2"><button className="btn btn-danger"onClick={()=>{handledelete(element._id)}}>delete</button></li>
                                    </ul>
                                </div>
                            
                          </div>
                      </div>
                  </div>
                ))
              } 
          </div> </div>:
          <div>
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Blogs yet Created........!</p>
          </div>}
        </div>
    </div>
  )
}
