"use client";
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const Home = () => {

  const router = useRouter()

  const handleLogout = async () => {

        try {
            const res = await axios.get('/api/auth/logout')

            if (res.status === 200) {
                alert(res.data.message)
                router.push('/')
            }
             
        } catch (error) {
            console.log("")
        }
   }

  return (
        <div className="HomeComponent">
          <h1>Home</h1>
          <Link href='/auth/login'>Login</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
   )
}

export default Home