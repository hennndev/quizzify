import Countdown from 'react-countdown'
import { useNavigate } from 'react-router-dom'
import { IoTimeOutline } from "react-icons/io5"
import { useQuizStore } from '../store/quizStore'
import { useSubmittingStore } from '../store/submittingStore'

interface PropsTypes {
    date: number
}

const QuizTimer = ({date}: PropsTypes) => {
    const navigate = useNavigate()
    const { setQuizData } = useQuizStore()
    const { setSubmitQuiz } = useSubmittingStore()

    const renderer = ({ hours, minutes, seconds, completed }: any) => {
        if(completed) {
            setQuizData(null)
            setSubmitQuiz(true)
            navigate('/score', {replace: true})
        } else {
          return <span>{hours}:{minutes}:{seconds}</span>;
        }
    }
    return (
        <div className='text-primary flex space-x-1 border border-gray-300 rounded-lg py-1.5 px-3 w-max'>
            <IoTimeOutline className='text-lg text-primary mt-0.5'/>
            <Countdown date={date} renderer={renderer}/>
        </div>
    )
}

export default QuizTimer