import moment from 'moment';
import React from 'react';

import CustomImage from '@/common/components/CustomImage';
import CustomLink from '@/common/components/CustomLink';

const Footer = () => {
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
							<CustomLink
								target="_blank"
								rel="noopener noreferrer"
								href="https://twitter.com/de4th_zone"
								className="text-decoration-none"
							>
								{' '}
								De4th Zone
							</CustomLink>
						</small>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">Features</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Cool stuff
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Random feature
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Team feature
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Stuff for developers
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Another one
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Last time
								</CustomLink>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">Resources</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Resource
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Resource name
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Another resource
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Final resource
								</CustomLink>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">About</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Contact
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Privacy
								</CustomLink>
							</li>
							<li>
								<CustomLink href="/" className="text-secondary text-decoration-none">
									Terms
								</CustomLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
