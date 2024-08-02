import clsx from 'clsx'
import { IoCheckmark } from "react-icons/io5"

interface PropsTypes {
    data: QuestionTypes
    answerInLS: null | string
    chooseAnswer: (answer: string) => void
}

function getAlphabetByNumber(number: number) {
    if (number < 1 || number > 26) {
      throw new Error("Number must be between 1 and 26");
    }
    return String.fromCharCode(64 + number);
}

const QuizMultipleChoice = ({data, answerInLS, chooseAnswer}: PropsTypes) => {
    const answers = [...data.incorrect_answers, data.correct_answer]
    return (
        <div className='mt-5'>
            <div className='flex flex-col space-y-5'>
                {answers.map((answer, key) => (
                    <div key={answer} className={clsx('group flex-between border border-[#ccc] py-2 px-4 rounded-lg hover:bg-green-100 cursor-pointer', answerInLS === answer ? 'bg-green-100' : '')} onClick={() => chooseAnswer(answer)}>
                        <p>{getAlphabetByNumber(key + 1)}. {answer}</p>
                        <IoCheckmark className={clsx('text-primary text-lg group-hover:inline-flex', answerInLS === answer ? 'inline-flex' : 'hidden')}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuizMultipleChoice