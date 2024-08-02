import { useState } from 'react'
import clsx from 'clsx'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { IoSearch, IoClose } from "react-icons/io5"

const SearchInput = () => {
    const location = useLocation()
    const [_, setSearchParams] = useSearchParams()
    const [isFocus, setIsFocus] = useState(false)
    const newQueryParameters: URLSearchParams = new URLSearchParams()
    const queries = queryString.parse(location.search)

    const handleSearch = (value: string) => {
        if(value === '') {
            newQueryParameters.delete('q')
        } else {
            newQueryParameters.set('q', value)
        }
        setSearchParams(newQueryParameters)
    }

    const handleReset = () => {
        newQueryParameters.delete('q')
        setSearchParams(newQueryParameters)
    }
    
    return (
        <div className={clsx('w-full flexx border rounded-lg px-4', isFocus ? 'border-2 border-primary' : 'border-[#ccc]')}>
            <IoSearch className='text-lg sm:text-xl text-primary mr-5'/>
            <input 
                type="text"
                value={queries?.q as string || ''} 
                onChange={(e) => handleSearch(e.target.value)} 
                onBlur={() => setIsFocus(false)} 
                onFocus={() => setIsFocus(true)} 
                className='flex-1 text-primary outline-none py-2' placeholder='Enter your course'/>
            {queries?.q && <IoClose className='text-lg sm:text-xl text-red-500 ml-3 cursor-pointer' onClick={handleReset}/>}
        </div>
    )
}

export default SearchInput