import { css } from '@emotion/core';

const ctaLink = css`
	color: #000000;
	display: inline-block;
	text-transform: uppercase;
	border-width: 0 0 .125em 0;
	border-style: solid;
	text-decoration: none;

	&::after {
		content: ' \\2192';
	}
`;

const lowKeyLink = css`
	text-decoration: inherit;
	color: inherit;
	background: inherit;
`;

export { ctaLink, lowKeyLink };