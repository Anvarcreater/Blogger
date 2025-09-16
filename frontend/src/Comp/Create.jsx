import { useContext, useEffect, useState } from "react"
import Axios from "axios";
import { GlobContext } from "../Global";


export const Create = () => {
  const {getmyblogs,myblogs,getallblogs} = useContext(GlobContext);
    const [title,setTitle]= useState("");
    const [category,setCategory] = useState("");
    const [profilepic,setProfilepic] = useState("");
    const [description,setDescription] = useState("");
    const [message,setMessage] = useState("");
    const [msg,setMsg] = useState(false);
    

    Axios.defaults.withCredentials = true;
    const createblogs = ()=>{
        const formdata = new FormData();
        formdata.append('file',profilepic);
        formdata.append('title',title);
        formdata.append('category',category);
        formdata.append('description',description);
        Axios.post('http://localhost:3000/createblog',formdata,{
  headers: { "Content-Type": "multipart/form-data" }}).then((res)=>{
            if(res.data.status){
                console.log(res);
                setMessage(res.data.message);
                setMsg(true);
                setTimeout(()=>{
                    setMsg(false);
                },2000);
                setTitle("");
                setCategory("");
                setDescription("");
                getmyblogs();
                getallblogs();
            }
        }).catch((err)=>{
            console.log(err);
        })
  }
  return (
    <div>
        <div className="total-count mt-3">
          <div className="tot-p">
              <p>Total blogs</p>
              <p>{myblogs.length}</p>
          </div>
        </div>
        <div className="create-post-con mb-3 mt-3">
            <h2>Create New Blog</h2>
            {msg && <p className="text-center text-success">{message}</p>}
            <div className="form-group mt-3 create-post-con">
                <div className="row create-h-pad">
                    <div className="col-lg-7">
                        <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control create-post-w" />
                    </div>
                    <div className="col-lg-5">
                        <input type="text" placeholder="Enter category" value={category} onChange={(e)=>{setCategory(e.target.value)}} className="form-control create-post-w" />
                    </div> 
                </div><br></br>
                <div>
                    <input type="file" onChange={e=> setProfilepic(e.target.files[0])} className="form-control"/><br></br>
                    <textarea className="form-control create-post-w" value={description} onChange={(e)=>{setDescription(e.target.value)}} style={{height:"200px"}} placeholder="Enter post description"></textarea><br></br><br></br>
                    <button type="submit" className="create-post-btn create-post-w" onClick={createblogs}>Create Post</button>
                </div>
            </div>
        </div>
    </div>
  )
}
