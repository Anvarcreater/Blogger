import { useContext, useEffect, useState } from "react"
import Axios from "../Api";
import { GlobContext } from "../Global";
import { useRef } from "react";


export const Create = () => {
  const {fetchmyblogs ,myblogs, fetchallblogs} = useContext(GlobContext);
    const [title,setTitle]= useState("");
    const [category,setCategory] = useState("");
    const [profilepic,setProfilepic] = useState("");
    const [description,setDescription] = useState("");
    const [message,setMessage] = useState("");
    const [msg,setMsg] = useState(false);
    const [status,setStatus]=useState(true);    
    const fileInputRef = useRef();

    //Axios.defaults.withCredentials = true;
    const createBlog = ()=>{
        // checks whether it is a file and it is provided or not
        if (!profilepic || !(profilepic instanceof File)) {
            setMessage("Input fields should not be empty...! and Please upload a valid image file");
            setMsg(true);
            return;
        }
        const formdata = new FormData();
        formdata.append('file',profilepic);
        formdata.append('title',title);
        formdata.append('category',category);
        formdata.append('description',description);
        Axios.post('/createblog',formdata,{
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
                setProfilepic("");
                fileInputRef.current.value="";
                fetchmyblogs();
                fetchallblogs();
            }else{
                console.log(res);
                setMessage(res.data.message);
                setMsg(true);
                setStatus();
                setTimeout(()=>{
                    setMsg(false);
                },3000);
            }
        }).catch((err)=>{
            console.log(err);
        })
  }
    useEffect(()=>{

    },[])
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
            {msg && <p className={status  ? "text-center text-success":"text-center text-danger" }>{message}</p>}
            <div className="form-group mt-3 create-post-con">
                <div className="row create-h-pad mb-3">
                    <div className="col-lg-7">
                        <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control create-post-w" />
                    </div>
                    <div className="col-lg-5">
                        <input type="text" placeholder="Enter category" value={category} onChange={(e)=>{setCategory(e.target.value)}} className="form-control create-post-w" />
                    </div> 
                </div>
                <div>
                    <input type="file" ref={fileInputRef} onChange={e=> setProfilepic(e.target.files[0])} className="form-control mb-3"/>
                    <textarea className="form-control create-post-w" value={description} onChange={(e)=>{setDescription(e.target.value)}} style={{height:"200px"}} placeholder="Enter post description"></textarea><br></br><br></br>
                    <button type="submit" className="create-post-btn create-post-w" onClick={createBlog}>Create Post</button>
                </div>
            </div>
        </div>
    </div>
  )
}
