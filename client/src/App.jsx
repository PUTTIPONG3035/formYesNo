
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Profile from './Profile'
import CreateQuestion from './CreateQuestion'
import TestPage from './Testpage'
import Questions from './Questions'
import Narie from './Narie'
import Form from './Form'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/resetPassword/:token' element={<ResetPassword />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/create' element={<CreateQuestion />}></Route>
        <Route path='/questions' element={<Questions />}></Route>
        <Route path='/test' element={<TestPage />}></Route>
        <Route path='/naire' element={<Narie />}></Route>
        <Route path='/form' element={<Form />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
