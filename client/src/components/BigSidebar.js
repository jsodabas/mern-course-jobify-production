import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar.js'
import {useAppContext} from '../context/AppContext.js'
import Logo from './Logo.js'
import NavLinks from './NavLinks.js'

const BigSidebar = () => {

  const {showSidebar} = useAppContext()

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar