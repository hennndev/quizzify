import QuizTrueFalse from './QuizTrueFalse'
import QuizMultipleChoice from './QuizMultipleChoice'
import { useAnswerStore } from '../../store/answerStore'

interface PropsTypes {
    quizNumber: number
    data: QuestionTypes
}

const QuizItem = ({quizNumber, data}: PropsTypes) => {
    const { answers, setAnswer } = useAnswerStore() 
    const findAnswer = () => {
        return answers.find(a => a.questNumber === quizNumber)?.questAnswer as (null | string)
    }
    const chooseAnswer = (answer: string) => {
        setAnswer(quizNumber, answer)
    }
    return (
        <div>
            <h4 className='text-primary text-lg font-normal'>
                {quizNumber}. {data?.question}
            </h4>
            {data.type === 'multiple' ? (
                <QuizMultipleChoice answerInLS={findAnswer()} chooseAnswer={chooseAnswer} data={data}/>
            ) : (
                <QuizTrueFalse answerInLS={findAnswer()} chooseAnswer={chooseAnswer}/>
            )}
        </div>
    )
}

export default QuizItem