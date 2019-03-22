import React from 'react';
import { css } from '@emotion/core';

const featuredSnippet = (theme, featured) => `${featured ? `
	background: ${theme.colors.primary};
	color: #ffffff;
`: ``}`;

const ProjectWrapper = ({ featured, children }) => {
	return (
		<div 
			css={(theme) => css`
				padding: ${theme.measurements.padding};
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				${featuredSnippet(theme, featured)}

				&:nth-of-type(odd) {
					background: #efefef;
					${featuredSnippet(theme, featured)}
				}

				@media(min-width: 768px) {
					padding: 1em .75em;
					border-radius: ${theme.measurements.borderRadius};
					border: solid 1px #dddddd;
					display: grid;
					grid-template-rows: 2.5em min-content auto 1em;
					${featured ? `
						&:first-of-type {
							border-color: #333333;
						}
					`: ``}

					&:nth-of-type(odd) {
						background: #ffffff;
						${featuredSnippet(theme, featured)}
					}
				}
			`} 
		>
			{children}
		</div>
	);
};

export default ProjectWrapper;