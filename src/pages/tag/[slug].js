import { isEmpty } from 'lodash';
import { NextSeo } from 'next-seo';
import React from 'react';

import ArticleCardComponent from '@/common/components/ArticleCard/components';
import BoxCardComponent from '@/common/components/BoxCard/components';
import PaginationComponent from '@/common/components/Pagination/components';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import LayoutComponent from '@/modules/layout/components';
import SidebarComponent from '@/modules/sidebar/components';

const TagComponent = ({ tag, articlesTag }) => {
	return (
		<>
			<NextSeo
				title={tag?.data?.title}
				description={tag?.data?.content}
				canonical={`${process.env.WEBSITE_URL}/tag/${tag?.data?.slug}`}
				openGraph={{
					title: tag.data.title
				}}
			/>
			<LayoutComponent>
				<main className="container-xl my-4">
					<div className="row">
						<div className="col-12 col-lg-9">
							<div className="mb-4">
								<h2 className="mb-0">{tag?.data?.title}</h2>
							</div>
							<div className="row mb-4">
								<div className="col">{tag?.data?.content}</div>
							</div>
							<div className="mb-4">
								<h4 className="mb-0">Articles</h4>
							</div>
							{isEmpty(articlesTag?.data) ? (
								<div className="row">
									<div className="col">
										<BoxCardComponent>No articles</BoxCardComponent>
									</div>
								</div>
							) : (
								<>
									<div className="row row-cols-1 g-4">
										{articlesTag?.data?.map((article) => (
											<div className="col" key={article.id}>
												<ArticleCardComponent
													title={article.title}
													slug={article.slug}
													excerpt={article.excerpt}
													categoryTitle={article.category.title}
													categorySlug={article.category.slug}
													author={article.user.full_name}
													createdAt={article.created_at}
													coverImage={article.image}
													authorAvatar={article.user.avatar}
													tags={article.tags}
													minRead="6"
													isExcerpt
												/>
											</div>
										))}
									</div>
									<PaginationComponent
										total={articlesTag?.meta?.total}
										limit={process.env.LIMIT_PAGE.ARTICLES}
										classNameContainer="mt-4"
									/>
								</>
							)}
						</div>
						<div className="col-12 col-lg-3 d-none d-lg-block">
							<div className="sticky-top">
								<SidebarComponent />
							</div>
						</div>
					</div>
				</main>
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		const [resTag, resArticlesTag] = await Promise.all([
			httpRequest.get({
				url: `/tags/${query.slug}`
			}),
			httpRequest.get({
				url: '/articles',
				params: {
					tag: query.slug,
					offset: (pageNumber(query.page) - 1) * process.env.LIMIT_PAGE.ARTICLES,
					limit: process.env.LIMIT_PAGE.ARTICLES
				}
			})
		]);
		if (resTag.data.success && resArticlesTag.data.success) {
			return {
				props: {
					tag: resTag.data,
					articlesTag: resArticlesTag.data
				}
			};
		}
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}

export default TagComponent;