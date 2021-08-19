import React, { useState, useEffect } from 'react';

export default function Home(props) {
	const [token, setToken] = useState(''); //authenticated
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');
	const [toggle, setToggle] = useState(true);
	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};
	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (err) {
			console.error(err);
		}
	};

	const handleRegister = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	return (
		<div>
			{!token ? (
				<>
					<button onClick={() => setToggle(!toggle)}>
						{toggle ? 'Show Register' : 'Show Login'}
					</button>
					{toggle ? (
						<form onSubmit={handleLogin}>
							<input
								type="text"
								id="username"
								value={user.username}
								onChange={handleChange}
							/>
							<input
								type="password"
								id="password"
								value={user.password}
								onChange={handleChange}
							/>
							<input type="submit" value="Login" />
						</form>
					) : (
						<form onSubmit={handleRegister}>
							<input
								type="text"
								id="username"
								value={user.username}
								onChange={handleChange}
							/>
							<input
								type="password"
								id="password"
								value={user.password}
								onChange={handleChange}
							/>
							<input type="submit" value="Register" />
						</form>
					)}
				</>
			) : (
				<>
					<div>Hello from some {loggedInUser}</div>
				</>
			)}
		</div>
	);
}
