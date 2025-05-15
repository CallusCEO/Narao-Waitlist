'use client';

import React, { useState } from 'react';
import styles from '@/styles/Form.module.css';
import Image from 'next/image';

type Status = 'student' | 'professional' | 'retired' | 'other';
type Email = string;

const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState<Email>('');
	const [status, setStatus] = useState<Status>('student');
	const [message, setMessage] = useState('');
	const [isSent, toggleSent] = useState(false);

	const handleEmail = (email: Email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setMessage('Invalid email format');
			return false;
		}
		setMessage('');
		return true;
	};

	interface ApiResponse {
		message?: string;
		error?: string;
	}

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault(); // Prevent the default form submission
		if (!email || !name || !status) {
			setMessage('Please fill in all fields correctly.');
			return; // Stop if the email is invalid
		}
		if (!handleEmail(email)) {
			return; // Stop if the email is invalid
		}

		toggleSent(true);

		try {
			const response = await fetch('/api/waitlist', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, name, status }),
			});

			const data: ApiResponse = await response.json();

			if (response.ok) {
				setMessage(`Welcome ${name}!`);
				// Clear form fields
				setEmail('');
				setName('');
				setStatus('student');
			} else {
				setMessage("Oops, haven't you already signed in?");
			}
		} catch (error) {
			console.error('Fetch error:', error);
			setMessage('Oops!');
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Join the Waitlist</h1>

			<div
				className={styles.innerContainer}
				style={{ pointerEvents: isSent ? 'none' : 'auto' }}
			>
				<div className={styles.nameContainer}>
					<h3 className={styles.subtitle}>Name</h3>
					<textarea
						name='name'
						id='name'
						placeholder='e.g. Bruce Wayne'
						className={styles.textarea}
						maxLength={20}
						onChange={(e) => setName(e.target.value)}
						value={name}
					></textarea>
					<p className={styles.note}>*Max 20 characters</p>
				</div>
				<div className={styles.emailContainer}>
					<h3 className={styles.subtitle}>Email</h3>
					<textarea
						name='email'
						id='email'
						className={styles.textarea}
						placeholder='e.g. example@gmail.com'
						maxLength={60}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					></textarea>
				</div>
				<div className={styles.emailContainer}>
					<h3 className={styles.subtitle}>Statut</h3>
					<div className={styles.selectContainer}>
						<select
							className={styles.select}
							name='status'
							id='status'
							onChange={(e) =>
								setStatus(e.target.value as Status)
							}
							value={status}
						>
							<option value='student'>Student</option>
							<option value='professional'>Professional</option>
							<option value='retired'>Retired</option>
							<option value='other'>Other</option>
						</select>
						<Image
							src={'/images/down-arrow.png'}
							width={20}
							height={20}
							alt=''
							className={styles.arrow}
						/>
					</div>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
				>
					<button className={styles.submit} type='submit'>
						Submit
						<Image
							src={'/images/submit.png'}
							width={28}
							height={28}
							alt=''
							style={{ marginLeft: 12 }}
						/>
					</button>
				</form>
			</div>
			<Image
				src={'/images/file.png'}
				width={164}
				height={164}
				alt=''
				style={{
					position: 'absolute',
					bottom: -24,
					right: -24,
					opacity: 0.2,
					transform: 'rotate(-35deg)',
					zIndex: -1,
				}}
			/>
			{isSent && (
				<div className={styles.loadingContainer}>
					{message ? (
						<>
							<p
								className={`${styles.message} ${
									message.includes('Oops') &&
									styles.messageError
								}`}
							>
								{message}
							</p>
							<p className={styles.messageAlt}>
								{message.includes('Welcome')
									? 'You were successfully signed in.'
									: 'An error occured while signing you in'}
							</p>
							<button
								className={styles.buttonLoading}
								onClick={() => toggleSent(false)}
							>
								<Image
									width={16}
									height={16}
									src={'/images/close.png'}
									alt='Close'
								/>
							</button>
						</>
					) : (
						<>
							<div className={styles.loadingCircle}></div>
							<p className={styles.messageLoading}>
								Signing you in...
							</p>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Form;
