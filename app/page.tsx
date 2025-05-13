'use client';

import Image from 'next/image';
import styles from '@/styles/page.module.css';
import Navbar from '@/components/Navbar';
import Form from '@/components/Form';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import InfoContainer from '@/components/InfoContainer';

export default function Home() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200 && !isScrolled) {
				setIsScrolled(true);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isScrolled]);

	useEffect(() => {
		const handleSmoothScroll = (e: Event) => {
			const target = e.currentTarget as HTMLAnchorElement;
			const href = target.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const targetId = href.substring(1);
				const targetElement = document.getElementById(
					targetId
				) as HTMLElement;
				if (targetElement) {
					const offset = 124; // Navbar height
					const elementPosition =
						targetElement.getBoundingClientRect().top +
						window.scrollY;
					const offsetPosition = elementPosition - offset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth',
					});
				}
			}
		};

		const links = document.querySelectorAll('a[href^="#"]');
		links.forEach((link) => {
			link.addEventListener('click', handleSmoothScroll);
		});

		return () => {
			links.forEach((link) => {
				link.removeEventListener('click', handleSmoothScroll);
			});
		};
	}, []);

	return (
		<div className={styles.page}>
			<Navbar />
			<div className={styles.title}>
				<h1>A Note-Taking App for Students</h1>
				<div className={styles.rule}></div>
				<h2>But not only</h2>
				<a href='#form' className={styles.buttonSignUp}>
					Join the waitlist
					<Image
						src={'/images/enter.png'}
						width={28}
						height={28}
						alt=''
						style={{ marginLeft: 12 }}
					/>
				</a>
				<div className={styles.infoMainContainer} id='about'>
					<InfoContainer
						title='Note-Taking'
						text='A note-taking tool with Markdown support, organized
							into structured notebooks.'
						imgPath='/images/note-taking.png'
						imgBottom={-24}
						imgLeft={-24}
					/>
					<InfoContainer
						title='Calendar & Timetable'
						text='An intuitive calendar and timetable to keep track of
							your classes and deadlines.'
						imgPath='/images/calendar.png'
						imgBottom={-36}
					/>
					<InfoContainer
						title='To-do List'
						text='A minimalistic and simple to-do list to keep track
							of your tasks and reminders.'
						imgPath='/images/check-circle.png'
						imgBottom={-24}
						imgRight={-24}
					/>
				</div>
				<div
					className={`${styles.infoContainer} ${
						isScrolled && styles.infoVisible
					}`}
					style={{ marginTop: 32 }}
				>
					<h1>Additional Info</h1>
					<p>
						The application will be disponible at first on Android
						devices. However, an IOS release is planned.
						<br />
						The application will be free to use, but some features
						will not be accessible for free users (AI, color theme,
						etc...).
					</p>
					<Image
						src={'/images/info.png'}
						width={164}
						height={164}
						alt=''
						style={{
							position: 'absolute',
							top: -48,
							opacity: 0.1,
						}}
					/>
				</div>
			</div>
			<div id='form'>
				<Form />
			</div>
			<Footer />
		</div>
	);
}
