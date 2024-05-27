import React from 'react'
import { useState, useEffect } from 'react'
import { ClosedEye, Google, OpenEye } from '../assets/icons/icons'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import UserContext from '../context/notes/userContext';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'

function LoginSignup() {

  useGoogleOneTapLogin({
    onSuccess: (response) => {
      console.log("response from google onetap", response);
      let values = {
        name: response.name,
        email: response.email,
        password: response.sub,
        image:response.picture
      }
      oneTap(values)
    },
    onError: (error) => { console.log("error", error) },
    googleAccountConfigs: {
      client_id: '247003230731-5m23u6ilq2bqhtp1jtigs1tqnu5ttjbu.apps.googleusercontent.com',
      cancel_on_tap_outside: true
    }

  })
  const userContext = useContext(UserContext);
  const { currentTags, createTag, fetchTags, oneTap, login, signup } = userContext;
  const [view, setView] = useState("password");
  const [fadeIn, setFadeIn] = useState(null);
  const [slide, setSlide] = useState(null);
  const [currentPage, setCurrentPage] = useState('Signup')
  const IMAGES = {
    login: new URL('../assets/images/welcome.png', import.meta.url).href,

    signup: new URL('../assets/images/signup.png', import.meta.url).href
  }


  const LoginValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .oneOf([Yup.ref('password'), null], "Password does not match"),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const toggleView = () => {
    if (view === 'password') {
      setView('text')
    }
    else {
      setView('password')
    }
  }

  const togglePage = () => {
    if (currentPage === 'Signup') {
      setCurrentPage("Login")
      setFadeIn(true)
      setSlide("slideRight")
    }
    else {
      setCurrentPage('Signup')
      setFadeIn(false)
      setSlide("slideLeft")
    }
  }

  return (
    <div>
      <div className=' hidden lg:block'>
        <div className={`welcome absolute w-3/5 h-screen bg-[#FFE1E1] ${slide}`}>
          <div hidden={!fadeIn} className={`w-fit mt-20 text-2xl mx-auto ${fadeIn === true ? 'fadeIn' : 'fadeOut'}`} >Nice to see you again</div>
          <div hidden={fadeIn} className={`w-fit mt-20 text-2xl mx-auto ${!fadeIn === true ? 'fadeIn' : 'fadeOut'}`} >Let's get you started</div>
          <div hidden={!fadeIn} className={`w-fit text-[#CE0C0C] font-semibold mt-6 text-5xl mx-auto ${fadeIn === true ? 'fadeIn' : 'fadeOut'}`}>Welcome back</div>
          <div hidden={fadeIn} className={`w-fit text-[#CE0C0C] font-semibold mt-6 text-5xl mx-auto ${!fadeIn === true ? 'fadeIn' : 'fadeOut'}`}>Create an Account</div>
          <img hidden={!fadeIn} className={`m-auto ${fadeIn === true ? 'fadeIn' : 'fadeOut'}`} src={IMAGES.login} alt='first image' />
          <img hidden={fadeIn} className={`m-auto ${!fadeIn === true ? 'fadeIn' : 'fadeOut'}`} src={IMAGES.signup} alt='first image' />
        </div>
      </div>


      <div className='lg:grid lg:grid-cols-5 lg:grid-rows-1'>
        <div className={`login w-fit mx-auto lg:block ${currentPage==='Login'? 'hidden':'block'} col-span-2 pl-16 pt-10 `}>
          <h4 className='text-primary text-[40px] font-semibold'>iNotebook</h4>
          <h3 className='text-[30px] font-bold mt-5'>Log in.</h3>

          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={values => {
              console.log("login values => ", values);
              login(values)
            }}
          >
            {({ errors, touched }) => (
              <Form className='mt-11 w-80'>

                <label htmlFor="email" className='text-zinc-700 font-semibold'>Enter your Email address</label>
                <div className='block mt-2 h-9 w-80 rounded-sm bg-white outline-none' style={{ "border": "1px solid gray" }}>
                  <Field className='h-full w-full pl-3' type="text" name="email" id="login_email" placeholder='name@example.com' />
                </div>
                <span className='text-red-400 text-sm border border-white'>{errors.email && touched.email ? errors.email : ""}</span>

                <label htmlFor="passwd" className='text-zinc-700 block mt-7 font-semibold'>Enter your Password</label>
                <div className='grid grid-cols-6 mt-2 w-80 h-9 rounded-sm' style={{ "border": "1px solid gray" }} >
                  <Field className='col-span-5 pl-3 h-full outline-none' type={view} name="password" id="login_password" placeholder='atleast 8 charecters ' />
                  <span className=' col-span-1 cursor-pointer m-auto' onClick={() => { toggleView() }}>{view === 'password' ? ClosedEye : OpenEye}</span>
                </div>
                <span className='text-red-400 text-sm border border-white' >{errors.password && touched.password ? errors.password : ""}</span>
                <span className='text-[14px] text-red-500 text-base float-right' >Forgot Password?</span>
                <button type='submit' className='mt-14  w-80 h-12 block text-white rounded-3xl bg-red-600'>
                  Log in
                </button>
              </Form>
            )
            }
          </Formik>

          <div className='w-full mt-10 ml-10 font-semibold' >Dont have an account? <span onClick={() => { togglePage() }} className='cursor-pointer text-red-600'>Sign up</span></div>
        </div>
        <div></div>

        <div className={`signup w-fit mx-auto lg:block ${currentPage==='Signup'? 'hidden':'block'} col-span-2 pl-16 pt-10 `}>
          <h4 className='text-primary text-[40px] font-semibold'>iNotebook</h4>
          <h3 className='text-[30px] font-bold mt-5'>Sign up.</h3>

          <Formik
            initialValues={{
              name: '',
              password: '',
              confirmPassword:'',
              email: '',
            }}
            validationSchema={SignupValidationSchema}
            onSubmit={values => {
              console.log("signup values => ", values);
              signup(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className='mt-8 w-80'>
                <label htmlFor="name" className='text-zinc-700 font-semibold'>Enter your Name</label>
                <div className='block mt-2 h-9 w-80 rounded-sm bg-white outline-none' style={{ "border": "1px solid gray" }}>
                  <Field className='h-full w-full pl-3' type="text" name="name" id="name" placeholder='Name' />
                </div>
                <span className='text-red-400 text-sm border border-white' >{errors.name && touched.name ? errors.name : ''}</span>


                <label htmlFor="email" className='block mt-3 text-zinc-700 font-semibold'>Enter your Email address</label>
                <div className='block mt-1 h-9 w-80 rounded-sm bg-white outline-none' style={{ "border": "1px solid gray" }}>
                  <Field className='h-full w-full pl-3' type="text" name="email" id="signup_email" placeholder='name@example.com' />
                </div>
                <span className='text-red-400 text-sm border border-white' >{errors.email && touched.email ? errors.email : ''}</span>

                <label htmlFor="passwd" className='text-zinc-700 block mt-2 font-semibold'>Enter your Password</label>
                <div className='grid grid-cols-6 mt-2 w-80 h-9 rounded-sm' style={{ "border": "1px solid gray" }} >
                  <Field className='col-span-5 pl-3 h-full outline-none' type="password" name="password" id="signup_password" placeholder='Set Password ' />
                </div>
                <span className='text-red-400 text-sm border border-white'>{errors.password && touched.password ? errors.password : ""}</span>
                <div className='grid grid-cols-6 mt-2 w-80 h-9 rounded-sm' style={{ "border": "1px solid gray" }} >
                  <Field className='col-span-5 pl-3 h-full outline-none' type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password ' />
                </div>
                <span className='text-red-400 text-sm border border-white'>{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}</span>
                <button type="submit" className='mt-7  w-80 h-12 block text-white rounded-3xl bg-red-600'>
                  Sign up
                </button>
              </Form>

            )
            }
          </Formik>

          <div className='w-96 mt-10 ml-10 font-semibold' >Already have an account? <span onClick={() => { togglePage() }} className='cursor-pointer text-red-600'>Log in</span></div>

        </div>
      </div>
    </div>
  )
}

export default LoginSignup