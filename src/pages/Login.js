import React from 'react'
import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

import {useForm, useFormState} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {loginSchema} from "../Validations/ValidationSchema"
import {ErrorMessage, errorMessage} from "@hookform/error-message"
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {login,error,isLoading} = useLogin()

    const {register,handleSubmit, formState:{errors}} = useForm({
        resolver:yupResolver(loginSchema)
    })


    const submitForm = async (e)=>{
        // e.preventDefault()
        await login(email,password)
    }   



  return (
    <div>
        <Navbar id={'login--nav'}/>
        {
        isLoading?<Loading/>
        :
        <div className='signup'>

            <h1>Sign in to MargIn</h1>
            <form className='signup--form' onSubmit={handleSubmit(submitForm)}>
                <label>Email:</label>
                <input 
                    {...register('email',{required:true})}
                    name='email'
                    type='text'
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                >
                </input>
                <div className={'error'}>
                    <ErrorMessage errors={errors} name='email' />
                </div>

                <label>Password:</label>
                <input 
                    {...register('password',{required:true})}
                    name='password'
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                >
                </input>
                <div className={'error'}>
                    <ErrorMessage  errors={errors} name='password' />
                </div>

                <button   className='hero--buttons' id='form--signup' >Submit</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
        }
    </div>
  )
}

export default Login