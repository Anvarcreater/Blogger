import { useContext ,useEffect} from "react"
import { GlobContext } from "../Global"
import { Link } from "react-router-dom";
import Axios from "axios";

export const Search = () => {
  const {result,setAuth} = useContext(GlobContext);
  return (
    <div>
      <div className="container comp-cont">
        { result.length !== 0 ?
        <div>
          <h3 className="text-center mb-3">search results</h3>
            <div className="row row-cols-lg-4 myblogs">
              {
                result.map((element,index)=>(
                  <div className="col" key={index}>
                      <div className="card">
                          <img src={`http://localhost:3000/public/images/${element.profilepic}`} alt="img" className="card-img-top cards-img"/>
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
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Match found........!</p>
          </div>}
        </div>
    </div>
  )
}
