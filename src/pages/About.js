import React, { useState, useEffect } from 'react';

export default function About(props) {
	const [token, setToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	return (
		<>
			{token ? (
				<h1>hi {loggedInUser} you can know all the things</h1>
			) : (
				<h1>You know nothing Jon Snow</h1>
			)}
		</>
	);
}
