import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge; chrome=1" />
					<meta name="apple-mobile-web-app-status-bar-style" content="#000" />
					<meta name="theme-color" content="#000" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" sizes="96x96" href="/images/logo-96x96.png" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
