import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { logo } from './assets';
import { Home, CreatePost } from './page';
import Login from './components/signup';
import Signin from './components/signin';
import AllPosts from './page/AllPosts';

import { parseCookies, destroyCookie } from 'nookies';
const cookies2 = parseCookies();
const userId = cookies2.userId;
// alert(userId);
const handleLogout = () => {
  destroyCookie(null, 'userId'); // Remove userId cookie
  window.location.href = '/signin'; // Redirect to signin page after logout
};
const App = () => (

  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4 border-b">
      <Link to="/">
        <img src={logo} alt="logo" className="w-32 ml-2 object-contain bg-white py-6 px-4" />
      </Link>
      <h1 className='text-white text-center font-bold font-serif text-lg'>Text To Image DALL-E 2.0</h1>
      <div className=' text-white items-center flex justify-center font-bold border-white'>
        {userId && <><div onClick={() => window.location.href = "/create-post"} className='ml-4 border border-white p-2 rounded-full hover:bg-white hover:text-black cursor-pointer'>Create Post</div> <div onClick={handleLogout} className='ml-4 border border-white p-2 rounded-full hover:bg-white hover:text-black cursor-pointer'>Logout</div>
        </>
        }        <FontAwesomeIcon icon={faRobot} className="text-white text-3xl px-4 py-2 rounded-md" />
      </div>


      {/* <Link to="/create-post" className="font-inter font-medium bg-[#8664ff] text-white px-4 py-2 rounded-md">Create</Link> */}
    </header>
    <main className="w-full  bg-black min-h-[calc(100vh-73px)]">
      <Routes>
              <Switch>

        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path='/signup' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/allposts' element={<AllPosts />} />
        </Switch>
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
