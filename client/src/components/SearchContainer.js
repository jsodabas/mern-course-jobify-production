import React, {useState, useMemo} from 'react'
import Wrapper from '../assets/wrappers/SearchContainer.js'
import FormRow from './FormRow.js'
import FormRowSelect from './FormRowSelect.js'
import { useAppContext } from '../context/AppContext.js'

const SearchContainer = () => {

  const [localSearch, setLocalSearch] = useState('')
  const {isLoading, searchType, sortOptions, clearFilters, searchStatus, jobTypeOptions, statusOptions, sort, handleChange} = useAppContext()

  const handleSearch = (e) => {
    handleChange({name: e.target.name, value: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    clearFilters()
  }

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange({name: e.target.name, value: e.target.value})
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow type='text' name='search' value={localSearch} handleChange={optimizedDebounce} />
          {/* search by status */}
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]} />
          <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]} />
          {/* sort */}
          <FormRowSelect labelText='sort' name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
          <button type='submit' className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer