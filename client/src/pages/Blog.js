import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from '../Components/BlogCard';
function Blog() {
  const [blogs,setblogs] = useState([])
  //get Blogs
  const getAllBlogs = async()=>{
    try{
       const {data} = await axios.get('https://blog-app-bakend.onrender.com/api/v1/blog/all-blog');
       if(data?.sucess){
         setblogs(data?.blogs)
       }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
     getAllBlogs();
  },[])
  return (
    <div>
      {blogs && 
          blogs.map((blog)=><BlogCard id={blog?._id}
          isUser={localStorage.getItem('userId')===blog?.user?._id} 
          title={blog?.title}
          description = {blog?.description} 
          image={blog?.image} 
          username={blog?.user?.username}
          time={blog.createdAt}/>)}
    </div>
  )
}

export default Blog
