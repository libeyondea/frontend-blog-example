import { isEmpty } from 'lodash';
import React from 'react';

import ArticleCard from '@/common/components/ArticleCard';
import BoxCard from '@/common/components/BoxCard';
import MetaSeo from '@/common/components/MetaSeo';
import Pagination from '@/common/components/Pagination';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import MainLayout from '@/layouts/MainLayout';

const Home = ({ articles }) => {
	return (
		<>
			<MetaSeo />
			<MainLayout>
				<div className="mb-4">
					<h4 className="mb-0">Recent articles</h4>
				</div>
				{isEmpty(articles?.data) ? (
					<div className="row">
						<div className="col">
							<BoxCard>No articles</BoxCard>
						</div>
					</div>
				) : (
					<>
						<div className="row row-cols-1 g-4">
							{articles?.data?.map((article) => (
								<div className="col" key={article.id}>
									<ArticleCard
										title={article.title}
										slug={article.slug}
										excerpt={article.excerpt}
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
						<Pagination total={articles?.pagination?.total} limit={process.env.LIMIT_PAGE.ARTICLES} classNameContainer="mt-4" />
					</>
				)}
			</MainLayout>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		const resArticles = await httpRequest.get({
			url: '/articles',
			params: {
				offset: (pageNumber(query.page) - 1) * process.env.LIMIT_PAGE.ARTICLES,
				limit: process.env.LIMIT_PAGE.ARTICLES
			}
		});

		if (resArticles.data.success) {
			return {
				props: {
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
