import React, {useEffect} from 'react'
import { useAppContext } from '../context/AppContext.js'
import Wrapper from '../assets/wrappers/JobsContainer.js'
import Job from './Job.js'
import Loading from './Loading.js'
import PageBtnContainer from './PageBtnContainer.js'

const JobsContainer = () => {

  const {isLoading, getJobs, jobs, totalJobs, page, numOfPages, search, searchType, searchStatus, sort} = useAppContext()

  useEffect(() => {
    getJobs()
  }, [page, search, searchType, searchStatus, sort])

  if(isLoading) {
    return <Loading center />
  }

  if(jobs.length === 0) {
    return <Wrapper>
      <h2>No jobs to display</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
      <h5>{totalJobs} {jobs.length > 1 ? 'jobs' : 'job'} found</h5>
      <div className='jobs'>
        {
          jobs.map((job) => {
            return <Job key={job._id} {...job}></Job>
          })
        }
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer