import { useEffect, useState, useRef } from "react"

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [expired, setExpired] = useState(false)
  const prevAuthenticated = useRef(false) 

  const verifySession = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/verify", { credentials: "include" })
      const data = await res.json()

      if (data.authenticated) {
        setAuthenticated(true)
      } else {
        if (prevAuthenticated.current) { 
          setExpired(true) 
        }
        setAuthenticated(false)
      }

      prevAuthenticated.current = data.authenticated
    } catch (err) {
      console.error("Error verificando sesión:", err)
      if (prevAuthenticated.current) setExpired(true)
      setAuthenticated(false)
      prevAuthenticated.current = false
    }
  }

  useEffect(() => {
    verifySession()
    const interval = setInterval(verifySession, 60000) // verifica cada minuto
    return () => clearInterval(interval)
  }, [])

  return { authenticated, expired, setExpired }
}