import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SharedLayout from './Components/SharedLayout'
// import EndUser from './Components/Roles/EndUser/EndUser'
// import Level1 from './Components/Roles/Level1/Level1'
// import Level2 from './Components/Roles/Level2/Level2'
// import ERP from './Components/Roles/ERP/ERP'
import Error from './Pages/Error'
import StateProvider from './utils/StateProvider'

const App = () => {
  return (
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<SharedLayout />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  )
}

export default App
