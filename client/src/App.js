
import './App.css';
import Header from './Components/Header';
import {Routes,Route} from 'react-router-dom'
import Blog from './pages/Blog';
import UserBlogs from './pages/UserBlogs';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div>
      <Header/>
      <Routes>
          <Route path='/' element={<Blog/>}/>
          <Route path='/blogs' element={<Blog/>}/>
          <Route path='/my-blogs' element={<UserBlogs/>}/>
          <Route path='/my-blogs' element={<UserBlogs/>}/>
          <Route path='/blog-details/:id' element={<BlogDetails/>}/>
          <Route path='/create-blogs' element={<CreateBlog/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
        
    </div>
  );
}

export default App;
