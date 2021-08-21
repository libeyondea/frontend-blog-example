import { isEmpty } from 'lodash';
import React from 'react';

import ArticleCard from '@/common/components/ArticleCard';
import BoxCard from '@/common/components/BoxCard';
import MetaSeo from '@/common/components/MetaSeo';
import Pagination from '@/common/components/Pagination';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import MainLayout from '@/layouts/MainLayout';

const Category = ({ category, articlesCategory }) => {
	return (
		<>
			<MetaSeo
				title={category?.data?.title}
				description={category?.data?.content}
				canonical={`${process.env.WEBSITE_URL}/category/${category?.data?.slug}`}
				openGraph={{
					title: category.data.title
				}}
			/>
			<MainLayout>
				<div className="mb-4">
					<h2 className="mb-0">{category?.data?.title}</h2>
				</div>
				<div className="row mb-4">
					<div className="col">{category?.data?.content}</div>
				</div>
				<div className="mb-4">
					<h4 className="mb-0">Articles</h4>
				</div>
				{isEmpty(articlesCategory?.data) ? (
					<div className="row">
						<div className="col">
							<BoxCard>No articles</BoxCard>
						</div>
					</div>
				) : (
					<>
						<div className="row row-cols-1 g-4">
							{articlesCategory?.data?.map((article) => (
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
						<Pagination total={articlesCategory?.meta?.total} limit={process.env.LIMIT_PAGE.ARTICLES} classNameContainer="mt-4" />
					</>
				)}
			</MainLayout>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		const [resCategory, resArticlesCategory] = await Promise.all([
			httpRequest.get({
				url: `/categories/${query.slug}`
			}),
			httpRequest.get({
				url: '/articles',
				params: {
					category: query.slug,
					offset: (pageNumber(query.page) - 1) * process.env.LIMIT_PAGE.ARTICLES,
					limit: process.env.LIMIT_PAGE.ARTICLES
				}
			})
		]);
		if (resCategory.data.success && resArticlesCategory.data.success) {
			return {
				props: {
					category: resCategory.data,
					articlesCategory: resArticlesCategory.data
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

export default Category;
