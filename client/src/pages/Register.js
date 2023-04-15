import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'

function Register() {
    const navigate = useNavigate();
    const [input, setinput] = useState({
        name: '',
        email: '',
        password: ''
    })

    //handle input change

    const handleChange = (e) => {
        setinput(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //form handle
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //console.log(input);
        try{
          const {data}=await axios.post('https://blog-app-bakend.onrender.com/api/v1/user/register',
          {username:input.name,email:input.email,password:input.password});
          if(data.sucess){
            toast.success('User Register Sucessfully');
            navigate('/login');
          }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450} display='flex' flexDirection='column'
                    alignItems='center'
                    justifyContent={'center'}
                    margin='auto'
                    marginTop={5}
                    boxShadow='10px 10px 20px #ccc'
                    borderRadius={5}>
                    <Typography varient='h4' padding={3} textAlign='center' sx={{ textTransform: 'uppercase', fontSize: '30px' }}>Register</Typography>

                    <TextField placeholder='Enter Your Name' onChange={handleChange} value={input.name} name='name' margin='normal' type={'text'} required />
                    <TextField placeholder='Enter Your Email' onChange={handleChange} value={input.email} name='email' margin='normal' type={'email'} required />
                    <TextField placeholder='Enter Your Password' onChange={handleChange} value={input.password} name='password' margin='normal' type={'password'} required />
                    <Button sx={{ borderRadius: 3, marginTop: 1 }}
                        type='submit' varient='contained' color='primary'>Submit</Button>
                    <Button onClick={() => navigate('/login')} sx={{ borderRadius: 3, marginTop: 1 }}
                        type='submit' varient='contained' color='primary'>Already redisterd ? Please login</Button>
                </Box>
            </form>
        </div>
    )
}

export default Register
