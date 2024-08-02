import clsx from 'clsx'
import { useAnswerStore } from '../store/answerStore'

interface PropsTypes {
    handleNavigateQuiz: (value: number) => void
}

const QuizNavigation = ({handleNavigateQuiz}: PropsTypes) => {

    const { answers } = useAnswerStore()
    const checkAnswerIsFilled = (questNumber: number) => {
        return answers.find(a => a.questNumber === questNumber)?.questAnswer
    }

    return (
        <div className='mt-5'>
            <div className='w-[300px] sm:flex flex-wrap gap-x-4 gap-y-5'>
                {Array(10).fill('').map((_, index) => (
                    <div key={index} className={clsx('w-10 h-10 flex-center border border-[#ccc] cursor-pointer', checkAnswerIsFilled(index + 1) ? 'bg-primary text-white border-transparent' : '')} onClick={() => handleNavigateQuiz(index + 1)}>
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizNavigation