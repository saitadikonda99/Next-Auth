"use client";
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import './globals.css'

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
            <div className="HomeComponent-in">
                <div className="Home-one">
                    <h1>Next Auth</h1>
                </div>
                <div className="Home-two">
                    <Link href='/Admin'>Admin</Link>
                    <Link href='/auth/login'>Login</Link>
                    <Link href='/' onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </div>
   )
}

export default Home