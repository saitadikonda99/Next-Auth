"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './page.css'

const UnAuth = () => {
    const router = useRouter()

    useEffect( () =>{
        setTimeout( () => {
            router.push('/')
        }, 3000)
    })

  return (
        <div className="UnAuthComponent">
            <h1>This Page is UnAuthorized !</h1>
        </div>
  )
}

export default UnAuth