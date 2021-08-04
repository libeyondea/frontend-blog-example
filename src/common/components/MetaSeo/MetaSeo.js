import { DefaultSeo } from 'next-seo';
import { NextSeo } from 'next-seo';
import SEO from 'next-seo.config';

const Meta = ({ ...props }) => {
	return (
		<>
			<DefaultSeo {...SEO} />
			<NextSeo {...props} />
		</>
	);
};

export default Meta;
