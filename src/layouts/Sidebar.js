import { isEmpty } from 'lodash';
import React from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink';

const Sidebar = () => {
	const { data: categories } = useSWR(`/categories`, {
		revalidateOnFocus: false
	});

	return (
		<>
			{!categories ? (
				<div className="">
					<ul className="list-group list-group-flush">
						<li className="list-group-item px-0 py-0">Loading...</li>
					</ul>
				</div>
			) : (
				!isEmpty(categories?.data) && (
					<div className="">
						<div className="pb-2">
							<h5 className="mb-0 font-monospace">Categories</h5>
						</div>
						<ul className="list-group list-group-flush">
							{categories?.data?.map((category) => (
								<li className="list-group-item d-flex justify-content-between align-items-center px-0 py-2" key={category.id}>
									<CustomLink href={`/category/${category.slug}`} className="text-decoration-none text-dark">
										{category.title}
									</CustomLink>
									<span className="badge bg-secondary">{category.total_articles}</span>
								</li>
							))}
						</ul>
					</div>
				)
			)}
		</>
	);
};

export default Sidebar;
