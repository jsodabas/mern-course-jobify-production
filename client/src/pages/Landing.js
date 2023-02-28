import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/LandingPage.js'
import {Logo} from '../components/index.js'
import Main from '../assets/images/main.svg'
import { useAppContext } from '../context/AppContext.js'

const Landing = () => {

  const {user} = useAppContext()

  return (
    <>
    {user && <Navigate to="/" />}
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
            {/* info page */}
            <div className='info'> 
                <h1>Job <span>Tracking</span> App</h1>
                <p>I'm baby biodiesel put a bird on it pitchfork green juice kickstarter mixtape shaman tote bag gluten-free. Hella shaman poke, sus succulents JOMO seitan. </p>
                <Link to='/register' className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={Main} alt="job hunt" className='img main-img' />
        </div>
    </Wrapper>
    </>
  )
}

export default Landing