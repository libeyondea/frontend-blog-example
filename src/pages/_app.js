import '@/styles/globals.scss';
import '@/styles/github-markdown.css';
import 'nprogress/nprogress.css';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { SWRConfig } from 'swr';

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';

import SEO from '../../next-seo.config';

const ProgressBar = dynamic(
	() => {
		return import('@/common/components/ProgressBar/components');
	},
	{ ssr: false }
);

console.log('%cThis is a demo site', 'font-size: 4rem; color: red; font-weight: 600;');

function App({ Component, pageProps }) {
	const router = useRouter();

	return (
		<>
			<DefaultSeo {...SEO} />
			<ProgressBar />
			<SWRConfig
				value={{
					fetcher: fetcher,
					onError: (error, key) => {
						console.log('Errors: ', error);
						if (key === '/current_user') {
							removeCookie('token');
						}
						return error.response;
					},
					shouldRetryOnError: false
				}}
			>
				<Component {...pageProps} key={router.asPath} />
			</SWRConfig>
		</>
	);
}

export default App;
