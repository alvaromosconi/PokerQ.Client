import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear user and token from local storage
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    // Redirect to login page
    navigate('/login');
  }, [navigate])

  // Render nothing
  return null
}
