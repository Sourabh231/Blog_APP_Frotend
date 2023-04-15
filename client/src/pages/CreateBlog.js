import React, { useState } from 'react'
import { InputLabel, TextField, Typography ,Button} from '@mui/material'
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateBlog() {
    const id = localStorage.getItem('userId');
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    });

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
            const {data} = await axios.post('https://blog-app-bakend.onrender.com/api/v1/blog/create-blog',{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id
            })
            if(data?.sucess){
                alert("Blog Created");
                navigate('/my-blogs');
            }
        }catch(err){
           console.log(err);
        }
    }
    return (
        <>
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
                        Create A Post
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
                        POST
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog
