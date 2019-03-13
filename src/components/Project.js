import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import { ctaLink, lowKeyLink } from '../styles/index.js';

const Project = ({ featured = false, slug, title, client, thumbnail, shortSummary }) => {
	return (
		<div 
			css={(theme) => css`
				padding: ${theme.measurements.padding};
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				${featured ? `
					background: ${theme.colors.primary};
					color: #ffffff;
				`: ``}

				&:nth-of-type(odd) {
					background: #efefef;
					${featured ? `
						background: ${theme.colors.primary};
						color: #ffffff;
					`: ``}
				}

				@media(min-width: 768px) {
					padding: 1em .75em;
					border-radius: ${theme.measurements.borderRadius};
					border: solid 1px #dddddd;
					display: grid;
					grid-template-rows: 2.5em min-content auto 1em;
					${featured ? `
						border-color: #333333;
					`: ``}

					&:nth-of-type(odd) {
						background: #ffffff;
						${featured ? `
							background: ${theme.colors.primary};
							color: #ffffff;
						`: ``}
					}
				}
			`} 
		>
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
				<Img 
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
				/>
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
		</div>
	);
};

export default Project;