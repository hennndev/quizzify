import { useEffect } from 'react'
import clsx from 'clsx'
import Home from './pages/Home'
import Login from './pages/Login'
import Score from './pages/Score'
import Register from './pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Course from './pages/Courses/Course'
import Courses from './pages/Courses/Courses'
import PageNotFound from './pages/PageNotFound'
import QuizResume from './components/QuizResume'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useUserStore } from './store/userStore'
import { useAnswerStore } from './store/answerStore'
import { useSubmittingStore } from './store/submittingStore'

const App = () => {
    const location = useLocation()
    const { setUsername } = useUserStore()
    const { setAnswers } = useAnswerStore()
    const { isSubmitQuiz, setSubmitQuiz } = useSubmittingStore()

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(isSubmitQuiz && location.pathname !== '/score') {
                setSubmitQuiz(false)
                setAnswers([])
                setUsername(null)
            }
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [isSubmitQuiz, location.pathname])
    
    return (
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/courses' element={<Courses/>}/>
                <Route path='/courses/:courseTitle' element={<Course/>}/>
                <Route path='/score' element={<Score/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Route>
            <Route element={<AuthLayout/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Route>
        </Routes>
    )
}

const AppLayout = () => {
    const location = useLocation()
    return (
        <main className='flex flex-col min-h-screen'>
            <Header/>
            <section className={clsx('flex-1 container px-4 mb-10', location.pathname === '/' ? 'flex-center' : '')}>
                <Outlet/>
            </section>
            <Footer/>
            <QuizResume/>
        </main>
    )
}

const AuthLayout = () => {
    return (
        <main className='flex-center min-h-screen'>
            <Outlet/>
            <QuizResume/>
        </main>
    )
}
export default App