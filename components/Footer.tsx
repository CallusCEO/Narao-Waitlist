'use client';

import React from 'react';
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';

const Footer = () => {
	return (
		<>
			<div className={styles.containerAbove}>
				<Image
					src={'/images/pfp.png'}
					width={48}
					height={48}
					alt=''
					style={{ borderRadius: '50%' }}
				/>
				<p>Contact the developer</p>
			</div>
			<div className={styles.rule}></div>
			<div className={styles.container}>
				<a href='https://x.com/sirius_callus'>
					<div className={styles.iconContainer}>
						<div className={styles.xIcon}></div>
					</div>
				</a>
				<a href='https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsttGTrLhtJxHmrGmtvDFCcsRjgjjHSchZmHGZDFQCtmRgghBcGKvKNGjhVvvqKwcmXgtGwV'>
					<div className={styles.iconContainer}>
						<div className={styles.emailIcon}></div>
					</div>
				</a>
			</div>
		</>
	);
};

export default Footer;
