/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm } from '../../../hook/useForm';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/auth-service';
import Spinner from '../../../components/Spinner';


export function Register() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string>("");

	const { username, email, password, confirmedPassword, onInputChange, onResetForm } = useForm({
		username: '',
		email: '',
		password: '',
		confirmedPassword: ''
	});

	function onRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		register(username, email, password, confirmedPassword).then(
			() => {
				navigate("/login");
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(error: any) => {
				const resMessage = (
					error.response &&
					error.response.data &&
					error.response.data.message) ||
					error.message ||
					error.toString();

				setMessage(resMessage);
				setLoading(false);
			}
		);
	}

	useEffect(() => {
		onResetForm();
	}, []);

	return (
		<div className='grid grid-rows-[1fr_3fr] h-screen justify-center overflow-auto'>
			<header className='flex justify-center items-center'>
				<img src='/images/pokerq_black_logo.png' className='w-[150px] h-[150px]' />
			</header>


			<div className='flex flex-col gap-4 m-2'>
				<form onSubmit={onRegister} className='flex flex-col items-center h-fit gap-4'>
					<h1 className='text-2xl'>Sign up</h1>
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
							type="email"
							name="email"
							id="email"
							value={email ? email : ''}
							onChange={onInputChange}
							required
							placeholder="Email"
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
						<input
							type="confirmedPassword"
							name="confirmedPassword"
							id="confirmedPassword"
							value={confirmedPassword ? confirmedPassword : ''}
							onChange={onInputChange}
							required
							placeholder="Confirm Password"
							className='input w-80 rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:border-purple-500' />
					</div>
					<button type="submit"
						disabled={loading}
						className='w-full text-sm rounded-md h-12 bg-purple-500 text-white hover:animate-pulse justify-center items-center flex'>
						{loading
							? (
								<Spinner />
							)
							: <h1>Continue</h1>}
					</button>
				</form>
				<div>
					<p
						className='text-sm text-center text-slate-600'>
						Already have an account?
						<a
							href='/login'
							className='text-purple-500 font-bold'> Sign in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
