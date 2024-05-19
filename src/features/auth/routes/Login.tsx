/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hook/useForm'
import { useNavigate } from 'react-router-dom'
import { login, loginWithGoogle, register } from '../../../services/auth-service'
import Spinner from '../../../components/Spinner'
import { GoogleLogin } from '@react-oauth/google'

export function Login() {
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<string>("")

	const { username, password, onInputChange, onResetForm } = useForm({
		username: '',
		password: '',
	})

	function onLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		setLoading(true)

		login(username, password).then(
			() => {
				navigate("/dashboard")
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(error: any) => {
				const resMessage = (
					error.response &&
					error.response.data &&
					error.response.data.message) ||
					error.message ||
					error.toString()

				setMessage(resMessage)
				setLoading(false)
			}
		)
	}
	return (
		<div className='grid grid-rows-[1fr_3fr] h-screen justify-center overflow-auto'>
			
			<header className='flex justify-center items-center'>
				<a href='/'><img src='/images/pokerq_black_logo.png' className='w-[150px] h-[150px]' /></a>
			</header>

			<div className='flex flex-col gap-4 m-2'>
				<form 
					onSubmit={onLogin} 
					className='flex flex-col items-center h-fit gap-4'>
					
					<h1 className='text-2xl'>Sign in</h1>
					
					<div className='input-group flex flex-col gap-2'>
						<input
							type="username"
							name="username"
							id="username"
							value={username ? username : ''}
							onChange={onInputChange}
							required
							placeholder="Username"
							className='input w-80 rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:border-purple-500' />
						<input
							type="password"
							name="password"
							id="password"
							value={password ? password : ''}
							onChange={onInputChange}
							required
							placeholder="Password"
							className='input w-80 rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:border-purple-500' />
					</div>
					
					<div className='flex justify-end w-80'>
						<a href='/forgot-password' className='text-xs text-purple-500'>Forgot password?</a>
					</div>
					
					<button type="submit" disabled={loading} className='w-full text-sm rounded-md h-12 bg-purple-500 text-white hover:animate-pulse justify-center items-center flex'>
						{loading
							? (
								<Spinner />
							)
							: <h1>Continue</h1>}
					</button>
				</form>
				
				<div className='flex justify-center gap-4'>
					<p 
						className='text-sm text-center text-slate-600'>
							Don't have an account yet? &nbsp;
						<a 
							href='/register' 
							className='text-purple-500 font-bold'>
								Sign up
						</a>
					</p>
				</div>
				
				<div className="flex items-center justify-center mt-6">
					<hr className="border-t border-gray-300 w-full" />
					<span className="px-2 text-gray-500 bg-white"> 
						OR 
					</span>
					<hr className="border-t border-gray-300 w-full" />
				</div>
				<div className='flex justify-center gap-4 w-full'>
					<GoogleLogin onSuccess={(credentialResponse) => {
						loginWithGoogle(credentialResponse.credential)
							.then(() => {
								navigate('/dashboard')
							})
							.catch((error) => {
								console.error(error)
							})
					}}/>
				</div>
			</div>
		</div>
	)
}
