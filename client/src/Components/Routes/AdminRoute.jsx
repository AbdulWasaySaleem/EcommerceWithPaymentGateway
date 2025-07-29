import { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { Outlet } from 'react-router-dom'
import Spinner from '../spinner'
import axiosInstance from '../../utils/axiosInstance'

//Protectigng route so canta cces without login
const AdminRoute =  () => {
  const [ok, setOk] = useState(false)
  const [auth] = useAuth()
  
  useEffect(()=>{
    const authcheck = async ()=>{
      const res = await axiosInstance.get("/v1/auth/admin-auth")
      if(res.data.ok) {
        setOk(true)
      }else{
        setOk(false)
      }
    }
    if (auth?.token) authcheck()
  },[auth?.token])
  return (
    ok ? <Outlet/> : <Spinner path=''/>
  )
}

export default AdminRoute