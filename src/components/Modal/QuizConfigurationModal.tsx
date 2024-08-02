import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { IoMdClose } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { removeWhiteSpace } from '../../utils/functions'
import { useQuizStore } from '../../store/quizStore'
import { useUserStore } from '../../store/userStore'
import { useTimerStore } from '../../store/timerStore'
import { useAnswerStore } from '../../store/answerStore'
import { useQuestionsStore } from '../../store/questionsStore'

// ###CLEAR### ✅

interface PropsTypes {
    isOpen: boolean
    dataTemp: CourseTypes
    closeModal: () => void
}

interface QuizFormTypes {
    username: string
    difficulty: string
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
        padding: '20px',
    },
}

Modal.setAppElement('#root');

const QuizConfigurationModal = ({isOpen, dataTemp, closeModal}: PropsTypes) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors}, reset } = useForm<QuizFormTypes>({
        defaultValues: {
            username: '',
            difficulty: ''
        }
    })
    const { setUsername } = useUserStore()
    const { setQuizData } = useQuizStore()
    const { setTimer } = useTimerStore()
    const { setAnswers } = useAnswerStore()
    const { setQuestions } = useQuestionsStore()

    const onSubmit = (values: QuizFormTypes) => {
        setUsername(values.username)
        setQuestions(null)
        setQuizData({
            quizTitle: dataTemp.title,
            quizDifficulty: values.difficulty,
            quizCategory: dataTemp.category
        })
        setAnswers(Array(10).fill(undefined).map((_, idx) => ({
            questNumber: idx + 1,
            questAnswer: null
        })))
        setTimer(Date.now() + ((60 * 1000) * 10))
        navigate(`/courses/${removeWhiteSpace(dataTemp.title)}?category=${dataTemp.category}&difficulty=${values.difficulty}`)
    }
    const handleClose = () => {
        closeModal()
        reset()
    }

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={handleClose}
            contentLabel="Quiz Configuration"
        >
            <h2 className='text-primary font-medium mb-2 text-lg'>Configure your quiz</h2>
            <div className='bg-orange-50 text-primary rounded-lg p-3'>
                <p className='text-sm'>Your score will saved temporarily. If you want to save your score permanently, you must be login first.</p>
            </div>
            <IoMdClose className='text-primary text-lg absolute top-2 right-3 cursor-pointer' onClick={handleClose}/>
            <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='input-control'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' placeholder='Enter your username' className='outline-none text-primary border border-[#ccc] rounded-lg py-2 px-4' {...register('username', {
                        required: {
                            value: true,
                            message: 'Username field is required'
                        }
                    })}/>
                    {errors.username && <small className='text-red-400 text-sm mt-1'>{errors.username?.message}</small>}
                </div>
                <div className='input-control'>
                    <label htmlFor="difficulty">Choose difficulty</label>
                    <select id="difficulty" className='outline-none text-primary border border-[#ccc] rounded-lg py-2 px-4' {...register('difficulty', {
                        required: {
                            value: true,
                            message: 'Difficulty field is required'
                        }
                    })}>
                        <option value='' disabled>Choose difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    {errors.difficulty && <small className='text-red-400 text-sm mt-1'>{errors.difficulty?.message}</small>}
                </div>
                <div className='flex flex-col space-y-2 mt-2'>
                    <p className='text-primary text-[15px]'>Quiz title: <span className='font-medium'>{dataTemp.title}</span></p>
                    <p className='text-primary text-[15px]'>Questions: <span className='font-medium'>10 Questions</span></p>
                    <p className='text-primary text-[15px]'>Duration: <span className='font-medium'>10 Minutes</span></p>
                    <p className='text-primary text-[15px]'>Type: <span className='font-medium'>Multiple Choice & True/False</span></p>
                </div>
                <button type='submit' className='bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-lg w-full outline-none border-none mt-4'>Enroll</button>
            </form>
        </Modal>
    )
}

export default QuizConfigurationModal