import { useContext, useEffect, useState } from "react"
import Axios from "../Api";
import { GlobContext } from "../Global";
import { useParams } from "react-router-dom";


export const Update = () => {
  const {fetchmyblogs, myblogs, fetchallblogs , setAuth} = useContext(GlobContext);
    const [title,setTitle]= useState("");
    const [category,setCategory] = useState("");
    const [profilepic,setProfilepic] = useState("");
    const [description,setDescription] = useState("");
    const [message,setMessage] = useState("");
    const [msg,setMsg] = useState(false);
    const {id} = useParams();

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
    
  const getdetails = ()=>{
    Axios.get('/viewblog/'+id).then((res)=>{
      if(res.data.status){
        console.log(res.data.message);
        setTitle(res.data.data.title);
        setCategory(res.data.data.category);
        setProfilepic(res.data.data.profilepic);
        setDescription(res.data.data.description);
      }else{
        console.log(res);
      }
    }).catch((err)=>{
       console.log(err);
    })
  }


    const updateblog = ()=>{
      if (!(profilepic instanceof File)) {
            setMessage("Input fields should not be empty...! and Please upload a valid image file");
            setMsg(true);
            return;
        }
        const formdata = new FormData();
        formdata.append('file',profilepic);
        formdata.append('title',title);
        formdata.append('category',category);
        formdata.append('description',description);
        Axios.put(`/editblog/${id}`,formdata,{
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
                fetchmyblogs();
                fetchallblogs();
            }
        }).catch((err)=>{
            console.log(err);
        })
  }
  useEffect(()=>{
      getdetails();
  },[])
  return (
    <div>
        <div className="create-post-con mb-3 mt-3 comp-cont">
            <h2>Update Blog</h2>
            {msg && <p className="text-center text-success">{message}</p>}
            <div className="form-group mt-3 create-post-con">
                <div className="row create-h-pad">
                    <div className="col-lg-7">
                        <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control create-post-w" />
                    </div>
                    <div className="col-lg-5">
                        <input type="text" placeholder="Enter category" value={category} onChange={(e)=>{setCategory(e.target.value)}} className="form-control create-post-w" />
                    </div> 
                </div>
                <div>
                    <input type="file" onChange={e=> setProfilepic(e.target.files[0])} className="form-control"/><br></br>
                    <textarea className="form-control create-post-w" value={description} onChange={(e)=>{setDescription(e.target.value)}} style={{height:"200px"}} placeholder="Enter post description"></textarea><br></br><br></br>
                    <button type="submit" className="update-btn" onClick={updateblog}>Update blog</button>
                </div>
            </div>
        </div>
    </div>
  )
}
