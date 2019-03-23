import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import Layout from '../components/Layout/Layout.js';
import { ctaLink } from '../styles/index.js';
import SEO from '../components/seo.js';

const ctaBtn = css`
	background: #2B2D2D;
	color: #ffffff;
	padding: .25em .75em;
	display: block;
	text-decoration: none;
	border-radius: .25em;
	border: 0;
	margin: 0;
`;

const offsiteLink = css`&::after {content: ' \\02197';}`;

const ProjectTemplate = ({ data }) => {
	const project = data.markdownRemark;
	const { title, client, summary, shortSummary, demo, repository, thumbnail, highlights, technologies, thumbnails } = project.frontmatter;
	return (
		<Layout>
			<SEO 
				title={`Project: ${title}${client && ` - ${client}`}`} 
				description={summary || shortSummary}
			/>
			<div 
				css={
					(theme) => css`
						padding: ${theme.measurements.padding};

						@media(min-width: 768px) {
							margin: 0 4em;
						}

						@media(min-width: 1200px) {
							max-width: 950px;
							margin: 2em auto;
						}
					`
				}
			>
				<div
					css={css`
						@media(min-width: 1200px) {
							margin: 2em 5em;
						}
					`}
				>
					<h2>
						{title}
						{client && 
							<span 
								css={css`
									font-style: italic; 
									margin: 0; 
									text-transform: capitalize; 
									display: block;
								`}
							>
								{client}
							</span>
						}
					</h2>
					<div>
						<div>
							<p css={(theme) => css`
								color: ${theme.colors.primary};
								font-weight: bold;
							`}>
								{technologies.join(', ')}
							</p>
							<div css={css`
								display: grid;
								grid-template-columns: repeat(2, 1fr);
								grid-column-gap: .5em;
								grid-row-gap: .5em;	

								@media(min-width: 768px) {
									grid-template-columns: repeat(${thumbnails.length}, 1fr);
									grid-column-gap: 1em;
									grid-row-gap: 1em;	
								}
							`}>
								{thumbnails.map(({ childImageSharp }, i) => 
									<Img 
										fluid={childImageSharp.fluid} 
										css={
											theme => css`
												border-radius: ${theme.measurements.borderRadius};
												border: solid 1px #cccccc;

												@media(max-width: 767px) {
													&:first-of-type {
														grid-column: 1/${thumbnails.length + 1};
													}
												}
											`
										} 
									/>
								)}
							</div>
							<p>{summary || shortSummary}</p>
							<div 
								css={css`
									display: flex;
									flex-direction: row;
									justify-content: flex-end;
									& > a {
										margin-left: .5em;
									}

									& >:first-of-type {
										margin-left: 0;
									}
								`}
							>
								{repository && <a href={repository} target="_blank" rel="noopener noreferrer" css={[ctaLink, ctaBtn, offsiteLink]}>Repo</a>}
								{demo && <a href={demo} target="_blank" rel="noopener noreferrer" css={[ctaLink, ctaBtn, offsiteLink]}>Demo</a>}
							</div>
						</div>
						<div>
							<h3>Features</h3>
							<ul 
								css={(theme) => css`
									padding: 0 0 0 ${theme.measurements.padding};
									list-style-type: disc;
								`}>
							{highlights.map(
								({description, photos}, i) => 
									<li 
										css={css`
											margin-bottom: 1em;
										`}
										key={`${title}-highlight-${i}`}
									>
										{description}
									</li>
							)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
				client
				summary
				shortSummary
				repository
				demo
				thumbnails {
					childImageSharp {
						fluid(maxWidth: 375) {
							src
							srcSet
							aspectRatio
							sizes
						}
					}
				}
				highlights {
					description
					photos
				}
				technologies
			}
		}
	}
`

export default ProjectTemplate;