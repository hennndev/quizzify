import { useState } from 'react'
import clsx from 'clsx'
import { IoMenu } from "react-icons/io5"
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const [isMenu, setIsMenu] = useState(false)

    const handleClose = () => {
        setIsMenu(false)
    }

    return (
        <header className='flex-between container py-3 px-4'>
            <h1 className='text-2xl text-primary font-bold cursor-pointer' onClick={() => navigate("/")}>Quizzify</h1>
            <IoMenu className='block md:hidden text-primary text-2xl cursor-pointer' onClick={() => setIsMenu(!isMenu)}/>
            <div className={clsx('w-[200px] bg-white shadow-lg fixed flex flex-col p-5 space-y-4 top-0 bottom-0 -left-[230px] md:hidden transition-all duration-200 ease-in-out', isMenu ? 'left-0' : '')}>
                <h1 className='text-2xl text-primary font-bold cursor-pointer mb-4' onClick={() => {
                    navigate('/')
                    handleClose()
                }}>Quizzify</h1>
                <Link to='/courses' className='text-primary' onClick={handleClose}>
                    Courses
                </Link>   
                <Link to='/login' className='text-primary' onClick={handleClose}>
                    Login
                </Link>   
                <Link to='/register' className='bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg transition duration-200 ease-in text-center' onClick={handleClose}> 
                    Register
                </Link>
            </div>
            <div className='hidden md:flexx space-x-6'>
                <Link to='/courses' className='text-primary'>
                    Courses
                </Link>   
                <Link to='/login' className='text-primary'>
                    Login
                </Link>   
                <Link to='/register' className='bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg transition duration-200 ease-in'> 
                    Register
                </Link>
            </div>
        </header>
    )
}

export default Header