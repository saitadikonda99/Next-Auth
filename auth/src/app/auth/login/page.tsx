"use client"
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './page.css'

interface User {
	username: string;
	password: string;
}

const Login = () => {

	const router = useRouter()

	const [userData, setUserData] = useState<User>({
		username: '',
		password: ''
	})

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (!userData.username || !userData.password) {
			alert('Please fill all fields')
			return
		}

		try {
			const response = await axios.post('/api/auth/login', userData, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
			)

			console.log(response)

			if (response.status === 200) {
				alert(response.data.message)
				router.push('/')
			}
		} catch (error) {
			alert((error as any).response.data.message)
		}

	}


	const handleInput = (e: React.ChangeEvent<HTMLInputElement> ) => {

		const { name, value } = e.target
		setUserData({
			...userData,
			[name]: value
		})
	}


  return (
      <div className="LoginComponent">
          <div className="LoginComponent-in">
		      <div className="Login-one">
				<h1>NextJS JWT Auth</h1>
			  </div>
			  <div className="Login-two">
				<div className="Login-two-in">
					<div className="Login-in-one">
						<input 
							type="text" 
							value={userData.username}
							onChange={handleInput}
							name='username'
							placeholder='username'
						/>
					</div>
					<div className="Login-in-two">
						<input 
							type="password" 
							value={userData.password}
							onChange={handleInput}
							name='password'
							placeholder='Password'	
						/>
					</div>
					<div className="Login-in-three">
					<button onClick={handleLogin}>Login</button>
					</div>
				</div>
			  </div>
          </div>
      </div>
  )
}

export default Login