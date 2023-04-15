import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { InputLabel, TextField, Typography ,Button} from '@mui/material'
import { Box } from '@mui/system';
function BlogDetails() {
    const[blog,setBlog]=useState([]);
    const id = useParams().id;

    const [inputs, setInputs] = useState({
      // title: '',
      // description: '',
      // image: ''
  });
  const navigate = useNavigate()

    //get blog details
    const getBlogDetail = async()=>{
        try{
          const {data} = await axios.get(`https://blog-app-bakend.onrender.com/api/v1/blog/get-blog/${id}`);
          if(data?.sucess){
            setBlog(data?.blog);
            setInputs({
              title:data.blog.title,
              description:data.blog.description,
              image:data?.blog.image
            })
          }
        }catch(err){
            console.log(err);
        }
    }
    //
    useEffect(()=>{
       getBlogDetail();
       
    },[id]);


    

  //input Chagne
  const handleChange = (e)=>{
      setInputs(prevState=>({
          ...prevState,
          [e.target.name]:e.target.value,

      }))
  }

  //form
  const handleSubmit = async(e) => {
      e.preventDefault();
      // console.log(inputs);
      try{
          const {data} = await axios.put(`https://blog-app-bakend.onrender.com/api/v1/blog/update-blog/${id}`,{
              title:inputs.title,
              description:inputs.description,
              image:inputs.image,
              user:id
          })
          if(data?.sucess){
              alert("Blog Updated");
              navigate('/my-blogs');
          }
      }catch(err){
        console.log(err);
      }
  }
    console.log(blog)
  return (
    <div>
       <form onSubmit={handleSubmit}>
                <Box width={'60%'}  
                    border={3} 
                    borderRadius={10}
                    padding={3} margin='auto' 
                    marginTop={5} 
                    boxShadow={'10px 10px 20px #ccc'}
                    display='flex' 
                    flexDirection={'column'}>

                    <Typography variant='h2' textAlign={'center'} fontWeight={'bold'}
                        padding={3} color='gray'>
                        Update A Post
                    </Typography>
                    <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>
                        Title
                    </InputLabel>
                    <TextField margin='normal' variant='outlined' name='title'
                      value={inputs.title} onChange={handleChange} required>

                    </TextField>

                    <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>
                        Description
                    </InputLabel>
                    <TextField margin='normal' variant='outlined' name='description'
                      value={inputs.description} onChange={handleChange} required>

                    </TextField>

                    <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>
                        Image URL
                    </InputLabel>
                    <TextField margin='normal' variant='outlined' name='image'
                      value={inputs.image} onChange={handleChange} required>

                    </TextField>

                    <Button type='submit' color='primary' variant='containt'>
                        UPDATE
                    </Button>
                </Box>
            </form>
    </div>
  )
}

export default BlogDetails
