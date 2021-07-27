import { isEmpty } from 'lodash';
import { NextSeo } from 'next-seo';
import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FaEllipsisH, FaFacebookF, FaTwitter } from 'react-icons/fa';

import ArticleCardComponent from '@/common/components/ArticleCard/components';
import CustomImageComponent from '@/common/components/CustomImage/components';
import CustomLinkComponent from '@/common/components/CustomLink/components';
import httpRequest from '@/common/utils/httpRequest';
import timeFormat from '@/common/utils/timeFormat';
import LayoutComponent from '@/modules/layout/components';
import SidebarComponent from '@/modules/sidebar/components';

const ArticleComponent = ({ article, articlesRelated }) => {
	return (
		<>
			<NextSeo
				title={article.data.title}
				description={article.data.excerpt}
				canonical={`${process.env.WEBSITE_URL}/article/${article.data.slug}`}
				openGraph={{
					type: 'article',
					title: article.data.title,
					images: [
						{
							url: article.data.image,
							width: 800,
							height: 600,
							alt: article.data.title
						}
					]
				}}
			/>
			<LayoutComponent>
				<div className="container-xl my-4">
					<div className="row">
						<div className="col-12 col-lg-9">
							<div className="row">
								<div className="col-12 mb-4">
									<article className="">
										<div>
											<CustomImageComponent
												src={article.data.image}
												className="rounded-3"
												alt="Cover Image"
												layout="responsive"
												width={500}
												height={200}
												isBlur
											/>
										</div>
										<div className="py-3 py-sm-4 border-bottom">
											<div className="mb-3">
												<h1>{article.data.title}</h1>
											</div>
											<div className="mb-3">
												<span className="me-1">Category:</span>
												<CustomLinkComponent
													href={`/category/${article.data.category.slug}`}
													className="badge rounded-pill bg-secondary text-decoration-none text-white"
												>
													{article.data.category.title}
												</CustomLinkComponent>
											</div>
											<div className="mb-3">
												<div className="d-flex justify-content-start align-items-center flex-wrap">
													<CustomLinkComponent
														href={`/`}
														className="text-decoration-none d-inline-block d-flex align-items-center text-dark fw-bold me-3"
													>
														<CustomImageComponent
															width="40"
															height="40"
															src={article.data.user.avatar}
															className="rounded-circle"
															alt={article.data.user.full_name}
															layout="fixed"
														/>
														<span className="ms-2">{article.data.user.full_name}</span>
													</CustomLinkComponent>
													<span className="text-secondary">
														<time dateTime={article.data.created_at}>{timeFormat(article.data.created_at)}</time>
														{article.data.updated_at > article.data.created_at && (
															<em>
																<span> • </span>
																Updated on{' '}
																<time dateTime={article.data.updated_at}>{timeFormat(article.data.updated_at)}</time>
															</em>
														)}
													</span>
												</div>
											</div>
											<div className="my-5">{article.data.content}</div>
											<div className="d-flex justify-content-end align-items-center">
												<div className="me-auto">
													<span className="me-1">Tags:</span>
													{article.data.tags.map((tag) => (
														<CustomLinkComponent
															key={tag.id}
															href={`/tag/${tag.slug}`}
															className="badge rounded-pill text-decoration-none text-secondary border me-1"
														>
															<span className="text-muted">#</span>
															{tag.title}
														</CustomLinkComponent>
													))}
												</div>
												<OverlayTrigger
													trigger="click"
													key="options-article"
													placement="left"
													rootClose
													overlay={
														<Popover id={`popover-positioned-options-article`}>
															<Popover.Header as="h3" className="text-center">
																Options
															</Popover.Header>
															<Popover.Body className="p-0">
																<CustomLinkComponent
																	target="_blank"
																	rel="noopener noreferrer"
																	href={`https://www.facebook.com/sharer.php?u=${process.env.WEBSITE_URL}/article/${article.data.slug}`}
																	className="d-flex align-items-center dropdown-item"
																>
																	<FaFacebookF className="me-1" />
																	Share to Facebook
																</CustomLinkComponent>
																<CustomLinkComponent
																	target="_blank"
																	rel="noopener noreferrer"
																	href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
																		article.data.title
																	)} ${process.env.WEBSITE_URL}/article/${article.data.slug}`}
																	className="d-flex align-items-center dropdown-item"
																>
																	<FaTwitter className="me-1" />
																	Share to Twitter
																</CustomLinkComponent>
															</Popover.Body>
														</Popover>
													}
												>
													<button type="button" className="d-flex align-items-center p-0 border-0 bg-transparent">
														<FaEllipsisH />
													</button>
												</OverlayTrigger>
											</div>
										</div>
									</article>
								</div>
								<div className="col-12">
									{!isEmpty(articlesRelated?.data) && (
										<>
											<div className="mb-4">
												<h4 className="mb-0">Related articles</h4>
											</div>
											<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
												{articlesRelated?.data?.map((article) => (
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
															minRead="6"
															isVertical
														/>
													</div>
												))}
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-3 d-none d-lg-block">
							<div className="sticky-top">
								<SidebarComponent />
							</div>
						</div>
					</div>
				</div>
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		const [resArticle, resArticlesRelated] = await Promise.all([
			httpRequest.get({
				url: `/articles/${query.slug}`
			}),
			httpRequest.get({
				url: `/articles`,
				params: {
					related: query.slug,
					offset: 0,
					limit: process.env.LIMIT_PAGE.ARTICLES_RELATED
				}
			})
		]);
		if (resArticle.data.success && resArticlesRelated.data.success) {
			return {
				props: {
					article: resArticle.data,
					articlesRelated: resArticlesRelated.data
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

export default ArticleComponent;
