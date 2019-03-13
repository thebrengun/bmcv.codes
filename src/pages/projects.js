import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout/Layout.js';
import Project from '../components/Project.js';
import { css } from '@emotion/core';

const ProjectsPage = (data) => {
	const projects = data.projects.edges;

	return (
		<Layout>
			<div 
				css={css`
					@media(min-width: 768px) {
						padding: 1em;
						display: grid;
						grid-template-columns: 1fr 1fr 1fr;
						grid-column-gap: .5em;
						grid-row-gap: 1em;
					}

					@media(min-width: 1200px) {
						max-width: 950px;
						margin: 2em auto;
					}
				`}
			>
				{projects.map(
					({node}, i) => {
						const { fields, frontmatter } = node;
						const { slug } = fields;
						const { title, client, shortSummary, featured } = frontmatter;
						const thumbnail = frontmatter.thumbnail.childImageSharp.fluid;

						return (
							<Project 
								featured={featured}
								slug={slug}
								title={title}
								client={client}
								thumbnail={thumbnail}
								shortSummary={shortSummary} 
								key={`${slug}-${i}`}
							/>
						);
					}
				)}
			</div>
		</Layout>
	);
};

const projectsQuery = graphql`
	query ProjectsQuery {
		projects: allMarkdownRemark(filter: {frontmatter: {template: {eq: "project"}}}) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						client
						shortSummary
						featured
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
	}
`;

export default () => <StaticQuery query={projectsQuery} render={ProjectsPage} />
