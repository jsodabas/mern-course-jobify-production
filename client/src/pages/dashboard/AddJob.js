import React from 'react'
import {FormRow, Alert, FormRowSelect} from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'
import { useAppContext } from '../../context/AppContext.js'

const AddJob = () => {

  const {isEditing, isLoading, showAlert, displayAlert, position, company, jobTypeOptions, jobType, statusOptions, status, jobLocation, handleChange, clearValues, createJob, editJob} = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if(isEditing) {
      editJob()
      return
    }
    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }
  
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* Position */}
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
          {/* Company */}
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
          {/* location */}
          <FormRow type="text" labelText='job location' name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
          {/* job type */}
          <FormRowSelect labelText="job type" name="jobType" value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />
          {/* job status */}
          <FormRowSelect labelText="job status" name="status" value={status} handleChange={handleJobInput} list={statusOptions} />
          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' disabled={isLoading}>Submit</button>
            <button className='btn btn-block clear-btn' onClick={(e) => {
              e.preventDefault()
              
              clearValues()
            }}>Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob