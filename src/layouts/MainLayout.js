import React from 'react';

import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const LayoutComponent = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className="container-xl my-4">
				<div className="row">
					<div className="col-12 col-lg-9">{children}</div>
					<div className="col-12 col-lg-3 d-none d-lg-block">
						<div className="sticky-top">
							<Sidebar />
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default LayoutComponent;
