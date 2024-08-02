import Hero from '../components/Hero'
import HeadingPage from '../components/HeadingPage'

const Home = () => {
    return (
        <>
            <HeadingPage title='Home page' content='Home page'/>
            <div className='mt-20'>
                <Hero/>
            </div>
        </>
    )
}

export default Home