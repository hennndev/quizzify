import { useEffect, useState } from 'react'
import clsx from 'clsx'
import axios from 'axios'
import queryString from 'query-string'
import { IoClose } from 'react-icons/io5'
import QuizTimer from '../../components/QuizTimer'
import QuizItem from '../../components/Quiz/QuizItem'
import HeadingPage from '../../components/HeadingPage'
import { useLocation, useNavigate } from 'react-router-dom'
import QuizNavigation from '../../components/QuizNavigation'
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io"
import QuizSubmitConfirmation from '../../components/Modal/QuizSubmitConfirmation'
import { useQuizStore } from '../../store/quizStore'
import { useTimerStore } from '../../store/timerStore'
import { useQuestionsStore } from '../../store/questionsStore'

const Course = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const queryStr = queryString.parse(location.search)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [quizNumber, setQuizNumber] = useState<number>(1)
    const [dataQuestions, setDataQuestions] = useState<QuestionsTypes | null>(null)

    const { timer } = useTimerStore()
    const { quizData } = useQuizStore()
    const { questions, setQuestions } = useQuestionsStore()

    const getQuestions = async () => {
        const queries = `amount=10&category=${queryStr.category}&difficulty=${queryStr.difficulty}`
        const data = await axios.get(`https://opentdb.com/api.php?${queries}`)
        setDataQuestions(data.data.results)
        setQuestions(data.data.results)
        setIsLoading(false)
    }

    useEffect(() => {
        if(!queryStr.category || !queryStr.difficulty || !quizData) {
            navigate('/courses')
        } else {
            if(!questions) {
                setIsLoading(true)
                getQuestions()
            }
        }
    }, [queryStr.category, queryStr.difficulty, dataQuestions])

    useEffect(() => {
        if(questions && Array.isArray(questions)) {
            setDataQuestions(questions as QuestionsTypes)
        }
    }, [questions])
    
    const handleNext = () => {
        if(dataQuestions?.length === quizNumber) return
        setQuizNumber(quizNumber + 1)
    }

    const handlePrevious = () => {
        if(quizNumber === 1) return
        setQuizNumber(quizNumber - 1)
    }

    const handleNavigateQuiz = (value: number) => {
        setQuizNumber(value)
    }   

    const handleOpenModalSubmit = () => {
        setIsOpen(true)
    }

    return (
        <>
            <HeadingPage title='Course page' content='Course page'/>
            <div className='mt-14'>
                {isLoading ? (
                    <div className='flex-center'>
                        <p className='animate-pulse text-md text-primary font-normal'>Loading...</p>
                    </div>
                ) : (
                    <div className='flex space-x-2'>
                        <div className='hidden md:flex flex-col'>
                            <QuizTimer date={timer as number}/>
                            <QuizNavigation handleNavigateQuiz={handleNavigateQuiz}/>
                            <button className='group flexx text-primary border border-[#ccc] py-2 px-4 rounded-lg w-max mt-8 text-sm hover:bg-red-500 hover:text-white' onClick={handleOpenModalSubmit}>
                                <IoClose className='text-red-500 group-hover:text-white text-xl mr-2'/>
                                End Quiz
                            </button>
                        </div>
                        <div className='flex-1'>
                            <div className='flex-between md:hidden mb-5'>
                                <div className='flexx border border-primary rounded-lg  py-2 px-4 w-max'>
                                    <p className='text-primary'>{quizNumber}/10</p>
                                </div>
                                <QuizTimer date={timer as number}/>
                            </div>
                            {dataQuestions !== null && <QuizItem quizNumber={quizNumber} data={dataQuestions[quizNumber - 1]}/>}
                            <div className='flex-end mt-8 space-x-3'>
                                <button className={clsx('group flexx border border-primary hover:border-transparent hover:bg-primary rounded-lg py-2 px-4 text-sm text-primary hover:text-white', quizNumber === 1 ? 'cursor-default border-transparent bg-gray-200 hover:bg-gray-200 hover:text-primary' : '')} onClick={handlePrevious}>
                                    <IoIosArrowRoundBack className={clsx('text-xl mr-2', quizNumber === 1 ? 'group-hover:text-primary' : 'group-hover:text-white')}/>
                                    Previous
                                </button>
                                <button className={clsx('group flexx border border-primary hover:border-transparent hover:bg-primary rounded-lg py-2 px-4 text-sm text-primary hover:text-white', quizNumber === 10 ? 'bg-primary hover:bg-primary-hover text-white' : '')} onClick={quizNumber === 10 ? handleOpenModalSubmit : handleNext}>
                                    {quizNumber === 10 ? 'Submit' : 'Next'}
                                    {quizNumber < 10 && <IoIosArrowRoundForward className='text-xl ml-2 text-primary group-hover:text-white'/>}
                                </button>
                            </div>
                            <div className="flex-end">
                                <button className='group flexx md:hidden text-primary border border-red-500 py-2 px-4 rounded-lg w-max mt-8 text-sm hover:bg-red-500 hover:text-white hover:border-transparent' onClick={handleOpenModalSubmit}>
                                    <IoClose className='text-red-500 group-hover:text-white text-xl mr-2'/>
                                    End Quiz
                                </button>
                            </div>
                        </div>
                    </div>
                )}            
                <QuizSubmitConfirmation isOpen={isOpen} closeModal={() => setIsOpen(false)}/>
            </div>
        </>
    )
}   

export default Course