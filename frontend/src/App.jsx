import { Route, Routes } from "react-router-dom"
import { Create } from "./Comp/Create"
import { Home } from "./Comp/Home"
import { Blogs } from "./Comp/Blogs"
import { Login } from "./Comp/Login"
import { Navbar } from "./Comp/Navbar"
import { Signup } from "./Comp/Signup"
import { Dashboard } from "./Comp/Dashboard"
import { Myblogs } from "./Comp/Myblogs"
import { Draft } from "./Comp/Draft"
import { Viewblog } from "./Comp/Viewblog"
import { Search } from "./Comp/Search"
import { Footer } from "./Comp/Footer"

import './App.css';
import { Update } from "./Comp/update"

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard?tab=create" element={<Create/>}/>
          <Route path="/dashboard?tab=myblogs" element={<Myblogs/>}/>
          <Route path="/dashboard?tab=draft" element={<Draft/>}/>
          <Route path="/viewpost/:id" element={<Viewblog/>} />
          <Route path="/search" element={<Search/> }/>
          <Route path="/update/:id" element={<Update/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
