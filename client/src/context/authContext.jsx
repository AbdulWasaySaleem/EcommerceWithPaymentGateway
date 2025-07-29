import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  })

  // Load token from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, [])

  // ✅ Set Authorization header when token changes
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = auth?.token
      ? `Bearer ${auth.token}`
      : '';
  }, [auth.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }
