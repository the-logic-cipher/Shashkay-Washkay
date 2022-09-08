import React from 'react'
import {Link} from "react-router-dom";
import "./outbtn.css"

const OutlinedButton = (props) => {
  return (
    <Link to={props.link} className='fs-5 px-5 py-3 text-decoration-none' >
       {props.title}
    </Link>
  )
}

export default OutlinedButton