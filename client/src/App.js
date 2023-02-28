import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Landing, ErrorPage, Register, ProtectedRoute} from './pages/index.js'
import {AddJob, AllJobs, Profile, SharedLayout, Stats} from './pages/dashboard/index.js'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
          <Route path="stats" element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App