import { isEmpty } from 'lodash';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsSearch } from 'react-icons/bs';
import useSWR from 'swr';

import CustomImageComponent from '@/common/components/CustomImage/components';
import CustomLinkComponent from '@/common/components/CustomLink/components';
import CustomToggleComponent from '@/common/components/CustomToggle/components';

const ResponsiveMenuComponent = ({ showResMenu, setShowResMenu }) => {
	const handleClose = () => setShowResMenu(false);

	const { data: categories } = useSWR(`/categories`, {
		revalidateOnFocus: false
	});

	return (
		<Offcanvas show={showResMenu} onHide={handleClose} scroll backdrop>
			<Offcanvas.Header closeButton className="border-bottom">
				<Offcanvas.Title>
					<CustomLinkComponent href="/" className="d-flex align-items-center text-dark text-decoration-none">
						<CustomImageComponent
							className="rounded-circle"
							src={process.env.LOGO_URL}
							width={40}
							height={40}
							alt={process.env.SITE_NAME}
							layout="fixed"
						/>
						<span className="ms-2 fs-4 fw-bolder">{process.env.SITE_NAME}</span>
					</CustomLinkComponent>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="d-flex flex-column">
				<form className="d-flex align-items-center border rounded-pill px-3 ms-auto w-100">
					<BsSearch />
					<input type="search" className="form-control border-0 bg-light" placeholder="Search..." aria-label="Search" />
				</form>
				<div className="border-top my-3" />
				<Accordion as="ul" className="list-group">
					{!categories ? (
						<li className="list-group-item border-0 p-0">
							<div className="p-2">Loading...</div>
						</li>
					) : (
						!isEmpty(categories?.data) && (
							<li className="list-group-item border-0 p-0">
								<CustomToggleComponent eventKey="0">
									<React.Fragment>Category</React.Fragment>
								</CustomToggleComponent>
								<Accordion.Collapse eventKey="0">
									<>
										{categories?.data?.map((category) => (
											<CustomLinkComponent
												href={`/category/${category.slug}`}
												className="dropdown-item p-2 ps-3"
												key={category.id}
											>
												{category.title}
											</CustomLinkComponent>
										))}
									</>
								</Accordion.Collapse>
							</li>
						)
					)}
					<li className="list-group-item border-0 p-0">
						<CustomToggleComponent eventKey="1">
							<React.Fragment>More</React.Fragment>
						</CustomToggleComponent>
						<Accordion.Collapse eventKey="1">
							<>
								{process.env.NAVBAR_MENU?.map((item, index) => (
									<CustomLinkComponent href={item.href} className="dropdown-item p-2 ps-3" key={index}>
										{item.name}
									</CustomLinkComponent>
								))}
							</>
						</Accordion.Collapse>
					</li>
				</Accordion>
				<div className="border-top my-3" />
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ResponsiveMenuComponent;
