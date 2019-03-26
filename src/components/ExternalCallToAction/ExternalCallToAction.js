import React, { PureComponent } from 'react';
import { css } from '@emotion/core';
import { ctaLink } from '../CallToAction/CallToAction.js';
import externalIconWhite from '../../images/icons/new-window-white-36px.png';

const ctaBtn = css`
	background: #2B2D2D;
	color: #ffffff;
	padding: .25em .75em;
	display: flex;
	text-decoration: none;
	border-radius: .25em;
	border: 0;
	margin: 0;
`;

const ExternalCallToAction = ({ to, children }) => (
	<a href={to} target="_blank" rel="noopener noreferrer" css={[ctaLink, ctaBtn]}>
		{children}
		<img 
			src={externalIconWhite} 
			css={css`
				width: 1em;
				height: 1em;
				margin-left: .25em;
			`} 
		/>
	</a>
);

export default ExternalCallToAction;