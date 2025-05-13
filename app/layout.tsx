import type { Metadata } from 'next';
import { Red_Hat_Text, Forum } from 'next/font/google';
import '@/styles/globals.css';

const redHat = Red_Hat_Text({
	variable: '--font-red-hat',
	subsets: ['latin'],
});

const forum = Forum({
	variable: '--font-forum',
	subsets: ['latin'],
	weight: '400',
});

export const metadata: Metadata = {
	title: 'Waiting List Sign Up',
	description:
		'Join early access and be among the first to experience a new all-in-one productivity tool.',
	keywords: [
		'waiting list',
		'early access',
		'productivity app',
		'time management',
		'AI assistant',
		'calendar',
		'note taking',
		'organization',
		'task planner',
		'mobile productivity',
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${redHat.variable} ${forum.variable}`}>
				{children}
			</body>
		</html>
	);
}
