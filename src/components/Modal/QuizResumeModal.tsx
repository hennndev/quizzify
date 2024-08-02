import Modal from 'react-modal'
import QuizTimer from '../QuizTimer'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../../store/quizStore'
import { useTimerStore } from '../../store/timerStore'
import { removeWhiteSpace } from '../../utils/functions'
import { useSubmittingStore } from '../../store/submittingStore'

const customStyles = {
    content: {
        maxWidth: '450px',        
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px'
    },
};

Modal.setAppElement('#root');

const ResumeModal = () => {
    const navigate = useNavigate()
    const { timer, setTimer } = useTimerStore()
    const { setSubmitQuiz } = useSubmittingStore()
    const { quizData, setQuizData } = useQuizStore()

    const handleEnd = () => {
        setQuizData(null)
        setSubmitQuiz(true)
        setTimer(null)
        navigate('/score', {replace: true})
    }

    const handleResume = () => {
        navigate(`/courses/${removeWhiteSpace(quizData?.quizTitle as string)}?category=${quizData?.quizCategory}&difficulty=${quizData?.quizDifficulty}`)
    }
    
    return (
        <Modal
            isOpen
            style={customStyles}>
            <h2 className='text-center text-primary text-lg font-medium mb-2'>{quizData?.quizTitle} quiz</h2>
            <p className='text-primary mb-2 text-center'>Difficulty: {quizData?.quizDifficulty}</p>
            <p className='text-primary mb-2 text-center'>Your quiz still running now. Do you want to continue this quiz?</p>
            <div className='flex-center mb-5'>
                <QuizTimer date={timer as number}/>
            </div>
            <div className='flexx w-full space-x-3'>
                <button className='w-full bg-primary hover:bg-primary-hover text-white rounded-lg outline-none py-2 px-4 text-sm' onClick={handleResume}>Resume Quiz</button>
                <button className='w-full bg-gray-300 text-primary rounded-lg outline-none py-2 px-4 text-sm' onClick={handleEnd}>End Quiz</button>
            </div>
        </Modal>
    )
}

export default ResumeModal