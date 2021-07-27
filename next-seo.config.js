const SEO = {
	title: undefined,
	titleTemplate: `%s | ${process.env.SITE_NAME}`,
	defaultTitle: process.env.SITE_NAME,
	description: 'Blog for you.',
	canonical: process.env.WEBSITE_URL,
	openGraph: {
		title: process.env.SITE_NAME,
		type: 'website',
		locale: 'en_IE',
		site_name: process.env.SITE_NAME,
		images: [
			{
				url: 'https://elasticbeanstalk-ap-southeast-1-153036539674.s3.ap-southeast-1.amazonaws.com/images/de4thzone.png',
				width: 800,
				height: 600,
				alt: process.env.SITE_NAME
			}
		]
	},
	twitter: {
		handle: '@de4th_zone',
		site: '@de4th_zone',
		cardType: 'summary_large_image'
	}
};

export default SEO;
