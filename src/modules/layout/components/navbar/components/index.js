import React, { useState } from 'react';
import { BsList, BsSearch } from 'react-icons/bs';

import CustomImageComponent from '@/common/components/CustomImage/components';
import CustomLinkComponent from '@/common/components/CustomLink/components';
import navbarMenu from '@/modules/layout/components/navbar/components/navbarMenu';
import ResponsiveMenuComponent from '@/modules/layout/components/navbar/components/responsiveMenu/components';

const NavbarComponent = () => {
	const [showResMenu, setShowResMenu] = useState(false);
	const handleShow = () => setShowResMenu(true);

	return (
		<>
			<nav className="fixed-top py-2 bg-light border-bottom shadow-sm d-flex align-items-center">
				<div className="container-xl d-flex align-items-center">
					<CustomLinkComponent href="/" className="d-flex align-items-center text-dark text-decoration-none">
						<CustomImageComponent
							className="rounded-circle"
							src={process.env.LOGO_URL}
							width={40}
							height={40}
							alt="Logo"
							layout="fixed"
						/>
						<span className="ms-2 fs-4 d-none d-sm-block fw-bolder">{process.env.SITE_NAME}</span>
					</CustomLinkComponent>
					<ul className="nav d-none d-md-flex ms-3">
						{navbarMenu?.map((item, index) => (
							<li className="nav-item" key={index}>
								<CustomLinkComponent href={item.href} className="nav-link link-dark px-2">
									{item.name}
								</CustomLinkComponent>
							</li>
						))}
					</ul>
					<form className="d-none d-md-flex align-items-center border rounded-pill px-3 ms-auto">
						<BsSearch />
						<input
							type="search"
							className="form-control border-0 bg-light"
							placeholder="Search..."
							aria-label="Search"
						/>
					</form>
					<button
						type="button"
						className="d-md-none d-flex align-items-center border-0 bg-transparent fs-1 p-0 ms-auto"
						onClick={handleShow}
					>
						<BsList />
					</button>
				</div>
			</nav>
			<ResponsiveMenuComponent showResMenu={showResMenu} setShowResMenu={setShowResMenu} />
		</>
	);
};

export default NavbarComponent;
