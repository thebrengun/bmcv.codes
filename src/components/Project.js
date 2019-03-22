import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import { ctaLink, lowKeyLink } from '../styles/index.js';

const Project = ({ featured = false, slug, title, client, thumbnail, shortSummary }) => {
	return (
		<React.Fragment>
			<div css={css`position: relative;`}>
				<h3>
					<Link to={slug} css={lowKeyLink}>
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
					</Link>
				</h3>
			</div>
			<Link to={slug} css={lowKeyLink}>
				{thumbnail && <Img 
					fluid={thumbnail} 
					css={
						theme => css`
							border-radius: ${theme.measurements.borderRadius};
							border: solid 1px #cccccc;
							${featured ? `
								border-color: #333333;
							` : ``}
						`
					} 
				/>}
			</Link>
			<p><Link to={slug} css={lowKeyLink}>{shortSummary}</Link></p>
			<Link 
				to={slug} 
				css={[
					ctaLink,
					css`
						align-self: flex-end;

						@media(min-width: 768px) {
							justify-self: flex-end;
						}
					`,
					css`${featured ? `color: #ffffff;` : ``}`
				]}
			>
				Explore Project
			</Link>
		</React.Fragment>
	);
};

export default Project;