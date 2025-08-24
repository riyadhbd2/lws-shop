import React from 'react'

const Rating = ({value}) => {

    const stars = Array(value).fill(<span className='text-yellow-400'>★</span>)
  return (
    <div className='flex'>
        {
            stars.map((star, index)=>(
                <p key={index}>{star}</p>
            ))
        }
    </div>
  )
}

export default Rating