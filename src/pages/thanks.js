import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/Layout/Layout.js';
import Helmet from 'react-helmet';

const thanks = () => {
	return (
		<Layout>
			<Helmet title="Thanks">
				<meta name="robots" content="noindex" />
				<meta name="googlebot" content="noindex" />
			</Helmet>
			<div css={theme => css`
					font-family: 'Texta-Thin';
					font-size: 1.5em;
					padding: ${theme.measurements.padding};

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
						<h2 css={css`margin-bottom: 0;`}>Thank You</h2>
						<p css={css`font-size: 1.25em; margin-top: .5em;`}>I've received your message and look forward to meeting you!</p>
					</div>
				</div>
		</Layout>
	);
};

export default thanks;