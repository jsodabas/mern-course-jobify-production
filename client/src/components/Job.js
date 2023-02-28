import React from 'react'
import {Link} from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job.js'
import moment from 'moment'
import { useAppContext } from '../context/AppContext.js'
import JobInfo from './JobInfo.js'
import { FaBriefcase, FaCalendar, FaLocationArrow } from 'react-icons/fa'

const Job = ({_id, company, position, jobLocation, jobType, createdAt, status}) => {

  const {setEditJob, deleteJob} = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY') 

  return (
    <Wrapper>
      <header>
      <div className='main-icon'>
        {company.charAt(0)}
      </div>
      <div className='info'>
        <h5>{position}</h5>
        <p>{company}</p>
      </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendar />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>
            {status}
          </div>
        </div>
        <footer>
          <div className='actions'>
            <Link to="/add-job" className='btn edit-btn' onClick={() => setEditJob(_id)}>
              Edit
            </Link>
            <button type='button' className='btn delete-btn' onClick={() => deleteJob(_id)}>Delete</button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job