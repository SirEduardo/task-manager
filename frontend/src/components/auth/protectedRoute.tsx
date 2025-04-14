import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

export function ProtectedRoute() {
  const [isAuthenticate, setIsAuthenticate] = useState<Boolean | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/auth', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticate(true) // El usuario está autenticado
        } else {
          setIsAuthenticate(false) // El usuario no está autenticado
        }
      })
      .catch(() => setIsAuthenticate(false))
  }, [])

  if (isAuthenticate === null) return <div>Loading...</div>
  return isAuthenticate ? <Outlet /> : <Navigate to="/plantsList" />
}
