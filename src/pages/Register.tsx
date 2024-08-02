import { useState } from 'react'
import { useForm } from 'react-hook-form'
import HeadingPage from '../components/HeadingPage'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBack, IoMailOutline, IoLockClosedOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"


interface LoginFormTypes {
    username: string
    email: string
    password: string
    passwordConfirmation: string
} 

const Register = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)
    const { register, watch, handleSubmit, formState: {errors} } = useForm<LoginFormTypes>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    })

    const onSubmit = (values: any) => {
        console.log(values)
    }

    const handleShowPassowrd = (value: boolean) => {
        setShowPassword(value)
    }

    const handleShowPassowrdConfirmation = (value: boolean) => {
        setShowPasswordConfirmation(value)
    }
    
    return (
        <>
            <HeadingPage title='Register page' content='Register page'/>
            <form className='max-w-[400px] rounded-lg p-6 mt-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='flexx mb-3 cursor-pointer' onClick={() => navigate('/')}>
                    <IoArrowBack className='text-primary text-lg mr-3'/>
                    <p className='text-sm text-primary'>Back to homepage</p>
                </div>
                <div className='bg-orange-100 rounded-lg py-3 px-5 mb-5'>
                    <p className='text-primary'>Currently, register page just dummy UI.</p>
                </div>
                <h1 className='text-4xl text-primary font-bold text-center mb-3'>Quizzify</h1>
                <p className='text-primary text-center mb-6 text-[15px]'>Create new account and you can save your data to know your scores in quiz courses</p>
                <div className='input-control'>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id='username' 
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'Username field is required'
                            }
                        })} 
                        placeholder='Enter your username' 
                        className='w-full border border-[#ccc] rounded-lg outline-none py-2 px-4'/>
                    {errors.username && <small className='text-red-400 text-sm mt-1'>{errors.username?.message}</small>}
                </div>
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

                <div className='input-control'>
                    <label htmlFor="password">Password Confirmation</label>
                    <div className='flexx border border-[#ccc] rounded-lg outline-none py-2 px-4'>
                        <IoLockClosedOutline className='text-xl mr-3 text-primary'/>
                        <input type={showPasswordConfirmation ? 'text' : 'password'} {...register('passwordConfirmation', {
                            required: {
                                value: true,
                                message: 'Password confirmation field is required'
                            },
                            minLength: {
                                value: 7,
                                message: 'Minimum password confirmation length is 7 characters'
                            },
                            validate: (value: string) => {
                                return watch('password') === value || 'Password confirmation not match with password'
                            },
                        })} placeholder='Enter your password confirmation' className='w-full outline-none text-primary flex-1'/>
                        {showPasswordConfirmation ? (
                            <IoEyeOutline className='cursor-pointer text-xl ml-2 text-primary' onClick={() => handleShowPassowrdConfirmation(false)}/>
                        ): (
                            <IoEyeOffOutline className='cursor-pointer text-xl ml-2 text-primary' onClick={() => handleShowPassowrdConfirmation(true)}/>
                        )}
                    </div>
                    {errors.passwordConfirmation && <small className='text-red-400 text-sm mt-1'>{errors.passwordConfirmation?.message}</small>}
                </div>

                <button type='submit' className='bg-primary hover:bg-primary-hover text-white rounded-lg py-2 px-4 w-full'>Submit</button>
                <p className='text-center mt-4 text-sm text-primary'>Already have an account? <Link to='/login' className='underline'>Login</Link></p>
            </form>
        </>
    )
}

export default Register