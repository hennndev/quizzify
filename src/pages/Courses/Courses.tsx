import CourseList from '../../components/CourseList'
import SearchInput from '../../components/SearchInput'
import HeadingPage from '../../components/HeadingPage'

const Courses = () => {
    return (
        <>
            <HeadingPage title='Courses page' content='Courses page'/>
            <div className='mt-14'>
                <div className='flex flex-col mb-10'>
                    <h1 className='text-primary text-xl font-medium mb-4'>Find course what you want to try</h1>
                    <SearchInput/>
                </div>
                <CourseList/>
            </div>
        </>
    )
}
export default Courses