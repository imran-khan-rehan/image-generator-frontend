import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Tilt from 'react-vanilla-tilt'
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { logo } from '../assets';
import { parseCookies } from 'nookies';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {

    // handleSubmit();
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://imagebackend.vercel.app/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const cookies = parseCookies();
  const userId = cookies.userId;
  if (!userId) {
    window.location.href = '/signin';
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve userId from cookie
    //alert(userId);
    if (form.prompt && form.photo && userId) {
      setLoading(true);
      try {
        const response = await fetch('https://imagebackend.vercel.app/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form, userId }), // Include userId in the request body
        });

        if (response.ok) {
          //alert('Successfully saved image in your posts');
          navigate('/allposts');
        } else {
          //const errorMessage = await response.text();
          alert(`Network error please try again....`);
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };


  return (
    (userId && <section>
      <section className="custom text-black grid text-center mx-auto justify-center items-center" >
        <div className='bg-black mt-10' >
          <h1 className="font-extrabold text-white text-[52px] text-center">Create</h1>
          <div className='items-center bg-white flex justify-center' >
            <p className="mt-2 text-black font-bold text-[24px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
          </div>
        </div>




        <div className='bg-white p-10 mb-[60px] relative bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg'>
          <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Your Name"
                type="text"
                name="name"
                placeholder="Ex., john doe"
                value={form.name}
                handleChange={handleChange}
              />

              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />

              <div className='flex justify-center'>
                <div className="relative bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-9/12 h-9/12 object-contain opacity-40"
                    />
                  )}

                  {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                      <Loader />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-5">
              <button
                type="button"
                onClick={generateImage}
                className="dark:bg-cyan-700 dark:border-cyan-600 border-cyan-100 dark:hover:bg-black hover:bg-black font-semibold mb-4 flex  items-center justify-center rounded-full border-2 bg-white py-2 px-8 text-center transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent uppercase"
              >
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
            </div>

            <div className="mt-10">
              <p className="mt-2 text-black text-[24px]">Once you create the image you can save it for future use</p>
              <div className="flex justify-center pt-5">
                <button
                  type="submit"
                  className="dark:bg-cyan-700 dark:border-cyan-600 border-cyan-100 dark:hover:bg-black hover:bg-black font-semibold mb-4 flex  items-center justify-center rounded-full border-2 bg-white py-2 px-8 text-center transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent uppercase"
                >
                  {loading ? 'Saving...' : 'Save this image'}
                </button>
              </div>
            </div>
          </form>
          <a href="/AllPosts">
            <button className="dark:bg-cyan-700 dark:border-cyan-600 border-cyan-100 dark:hover:bg-black hover:bg-black font-semibold mb-2 items-center justify-center rounded-full border-2 bg-white py-2 px-8 text-center transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent uppercase cursor-pointer">
              My AI Generated Images
            </button>
          </a>

        </div>


      </section>

      <footer className="bg-black py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row pb-4 justify-between gap-9 justify-around items-center">
          <div className='logo'>
            <a href="/">
              <img src={logo} alt="logo" className="w-32 ml-2 object-contain bg-white py-6 px-4" />
            </a>
          </div>
          <div className="space-x-4">

            <a href="#" className="text-white justify-between flex mt-2 hover:text-gray-400 transition-colors duration-300">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              <h1>Facebook</h1>
            </a>
            <a href="#" className="text-white justify-between flex mt-2 hover:text-gray-400 transition-colors duration-300">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              <h1 className='ml-4'>Instagram</h1>
            </a>
            <a href="#" className="text-white justify-between flex mt-2 hover:text-gray-400 transition-colors duration-300">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              <h1>Twitter</h1>
            </a>
          </div>
          {/* Email subscription */}
          <div className="mt-4 flex">

            <div className="flex-grow">
              <input type="email" className="w-full px-4 py-2 rounded-l-lg focus:outline-none" placeholder="Your email address" />
            </div>
            <div>
              <button className="bg-red-500 hover:bg-black text-white px-6 py-2 rounded-r-lg transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="copyright text-center pt-3 text-white">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </section>)
  );
};

export default CreatePost;
