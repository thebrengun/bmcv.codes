import React from 'react';
import Layout from '../components/Layout/Layout.js';
import SEO from '../components/seo.js';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

const NotFoundPage = () => (
	<Layout>
		<SEO title={`Not Found`} />
		<div css={theme => css`
			padding: 0 ${theme.measurements.padding} ${theme.measurements.padding} ${theme.measurements.padding};

			@media(min-width: 768px) {
				margin: 0 4em;
			}

			@media(min-width: 1200px) {
				max-width: 950px;
				margin: 2em auto;
			}
		`}>
			<div 
				css={css`
					margin: 1em 0;
					@media(min-width: 1200px) {
						margin: 2em 5em;
					}
				`}
			>
				<h2>Page Not Found</h2>
				<p>That page could not be found but check out my <Link to={`/projects/`}>Projects</Link> or <Link to={`/about/`}>learn more about me</Link>.</p>
			</div>
		</div>
	</Layout>
);

export default NotFoundPage
