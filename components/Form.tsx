'use client';

import React, { useState } from 'react';
import styles from '@/styles/Form.module.css';
import Image from 'next/image';

type Status = 'student' | 'professional' | 'retired' | 'other';
type Email = string;

interface SubmitProps {
	name: string;
	email: Email;
	status: Status;
}

const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState<Email>('');
	const [status, setStatus] = useState<Status>('student');
	const [message, setMessage] = useState('');

	const handleEmail = (email: Email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setMessage('Invalid email format');
			return false;
		}
		setMessage('');
		return true;
	};

	interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

	interface ApiResponse {
		message?: string;
		error?: string;
	}

	const handleSubmit = async (event: HandleSubmitEvent): Promise<void> => {
		event.preventDefault(); // Prevent the default form submission
		if (!email || !name || !status) {
			setMessage('Please fill in all fields correctly.');
			return; // Stop if the email is invalid
		}
		if (!handleEmail(email)) {
			return; // Stop if the email is invalid
		}

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
				setMessage(data.message || 'Successfully joined!');
				// Clear form fields
				setEmail('');
				setName('');
				setStatus('student');
			} else {
				setMessage(
					'An error was encountered while saving your registration. Please try again (you may have already registered).'
				);
			}
		} catch (error) {
			console.error('Fetch error:', error);
			setMessage('An error occurred while submitting. Please try again.');
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Join the Waitlist</h1>

			<div className={styles.innerContainer}>
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
				<p className={styles.message}>{message || null}</p>
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
		</div>
	);
};

export default Form;
