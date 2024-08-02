import { Link } from 'react-router-dom'
import HeadingPage from '../components/HeadingPage'

const PageNotFound = () => {
    return (
        <>
            <HeadingPage title='Page not found' content=''/>
            <div className='mt-14'>
                <h1 className='mb-5'>Page not found</h1>
                <Link to='/' className='text-primary underline'>Back to homepage</Link>
            </div>
        </>
    )
}

export default PageNotFound