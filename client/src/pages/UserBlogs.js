import axios from 'axios';
import React, { useState,useEffect } from 'react'
import BlogCard from '../Components/BlogCard';
function UserBlogs() {
    const [blogs,setblogs]=useState([]);

    //get user blogs
    const getUserBlogs= async()=>{
        try{
        const id = localStorage.getItem('userId')
           const {data} = await axios.get(`https://blog-app-bakend.onrender.com/api/v1/blog/user-blog/${id}`);
           if(data?.sucess){
             setblogs(data?.userBlog.blogs)
           }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
         getUserBlogs();
    },[])
    //console.log(blogs);
return(
    <div>
     {blogs && blogs.length>0 ?(
     blogs.map((blog)=>(
       <BlogCard id={blog._id}
       isUser={true}
       title={blog.title}
       description = {blog.description} 
       image={blog?.image} 
       username={blog.user.username}
       time={blog.createdAt}/>
       ))
     ) :(
        <h1>You Havent Created a blog</h1>
     )
    }
    </div>
  )
}

export default UserBlogs;
