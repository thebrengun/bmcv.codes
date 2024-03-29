import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from '../components/Layout/Layout.js';
import ProjectWrapper from '../components/ProjectWrapper.js';
import Project from '../components/Project.js';
import SEOInfo from '../components/seo.js';
import { css } from '@emotion/react';

const ProjectsPage = (data) => {
	const projects = data.projects.edges;

	return (
		<Layout>
			<SEOInfo title={`Projects`} />
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
						const { title, client, shortSummary } = frontmatter;
						const featured = i === 0 ? frontmatter.featured : false;
						const thumbnail = frontmatter.thumbnails[0].childImageSharp.fluid;

						return (
							<ProjectWrapper featured={featured} key={`${slug}-${i}`}>
								<Project 
									featured={featured}
									slug={slug}
									title={title}
									client={client}
									thumbnail={thumbnail}
									shortSummary={shortSummary} 
								/>
							</ProjectWrapper>
						);
					}
				)}
			</div>
		</Layout>
	);
};

const projectsQuery = graphql`
	query ProjectsQuery {
		projects: allMarkdownRemark(filter: {frontmatter: {template: {eq: "project"}}}, sort: {fields: [frontmatter___featured, frontmatter___shortSummary], order: DESC}) {
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
`;

const StaticProjectsPage = () => <StaticQuery query={projectsQuery} render={ProjectsPage} />

export default StaticProjectsPage
