import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import Layout from '../components/Layout/Layout.js';
import Logo from '../components/Logo.js';
import Project from '../components/Project.js';
import CallToAction from '../components/CallToAction/CallToAction.js';

const IndexPage = (data) => {
	const { name, role, description } = data.site.siteMetadata;
	const { excerpt } = data.about.childMarkdownRemark;
	const { edges:featuredProjects } = data.featuredProjects;

	return (
		<Layout>
			<div 
				css={(theme) => css`
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					padding: ${theme.measurements.padding};
					font-size: 1.35em;
					font-family: 'Texta-Thin';

					@media(min-width: 768px) {
						margin: 0 4em;
						align-items: center;
					}

					@media(min-width: 1200px) {
						max-width: 700px;
						margin: 0 auto;
					}
				`}
			>
				<div 
					css={css`
						align-self: center;
						width: 50%;
						height: 50%;
						max-width: 150px;
						margin: 1em 0;

						@media(min-width: 768px) {
							align-self: center;
							align-items: center;
							max-width: 150px;
						}
					`}
				>
					
					<Logo />
				</div>
				<h1 
					css={css`
						text-transform: capitalize;
						margin: 0;
					`}
				>
					{name}
				</h1>
				<h2
					css={css`
						text-transform: capitalize;
						margin: 0;
					`}
				>
					{role}
				</h2>
				<p 
					css={css`
						line-height: 1.125em;
						font-size: 1.1em;
					`}
				>
					{description}
				</p>
			</div>
			<div 
				css={theme => css`
					background: ${theme.colors.primary};
					color: #ffffff;
					padding: 1em;

					@media(min-width: 768px) {
						padding: 2em 6em;
					}

					@media(min-width: 1200px) {
						padding: 2em 0;
					}
				`}
			>
				<div css={css`
					@media(min-width: 1200px) {
						max-width: 700px;
						margin: 2em auto;
					}
				`}>
					<h2 
						css={css`
							@media(min-width: 768px) {
								&::after {
									content: 's';
								}
							}
						`}
					>
						Featured Project
					</h2>
					<div css={css`
						@media(min-width: 768px) {
							display: grid;
							grid-template-columns: 1fr 1fr 1fr;
							grid-column-gap: 1em;
							grid-row-gap: 1em;
						}
					`}>
						{featuredProjects.map(
							({node}, i) => {
								const { fields, frontmatter } = node;
								const { slug } = fields;
								const { title, client, shortSummary, featured } = frontmatter;
								const thumbnail = frontmatter.thumbnails ? frontmatter.thumbnails[0].childImageSharp.fluid : null;

								return (
									<div 
										css={(theme) => css`
											color: #ffffff;
											display: none;
											flex-direction: column;
											justify-content: flex-start;

											&:first-of-type {
												display: flex;
											}

											@media(min-width: 768px) {
												padding: 0;
												border-radius: ${theme.measurements.borderRadius};
												border: solid 1px transparent;
												display: grid;
												grid-template-rows: 2.5em min-content auto 1em;
											}
										`} 
										key={`featured-project-${slug}`}
									>
										<Project 
											featured={featured}
											slug={slug}
											title={title}
											client={client}
											thumbnail={thumbnail}
											shortSummary={shortSummary} 
											key={`${slug}-${i}`} 
										/>
									</div>
								);
							}
						)}
					</div>
				</div>
			</div>
			<div 
				css={(theme) => css`
					background: ${theme.colors.secondary};
					color: #ffffff;
					padding: 1em;

					@media(min-width: 768px) {
						padding: 2em 6em;
					}

					@media(min-width: 1200px) {
						padding: 2em 0;
					}
				`}
			>
				<div 
					css={css`
						@media(min-width: 1200px) {
							max-width: 700px;
							margin: 2em auto;
						}
					`}
				>
					<h3>About</h3>
					<p>
						<span css={css`margin-right: .5em;`}>{excerpt}</span>
						<CallToAction to="/about" light={true}>
							Read More
						</CallToAction>
					</p>
				</div>
			</div>
		</Layout>
	);
};

const indexQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				name
				role
				description
			}
		}
		about: file(relativePath: {
			eq: "about.md"
		}) {
			childMarkdownRemark {
				excerpt
			}
		}
		featuredProjects: allMarkdownRemark(
			filter: {
				frontmatter: {
					template: {eq: "project"}
					featured: {eq: true}
				}
			}
			limit: 3
			sort: {fields: [frontmatter___featured, frontmatter___shortSummary], order: DESC}
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						featured
						title
						client
						shortSummary
						thumbnails {
	            childImageSharp {
	              fluid(maxWidth: 800) {
	                src
	                srcSet
	                aspectRatio
	                sizes
	              }
	            }
	          }
					}
				}
			}
		}
	}
`
const StaticIndexPage = () => <StaticQuery query={indexQuery} render={IndexPage} />

export default StaticIndexPage
