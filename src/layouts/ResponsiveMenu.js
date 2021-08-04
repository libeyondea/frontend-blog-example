import { isEmpty } from 'lodash';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsSearch } from 'react-icons/bs';
import useSWR from 'swr';

import CustomImage from '@/common/components/CustomImage';
import CustomLink from '@/common/components/CustomLink';
import CustomToggle from '@/common/components/CustomToggle';
import navbarMenu from '@/layouts/navbarMenu';

const ResponsiveMenu = ({ showResMenu, setShowResMenu }) => {
	const handleClose = () => setShowResMenu(false);

	const { data: categories } = useSWR(`/categories`, {
		revalidateOnFocus: false
	});

	return (
		<Offcanvas show={showResMenu} onHide={handleClose} scroll backdrop style={{ width: '17rem' }}>
			<Offcanvas.Header closeButton className="border-bottom px-4">
				<Offcanvas.Title>
					<CustomLink href="/" className="d-flex align-items-center text-dark text-decoration-none">
						<CustomImage
							className="rounded-circle"
							src={process.env.LOGO_URL}
							width={40}
							height={40}
							alt={process.env.SITE_NAME}
							layout="fixed"
						/>
						<span className="ms-2 fs-4 fw-bolder">{process.env.SITE_NAME}</span>
					</CustomLink>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="d-flex flex-column p-0">
				<div className="p-4 border-bottom mb-3">
					<form className="d-flex align-items-center border rounded-pill px-3 bg-light">
						<input
							type="search"
							className="form-control border-0 bg-light py-2 px-0"
							placeholder="Search..."
							aria-label="Search"
						/>
						<button type="button" className="border-0 bg-transparent p-0 d-flex">
							<BsSearch />
						</button>
					</form>
				</div>
				<Accordion as="ul" className="list-group px-2">
					{!categories ? (
						<li className="list-group-item border-0 py-2 px-3 mb-1">
							<div className="">Loading...</div>
						</li>
					) : (
						!isEmpty(categories?.data) && (
							<li className="list-group-item border-0 p-0">
								<CustomToggle eventKey="0">
									<React.Fragment>Category</React.Fragment>
								</CustomToggle>
								<Accordion.Collapse eventKey="0">
									<>
										{categories?.data?.map((category) => (
											<CustomLink href={`/category/${category.slug}`} className="dropdown-item p-2 ps-4 mb-1" key={category.id}>
												{category.title}
											</CustomLink>
										))}
									</>
								</Accordion.Collapse>
							</li>
						)
					)}
					<li className="list-group-item border-0 p-0">
						<CustomToggle eventKey="1">
							<React.Fragment>More</React.Fragment>
						</CustomToggle>
						<Accordion.Collapse eventKey="1">
							<>
								{navbarMenu?.map((item, index) => (
									<CustomLink href={item.href} className="dropdown-item p-2 ps-4 mb-1" key={index}>
										{item.name}
									</CustomLink>
								))}
							</>
						</Accordion.Collapse>
					</li>
				</Accordion>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ResponsiveMenu;
