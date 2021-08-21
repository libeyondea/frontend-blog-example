import { isEmpty } from 'lodash';
import React from 'react';

import ArticleCard from '@/common/components/ArticleCard';
import BoxCard from '@/common/components/BoxCard';
import MetaSeo from '@/common/components/MetaSeo';
import Pagination from '@/common/components/Pagination';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import MainLayout from '@/layouts/MainLayout';

const Tag = ({ tag, articlesTag }) => {
	return (
		<>
			<MetaSeo
				title={tag?.data?.title}
				description={tag?.data?.content}
				canonical={`${process.env.WEBSITE_URL}/tag/${tag?.data?.slug}`}
				openGraph={{
					title: tag.data.title
				}}
			/>
			<MainLayout>
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
							<BoxCard>No articles</BoxCard>
						</div>
					</div>
				) : (
					<>
						<div className="row row-cols-1 g-4">
							{articlesTag?.data?.map((article) => (
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
						<Pagination total={articlesTag?.meta?.total} limit={process.env.LIMIT_PAGE.ARTICLES} classNameContainer="mt-4" />
					</>
				)}
			</MainLayout>
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

export default Tag;
