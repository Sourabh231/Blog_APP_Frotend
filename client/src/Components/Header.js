import React, { useState } from 'react'
import {Box,AppBar,Button, Typography,Tabs,Tab} from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast'

function Header() {
    const [value,setValue] = useState();
    //Global state
    let isLogin= useSelector(state=>state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //console.log(isLogin)
    
    //logout
    const handleLogout = ()=>{
        try{
           dispatch(authActions.logout());
           toast.success("Logout Sucessfully");
           navigate('/login')
           localStorage.clear();
        }catch(err){
          console.log(err);
        }
    }
  return (
    <div>
        <AppBar position='sticky'> 
                <Typography variant='h4' display={'flex'} alignItems='center'>
                    My Blog App
                </Typography>
                {isLogin && (
                <Box display={'flex'} marginLeft='auto' marginRight='auto'>
                    <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                        <Tab label='Blogs' LinkComponent={Link} to='/blogs'/>
                        <Tab label='My-blogs' LinkComponent={Link} to='/my-blogs'/>
                        <Tab label='Create-Blog' LinkComponent={Link} to='/create-blogs'/>
                    </Tabs>
                </Box>
               )}
                <Box display={'flex'} marginLeft='auto'>
                    {!isLogin && (<>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/login'>Login</Button>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/register'>Register</Button>
                    </>)}
                    {isLogin && (
                        <Button onClick={handleLogout} sx={{margin:1,color:'white'}}>Logout</Button>
                    )}
                </Box>
        </AppBar>
    </div>
  )
}

export default Header
