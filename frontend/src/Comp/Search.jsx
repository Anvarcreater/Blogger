import { useContext ,useEffect} from "react"
import { GlobContext } from "../Global"
import { Link, useNavigate ,useLocation} from "react-router-dom";
import Axios from "../Api";

export const Search = () => {
  const {result,setAuth,setResult} = useContext(GlobContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(()=>{
     Axios.get('/verify').then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          setAuth(true);
        }
     })
     if (query) {
      Axios.post("/search", { query })
        .then((res) => {
          if (res.data.status) {
            setResult(res.data.data);
          } else {
            setResult([]);
          }
        })
        .catch((err) => console.log(err));
    }
  },[query]);

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
              <p className="text-center text-secondary mt-5" style={{fontSize:"20px",fontFamily:"sans-serif"}}>No Match found........!</p>
          </div>}
        </div>
    </div>
  )
}
