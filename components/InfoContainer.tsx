'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/InfoContainer.module.css';

interface Props {
	title: string;
	text: string;
	imgPath: `/${string}.png` | `/${string}.svg`;
	imgTop?: number;
	imgBottom?: number;
	imgLeft?: number;
	imgRight?: number;
}

const InfoContainer = ({
	title,
	text,
	imgPath,
	imgTop,
	imgBottom,
	imgLeft,
	imgRight,
}: Props) => {
	return (
		<div className={styles.infoContainer}>
			<h1>{title}</h1>
			<p>{text}</p>
			<Image
				src={imgPath}
				width={128}
				height={128}
				alt=''
				style={{
					position: 'absolute',
					top: imgTop || undefined,
					bottom: imgBottom || undefined,
					left: imgLeft || undefined,
					right: imgRight || undefined,
					opacity: 0.1,
					transform: 'rotate(35deg)',
				}}
			/>
		</div>
	);
};

export default InfoContainer;
