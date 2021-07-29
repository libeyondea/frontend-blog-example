import { isEmpty } from 'lodash';
import React from 'react';

import ArticleCardComponent from '@/common/components/ArticleCard/components';
import BoxCardComponent from '@/common/components/BoxCard/components';
import PaginationComponent from '@/common/components/Pagination/components';
import Meta from '@/common/meta/Meta';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import LayoutComponent from '@/modules/layout/components';
import SidebarComponent from '@/modules/sidebar/components';

const Home = ({ articlesPinned, articles }) => {
	return (
		<>
			<Meta />
			<LayoutComponent>
				<main className="container-xl my-4">
					<div className="row">
						<div className="col-12 col-lg-9">
							{!isEmpty(articlesPinned?.data) && (
								<>
									<div className="mb-4">
										<h4 className="mb-0">Pinned</h4>
									</div>
									<div className="row row-cols-1 g-4 mb-4">
										{articlesPinned?.data?.map((article) => (
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
								</>
							)}
							<div className="mb-4">
								<h4 className="mb-0">Recent articles</h4>
							</div>
							{isEmpty(articles?.data) ? (
								<div className="row">
									<div className="col">
										<BoxCardComponent>No articles</BoxCardComponent>
									</div>
								</div>
							) : (
								<>
									<div className="row row-cols-1 g-4">
										{articles?.data?.map((article) => (
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
										total={articles?.meta?.total}
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
		const [resArticlesPinned, resArticles] = await Promise.all([
			httpRequest.get({
				url: `/articles`,
				params: {
					pinned: 1
				}
			}),
			httpRequest.get({
				url: '/articles',
				params: {
					offset: (pageNumber(query.page) - 1) * process.env.LIMIT_PAGE.ARTICLES,
					limit: process.env.LIMIT_PAGE.ARTICLES
				}
			})
		]);
		if (resArticlesPinned.data.success && resArticles.data.success) {
			return {
				props: {
					articlesPinned: resArticlesPinned.data,
					articles: resArticles.data
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

export default Home;
