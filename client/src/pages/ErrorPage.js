import React from 'react'
import {Link} from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage.js'

const ErrorPage = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page URL not found</h3>
        <p>It looks like there's no page URL you're trying to look for.</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default ErrorPage