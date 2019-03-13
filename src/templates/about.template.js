import React from 'react';
import Layout from '../components/Layout/Layout.js';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import Img from 'gatsby-image';

const AboutTemplate = ({ data }) => {
	const page = data.markdownRemark;
	const { title, profilePicture } = page.frontmatter;
	const { fluid:fluidProfile } = profilePicture.childImageSharp;
	const { html } = page;

	return (
		<Layout>
			<div css={theme => css`
				padding: 0 ${theme.measurements.padding} ${theme.measurements.padding} ${theme.measurements.padding};
				text-align: center;

				@media(min-width: 768px) {
					margin: 0 4em;
					text-align: left;
				}

				@media(min-width: 1200px) {
					max-width: 950px;
					margin: 2em auto;
				}
			`}>
				<div 
					css={css`
						@media(min-width: 1200px) {
							margin: 2em 5em;
						}
					`}
				>
					<div 
						css={css`
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;

							@media(min-width: 768px) {
								display: block;
								float: right;
								margin-top: 2em;
							}
						`}
					>
						<Img 
							fluid={fluidProfile} 
							alt="Me" 
							css={css`
								margin: 1em; 
								width: 200px; 
								max-width: 40%;

								@media(min-width: 768px) {
									max-width: 200px;
								}
							`} 
						/>
					</div>
					<h2>{title}</h2>
					<div 
						css={css`text-align: left; text-indent: 1.5em;`} 
						dangerouslySetInnerHTML={{__html: html}} 
					/>
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
        profilePicture {
        	childImageSharp {
				fluid(maxWidth: 400) {
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
`

export default AboutTemplate;