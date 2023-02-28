import React, {useEffect} from 'react'
import { useAppContext } from '../../context/AppContext.js'
import {StatsContainer, Loading, ChartsContainer} from '../../components/index.js'

const Stats = () => {

  const {isLoading, showStats, monthlyApplications} = useAppContext()
  
  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])
  
  if(isLoading) {
    return <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </> 
  )
}

export default Stats