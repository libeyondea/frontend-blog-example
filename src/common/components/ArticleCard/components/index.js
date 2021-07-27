import { isEmpty } from 'lodash';
import React from 'react';

import CustomImageComponent from '@/common/components/CustomImage/components';
import CustomLinkComponent from '@/common/components/CustomLink/components';
import timeAgo from '@/common/utils/timeAgo';

const ArticleCardComponent = ({
	title,
	slug,
	excerpt,
	coverImage,
	categoryTitle,
	categorySlug,
	author,
	authorAvatar,
	tags,
	minRead,
	createdAt,
	isExcerpt = false,
	isVertical = false
}) => {
	return (
		<div className="card border overflow-hidden position-relative rounded-0 border-0">
			<div className="row g-0">
				<div className={`${isVertical ? 'col-12' : 'col-3'}`}>
					<CustomImageComponent className="rounded-3" src={coverImage} width={666} height={444} alt={title} />
				</div>
				<div className={`${isVertical ? 'col-12' : 'col-9 ps-2 ps-sm-3'}`}>
					<div className="card-body position-static p-0">
						<div className="d-flex align-items-center mb-3">
							<div className="me-1">
								<CustomLinkComponent
									href={`/`}
									className="text-decoration-none d-inline-block d-flex align-items-center"
								>
									<CustomImageComponent
										src={authorAvatar}
										className="rounded-circle"
										width={22}
										height={22}
										alt={author}
										layout="fixed"
									/>
								</CustomLinkComponent>
							</div>
							<div className="lh-1">
								<div className="d-flex align-items-center">
									<CustomLinkComponent href={`/`} className="text-decoration-none text-dark fw-bolder small">
										{author}
									</CustomLinkComponent>
								</div>
							</div>
						</div>
						<CustomLinkComponent href={`/article/${slug}`} className="text-decoration-none text-dark d-block">
							<h3 className="mb-0 fw-bolder h5">{title}</h3>
						</CustomLinkComponent>
						{isExcerpt && <p className="card-text text-secondary fs-6 mb-0">{excerpt}</p>}
						{!isEmpty(tags) && (
							<div className="mt-2">
								{tags.map((tag) => (
									<CustomLinkComponent
										href={`/tag/${tag.slug}`}
										className="badge rounded-pill text-decoration-none text-secondary border me-1"
										key={tag.id}
									>
										<span className="text-muted">#</span>
										{tag.title}
									</CustomLinkComponent>
								))}
							</div>
						)}
						<div className="d-flex align-items-center small mt-2">
							<span className="text-muted">{timeAgo(createdAt)}</span>
							<span className="text-muted mx-2">·</span>
							<CustomLinkComponent
								href={`/category/${categorySlug}`}
								className="badge rounded-pill bg-secondary text-decoration-none text-white"
							>
								{categoryTitle}
							</CustomLinkComponent>
							<span className="text-muted mx-2">·</span>
							<span className="text-muted">{minRead} mins</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleCardComponent;
