import { useState } from 'react'
import queryString from 'query-string'
import { coursesData } from '../utils/courses'
import { useLocation } from 'react-router-dom'
import QuizConfigurationModal from './Modal/QuizConfigurationModal'

// ###CLEAR### ✅

const CourseList = () => {
    const location = useLocation()
    const queries = queryString.parse(location.search)
    const queryQ: string = (queries?.q as string)?.toLowerCase() || ''
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dataTemp, setDataTemp] = useState<null | CourseTypes>(null)

    const handleClick = (data: CourseTypes) => {
        setIsOpen(true)
        setDataTemp(data)
    }

    return (
        <div>
            <h2 className='text-lg font-normal mb-4 text-primary'>Select a course to make quizzes of it</h2>
            <div className='flex flex-col space-y-3'>
                {coursesData.filter(course => course.title.toLowerCase().includes(queryQ)).map((course: CourseTypes) => (
                    <div className='flex-between shadow-sm py-4 px-2 pr-6 group border-b border-gray-200 hover:border-2 hover:border-[#424769] rounded-lg cursor-pointer transition duration-200' key={course.id} onClick={() => handleClick(course)}>
                        <div className='flexx space-x-5'>
                            <div className='h-[70px]'>
                                <img src={course.image} alt={course.title} className='w-full h-full object-contain'/>
                            </div>
                            <div className='flex flex-col text-primary '>
                                <h3 className='mb-3 font-medium'>{course.title} course</h3>
                                <p className='text-sm'>10 Questions</p>
                            </div>
                        </div>
                        <button className='hidden md:inline-flex text-sm text-primary font-normal'>Enroll Now</button>
                    </div>
                ))}
            </div>
            {dataTemp && (
                <QuizConfigurationModal 
                    isOpen={isOpen}
                    dataTemp={dataTemp}
                    closeModal={() => setIsOpen(false)}/>
                )}
        </div>
    )
}

export default CourseList