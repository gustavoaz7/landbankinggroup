import { FC, useState, ChangeEvent } from 'react';
import { Navigate } from "react-router-dom"
import { Button } from '../components/Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../constants';


export const LoginPage: FC = () => {
	const [ username, setUsername ] = useState('');
  const [ loggedUser, setLoggedUser ] = useLocalStorage(STORAGE_KEYS.LOGGED_USER, '')

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => setUsername(event.target.value);

	const handleSubmit = () => {
		setLoggedUser(username);
	};

	if (loggedUser) {
		return <Navigate to='/' replace />
	}

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold leading-9 text-gray-900">
				Sign in to your account
			</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
					Username
				</label>
				<div className="mt-1 mb-4">
					<input
						className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1
							ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset
							focus:ring-indigo-600 sm:text-sm sm:leading-6"
						id="username"
						name="username"
						required
						value={username}
						onChange={handleInputChange}
						/>
				</div>
				<Button type="submit" className='w-full'>Sign in</Button>
			</form>
		</div>
	)
}
