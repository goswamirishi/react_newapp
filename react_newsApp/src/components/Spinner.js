import React from 'react'
import loading from './loader.gif'

const Spinner = () => {
    return (
        <div className='text-center'>
            <img className='my-3' src={loading} alt="loading" style={{ height: '30px', width: '30px' }} />
        </div>
    )
}

export default Spinner
