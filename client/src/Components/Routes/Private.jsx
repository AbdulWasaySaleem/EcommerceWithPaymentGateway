import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Outlet } from 'react-router-dom'
import Spinner from '../spinner'
import axiosInstance from '../../utils/axiosInstance'

const Private =  () => {
  const [ok, setOk] = useState(false)
  const [auth] = useAuth()
  
  useEffect(()=>{
    const authcheck = async ()=>{
      const res = await axiosInstance.get("/v1/auth/user-auth")
      if(res.data.ok) {
        setOk(true)
      }else{
        setOk(false)
      }
    }
    if (auth?.token) authcheck()
  },[auth?.token])
  return (
    ok ? <Outlet/> : <Spinner/>
  )
}

export default Private