import React, {useState} from 'react'
import {FaAlignLeft, FaUserCircle, FaCaretDown, FaCaretUp} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import {useAppContext} from '../context/AppContext.js'
import Wrapper from '../assets/wrappers/Navbar.js'
import Logo from './Logo.js'

const Navbar = () => {

  const [showLogout, setShowLogout] = useState(false)
  const {user, toggleSidebar, logoutUser, showSidebar} = useAppContext()

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          {
            showSidebar ? <ImCross /> : <FaAlignLeft />
          }
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>Dashboard</h3>
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user.name}
            {
              !showLogout ? <FaCaretDown /> : <FaCaretUp />
            }
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar