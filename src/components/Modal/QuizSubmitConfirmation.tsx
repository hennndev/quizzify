import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../../store/quizStore'
import { useTimerStore } from '../../store/timerStore'
import { useSubmittingStore } from '../../store/submittingStore'

interface PropsTypes {
    isOpen: boolean
    closeModal: () => void
}

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
}

Modal.setAppElement('#root');

const QuizSubmitConfirmation = ({isOpen, closeModal}: PropsTypes) => {   
    const navigate = useNavigate()
    const { setQuizData } = useQuizStore()
    const { setTimer } = useTimerStore()
    const { setSubmitQuiz } = useSubmittingStore()

    const handleSubmit = () => {
        setQuizData(null)
        setSubmitQuiz(true)
        setTimer(null)
        navigate('/score', {replace: true})
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Quiz Configuration"
            style={customStyles}>
            <h2 className='text-center text-primary text-lg font-medium mb-2'>Are you sure want to submit this quiz?</h2>
            <p className='text-primary mb-6 text-center'>Your quiz will be calculated to get your score</p>
            <div className='flexx w-full space-x-3'>
                <button className='w-full bg-primary hover:bg-primary-hover text-white rounded-lg outline-none py-2 px-4 text-sm' onClick={handleSubmit}>Submit Quiz</button>
                <button className='w-full bg-gray-300 text-primary rounded-lg outline-none py-2 px-4 text-sm' onClick={closeModal}>Cancel</button>
            </div>
        </Modal>
    )
}

export default QuizSubmitConfirmation