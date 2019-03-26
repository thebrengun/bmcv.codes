import React, { PureComponent } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import rightArrowWhite from '../../images/icons/right-arrow-white-36px.png';
import rightArrowBlack from '../../images/icons/right-arrow-black-36px.png';

export const ctaLink = css`
	color: #000000;
	text-transform: uppercase;
	border-width: 0 0 .125em 0;
	border-style: solid;
	text-decoration: none;
	display: inline-flex;
`;

class CallToAction extends PureComponent {
	render() {
		const { children, to, light } = this.props;
		const lightCss = css`${light ? `color: #ffffff;` : ``}`;

		return (
			<Link 
				to={to} 
				css={css`
					${ctaLink}
					${lightCss}
				`}
			>
				{children}
				<img 
					src={light ? rightArrowWhite : rightArrowBlack} 
					css={css`
						width: 1em;
						height: 1em;
						margin-left: .25em;
					`} 
				/>
			</Link>
		);
	}
}

CallToAction.defaultProps = {
	light: false
};

export default CallToAction;