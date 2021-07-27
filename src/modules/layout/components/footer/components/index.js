import moment from 'moment';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLinkComponent from '@/common/components/CustomLink/components';

const FooterComponent = () => {
	return (
		<footer className="py-5 bg-dark">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-3 mb-4">
						<CustomImage
							className="rounded-circle"
							src={process.env.LOGO_URL}
							width={66}
							height={66}
							alt={process.env.SITE_NAME}
						/>
						<small className="d-block text-light">
							Copyright &copy; {moment().year()}
							<CustomLinkComponent
								target="_blank"
								rel="noopener noreferrer"
								href="https://twitter.com/de4th_zone"
								className="text-decoration-none"
							>
								{' '}
								De4th Zone
							</CustomLinkComponent>
						</small>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">Features</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Cool stuff
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Random feature
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Team feature
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Stuff for developers
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Another one
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Last time
								</CustomLinkComponent>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">Resources</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Resource
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Resource name
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Another resource
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Final resource
								</CustomLinkComponent>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">About</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Contact
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Privacy
								</CustomLinkComponent>
							</li>
							<li>
								<CustomLinkComponent href="/" className="text-secondary text-decoration-none">
									Terms
								</CustomLinkComponent>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
