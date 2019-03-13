import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import Layout from '../components/Layout/Layout.js';
import Logo from '../components/Logo.js';
import Project from '../components/Project.js';
import { ctaLink, lowKeyLink } from '../styles/index.js';

const IndexPage = (data) => {
	const { name, role, description } = data.site.siteMetadata;
	const { excerpt } = data.about.childMarkdownRemark;
	const featuredProject = data.featuredProject.childMarkdownRemark;
	const { title, client, shortSummary } = featuredProject.frontmatter;
	const thumbnail = featuredProject.frontmatter.thumbnail.childImageSharp.fluid;
	const { slug:featuredProjectSlug } = featuredProject.fields;

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
				`}
			>
				<div 
					css={css`
						padding: 1em;
						display: flex;
						flex-direction: column;

						@media(min-width: 768px) {
							padding: 2em 6em;
						}

						@media(min-width: 1200px) {
							padding: 2em 0;
							max-width: 700px;
							margin: 0 auto;
						}
					`}
				>
					<Link 
						to={featuredProjectSlug} 
						css={[lowKeyLink, css`
							@media(min-width: 1200px) {
								max-width: 700px;
							}
						`]}
					>
						<h3>Featured Project</h3>
						<h4>
							{title}
							{client && <span css={css`display: block; text-transform: capitalize;`}>{client}</span>}
						</h4>
						<Img 
							fluid={thumbnail} 
							css={
								theme => css`
									border-radius: ${theme.measurements.borderRadius};
									border: solid 1px #333333;
								`
							} 
						/>
						<p>{shortSummary}</p>
					</Link>
					<Link 
						to={featuredProjectSlug} 
						css={[
							ctaLink,
							css`
								color: #ffffff;
								align-self: flex-end;
							`
						]}
					>
						Explore Project
					</Link>
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
						{excerpt}
						<Link to="/about" css={[ctaLink, css`color: #ffffff; margin-left: 1em;`]}>Read More</Link>
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
		featuredProject: file(relativePath: {eq: "projects/weather-app.md"}) {
			childMarkdownRemark {
				fields {
					slug
				}
				frontmatter {
					title
					client
					shortSummary
					thumbnail {
						childImageSharp {
							fluid(maxWidth: 375) {
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
`

export default () => <StaticQuery query={indexQuery} render={IndexPage} />
