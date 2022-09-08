import React from 'react'
import Card from '../Card'
import data from '../Card/data'

const Featured = () => {
  return (
   <div className='d-flex'>
    {
      data.map((val)=>{
        return(
          <Card
          img={val.img}
          title={val.title}
          price={val.price}
          />
        )
      })
    }
   </div>
  )
}

export default Featured
