import React, { useEffect } from 'react'
import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import {useForm, useFormState} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {signupSchema} from "../Validations/ValidationSchema"
import {ErrorMessage, errorMessage} from "@hookform/error-message"
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'


const Signup = () => {
    

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const {signup,error,isLoading} = useSignup()
    const {register,handleSubmit, formState:{errors}} = useForm({
        resolver:yupResolver(signupSchema)
    })


    const submitForm = async ()=>{
        
        await signup(email,password)
    }
 



  return (
    <div>
        <Navbar id={'signup--nav'}/>
        {
        isLoading ?<Loading/>
        :
    
        <div className='signup'>

            <h1>Create your MargIn account</h1>
            <form className='signup--form' onSubmit={handleSubmit(submitForm)}>


                <label>Email:</label>
                <input 
                    {...register('email',{required:true})}
                    name='email'
                    type='text'
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    placeholder='example@email.com'
    
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
                    placeholder='Password..'
        
                >
                </input>
                <div className={'error'}>
                    <ErrorMessage  errors={errors} name='password' />
                </div>

                <label>Confirm Password:</label>
                <input 
                    {...register('confirmPassword',{required:true})}
                    name='confirmPassword'
                    type='password'
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='Confirm Password...'

                >
                </input>
                <div className={'error'}>
                    <ErrorMessage  errors={errors} name='confirmPassword' />
                </div>



                <button   className='hero--buttons' id='form--signup' >Submit</button>
                {error && <div className='error'>{error}</div>}
            </form>
    
            
        </div>
}
    </div>
  )
}

export default Signup