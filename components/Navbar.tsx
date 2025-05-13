'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 150);
		};

		window.addEventListener('scroll', handleScroll);
		// Initial check in case user is already scrolled
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav
			className={`${styles.container} ${
				isScrolled ? styles.scrolled : ''
			}`}
		>
			<h1 className={styles.title}>Tomorrow's Learning</h1>
			<ul className={styles.list}>
				<li>
					<a href='#form' className={styles.button}>
						Join Waitlist
					</a>
				</li>
				<li>
					<a href='#about' className={styles.buttonAlt}>
						About
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
