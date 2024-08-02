import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeadingPage from '../components/HeadingPage'

import { useQuizStore } from '../store/quizStore'
import { useUserStore } from '../store/userStore'
import { useAnswerStore } from '../store/answerStore'
import { useSubmittingStore } from '../store/submittingStore'
import { useQuestionsStore } from '../store/questionsStore'

const Score = () => {
    const navigate = useNavigate()
    const { quizData } = useQuizStore()
    const { username, setUsername } = useUserStore()
    const { questions } = useQuestionsStore()
    const { answers, setAnswers } = useAnswerStore()
    const { isSubmitQuiz, setSubmitQuiz } = useSubmittingStore()

    useEffect(() => {
        if(!isSubmitQuiz) {
            navigate('/courses')
        }
    }, [quizData])
    
    useEffect(() => {
        if(isSubmitQuiz) {
            setTimeout(() => {
                setSubmitQuiz(false)
                setAnswers([])
                setUsername(null)
                navigate('/courses')
            }, 20000);
        }
    }, [isSubmitQuiz])

    const totalAnswersDone = answers.filter(a => a.questAnswer !== null).length

    const correctAnswers = answers.filter((a, index) => {
        if(Array.isArray(questions)) {
            const question = questions[index]
            return a.questAnswer === question.correct_answer
        }
    }).length

    const incorrectAnswer = answers.filter((a, index) => {
        if(Array.isArray(questions)) {
            const question = questions[index]
            return a.questAnswer !== question.correct_answer
        }
    }).length

    const handleNavigate = () => {
        setSubmitQuiz(false)
        setAnswers([])
        setUsername(null)
        navigate('/courses')
    }
    
    return (
        <>
            <HeadingPage title='Score page' content='Score page'/>
            <div className='mt-14 text-primary'>
                <div className='flex-center flex-col'>
                    <h1 className='text-3xl font-semibold'>Your Quiz Score</h1>
                    <h2 className='font-bold text-4xl md:text-6xl mt-5'>{correctAnswers * 10}/100</h2>
                    <p className='text-primary text-lg mb-5 mt-8'>Hai, <span className='underline font-semibold'>{username}</span>. This is your score.</p>
                    <div className='space-y-3 text-center'>
                        <p>Total Questions: <span className='font-semibold'>10 questions</span></p>
                        <p>Total Answers: <span className='font-semibold'>{totalAnswersDone} questions</span></p>
                        <p>Correct Answer: <span className='font-semibold'>{correctAnswers} {correctAnswers > 1 ? ' questions' : 'question'}</span></p>
                        <p>Incorrect Answer: <span className='font-semibold'>{incorrectAnswer} {incorrectAnswer > 1 ? ' questions' : 'question'}</span></p>
                    </div>
                    <button className='mt-5 bg-primary hover:bg-primary-hover py-2 px-4 rounded-lg text-white' onClick={handleNavigate}>Back to courses</button>
                </div>
            </div>
        </>
    )
}

export default Score