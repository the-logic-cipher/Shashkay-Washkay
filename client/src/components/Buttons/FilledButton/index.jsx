import React from 'react'
import {Link} from "react-router-dom";

const FilledButton = (props) => {
  return (
    <Link to={props.link} className='fs-5 px-5 py-3 text-white text-decoration-none' style={{background:"#243c68", width:"fit-content"}}>
       {props.title}
    </Link>
  )
}

export default FilledButton
