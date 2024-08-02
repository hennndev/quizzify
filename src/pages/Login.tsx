import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoArrowBack } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { IoMailOutline, IoLockClosedOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface LoginFormTypes {
    email: string
    password: string
} 

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, handleSubmit, formState: {errors} } = useForm<LoginFormTypes>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = async (values: LoginFormTypes) => {
        console.log(values)
    }
    const handleShowPassowrd = (value: boolean) => {
        setShowPassword(value)
    }
    
    return (
        <>
            <form className='max-w-[400px] rounded-lg p-6' onSubmit={handleSubmit(onSubmit)}>
                <div className='flexx mb-3 cursor-pointer' onClick={() => navigate('/')}>
                    <IoArrowBack className='text-primary text-lg mr-3'/>
                    <p className='text-sm text-primary'>Back to homepage</p>
                </div>
                <div className='bg-orange-100 rounded-lg py-3 px-5 mb-5'>
                    <p className='text-primary'>Currently, login page just dummy UI.</p>
                </div>
                <h1 className='text-4xl text-primary font-bold text-center mb-3'>Quizzify</h1>
                <h1 className='text-xl text-primary font-medium text-center mb-6'>Welcome Back!</h1>
                
                <div className='input-control'>
                    <label htmlFor="email">Email</label>
                    <div className='flexx border border-[#ccc] rounded-lg outline-none py-2 px-4'>
                        <IoMailOutline className='text-xl mr-3 text-primary'/>
                        <input type="email" id='email' {...register('email', {
                            required: {
                                value: true,
                                message: 'Email field is required'
                            },
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email not valid"
                            }
                        })} placeholder='Enter your email' className='w-full outline-none text-primary flex-1'/>
                    </div>
                    {errors.email && <small className='text-red-400 text-sm mt-1'>{errors.email?.message}</small>}
                </div>
                <div className='input-control'>
                    <label htmlFor="password">Password</label>
                    <div className='flexx border border-[#ccc] rounded-lg outline-none py-2 px-4'>
                        <IoLockClosedOutline className='text-xl mr-3 text-primary'/>
                        <input type={showPassword ? 'text' : 'password'} {...register('password', {
                            required: {
                                value: true,
                                message: 'Password field is required'
                            },
                            minLength: {
                                value: 7,
                                message: 'Minimum password length is 7 characters'
                            }
                        })} placeholder='Enter your password' className='w-full outline-none text-primary flex-1'/>
                        {showPassword ? (
                            <IoEyeOutline className='cursor-pointer text-xl ml-2 text-primary' onClick={() => handleShowPassowrd(false)}/>
                        ): (
                            <IoEyeOffOutline className='cursor-pointer text-xl ml-2 text-primary' onClick={() => handleShowPassowrd(true)}/>
                        )}
                    </div>
                    {errors.password && <small className='text-red-400 text-sm mt-1'>{errors.password?.message}</small>}
                </div>
                <button type='submit' className='bg-primary hover:bg-primary-hover text-white rounded-lg py-2 px-4 w-full'>Submit</button>
                <p className='text-center mt-4 text-sm text-primary'>Don't have an account? <Link to='/register' className='underline'>Register</Link></p>
            </form>
        </>
    )
}

export default Login