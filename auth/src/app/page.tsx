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
                router.push('/auth/login')
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
          <Link href='/Admin'>Admin</Link>
        </div>
   )
}

export default Home