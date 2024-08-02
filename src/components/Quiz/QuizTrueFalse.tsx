interface PropsTypes {
    answerInLS: null | string
    chooseAnswer: (answer: string) => void
}

const QuizTrueFalse = ({answerInLS, chooseAnswer}: PropsTypes) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        chooseAnswer(e.target.value)
    }
    return (
        <div className='flex flex-col space-y-3 mt-5'>
            <div className='flexx space-x-3'>
                <input type="radio" value='True' checked={answerInLS === 'True'} onChange={handleChange}/>
                <label className='text-primary'>True</label>
            </div>
            <div className='flexx space-x-3'>
                <input type="radio" value='False' checked={answerInLS === 'False'} onChange={handleChange}/>
                <label className='text-primary'>False</label>
            </div>
        </div>
    )
}

export default QuizTrueFalse