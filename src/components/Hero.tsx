import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className='flex-center flex-col -mt-12'>
            <h1 className='text-primary text-4xl md:text-5xl font-semibold text-center !leading-[1.3]'>Grow Your <span className='font-extrabold bg-gradient-to-r from-[#2D3250] via-blue-600 to-blue-900 bg-clip-text text-transparent'>KNOWLEDGE</span> <br /> and Get Your Best Scores</h1>
            <p className='mt-5 text-primary max-w-[600px] text-center leading-[1.6]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nihil provident nostrum natus incidunt? Quasi.</p>
            <button onClick={() => navigate('/courses')} className='bg-primary hover:bg-primary-hover text-white py-3 px-5 rounded-lg mt-5 text-base md:text-lg'>Explore all course</button>
        </div>
    )
}
export default Hero