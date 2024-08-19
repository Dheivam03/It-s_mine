import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage/HomePage'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { PageLayout } from './PageLayout/PageLayout'
import ProfilePage from './pages/Profilepage/ProfilePage'
import useAuthStore from './store/authStore' 

function App() {

  const authuser = useAuthStore( (state)=> state.user)

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authuser ? <HomePage /> : <Navigate to='/auth' /> } />
        <Route path='/auth' element={ !authuser ? <AuthPage /> : <Navigate to='/' /> } />
        <Route path='/:username' element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  )
}

export default App
