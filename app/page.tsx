import Image from 'next/image';
import styles from '@/styles/page.module.css';
import Navbar from '@/components/Navbar';
import Form from '@/components/Form';

export default function Home() {
	return (
		<div className={styles.page}>
			<Navbar />
			<div className={styles.title}>
				<h1>A Note-Taking App for Students</h1>
				<div className={styles.rule}></div>
				<h2>But not only</h2>
				<a href='#' className={styles.buttonSignUp}>
					Join the waitlist
					<Image
						src={'/images/enter.png'}
						width={32}
						height={32}
						alt=''
						style={{ marginLeft: 12 }}
					/>
				</a>
				<div className={styles.infoMainContainer}>
					<div className={styles.infoContainer}>
						<h1>Note-Taking</h1>
						<p>
							A note-taking tool with Markdown support, organized
							into structured notebooks.
						</p>
						<Image
							src={'/images/note-taking.png'}
							width={128}
							height={128}
							alt=''
							style={{
								position: 'absolute',
								bottom: -24,
								left: -24,
								opacity: 0.2,
								transform: 'rotate(35deg)',
							}}
						/>
					</div>
					<div className={styles.infoContainer}>
						<h1>Calendar & Timetable</h1>
						<p>
							An intuitive calendar and timetable to keep track of
							your classes and deadlines.
						</p>
						<Image
							src={'/images/calendar.png'}
							width={128}
							height={128}
							alt=''
							style={{
								position: 'absolute',
								bottom: -36,
								opacity: 0.2,
							}}
						/>
					</div>
					<div className={styles.infoContainer}>
						<h1>To-do List</h1>
						<p>
							A to-do list to keep track of your tasks and
							reminders.
						</p>
						<Image
							src={'/images/check-circle.png'}
							width={128}
							height={128}
							alt=''
							style={{
								position: 'absolute',
								bottom: -24,
								right: -24,
								opacity: 0.2,
								transform: 'rotate(-35deg)',
							}}
						/>
					</div>
				</div>
			</div>
			<Form />
		</div>
	);
}
