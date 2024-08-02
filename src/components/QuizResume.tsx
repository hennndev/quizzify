import { useEffect, useState } from 'react'
import { useQuizStore } from '../store/quizStore'
import QuizResumeModal from './Modal/QuizResumeModal'
import { removeWhiteSpace } from './../utils/functions'
import { useLocation, useNavigate } from 'react-router-dom'

const QuizResume = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { quizData } = useQuizStore()
    const [isNotQuizPage, setIsNotQuizPage] = useState<boolean>(false)

    useEffect(() => {
        if(quizData && location.pathname !== `/courses/${removeWhiteSpace(quizData?.quizTitle as string)}`) {
            setIsNotQuizPage(true)
        } else {
            setIsNotQuizPage(false)
        }
    }, [location.pathname])

    useEffect(() => {
        if(quizData && (location.pathname === '/login' || location.pathname === '/register')) {
            navigate('/')
        }
    }, [quizData])

    return <div>
        {isNotQuizPage && quizData && <QuizResumeModal/>}
    </div>
}

export default QuizResume