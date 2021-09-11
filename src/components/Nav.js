import React, { PureComponent } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import logo from '../images/bmcv-icon.png';

class Nav extends PureComponent {
	render() {
		return (
			<nav 
				css={css`
					background: #ffffff;
					border-bottom: solid 1px #dddddd;
					position: fixed;
					z-index: 100000;
					width: 100%;
					text-transform: uppercase;

					@media(min-width: 768px) {
						position: static;
						border-color: transparent;
					}

					@media(min-width: 1200px) {
						max-width: 950px;
						margin: 2em auto;
					}
				`}
			>
				<ul 
					css={(theme) => css`
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: space-between;
							list-style: none;
							margin: .5em ${theme.measurements.padding};
							padding: 0;

							@media(min-width: 768px) {
								margin: ${theme.measurements.padding};
								align-items: flex-start;
							}
					`}
				>
					<NavLink to="/" ariaLabelledby="logo-label" isImageLink={true}>
						<span className="u-hidden" id="logo-label">Home</span>
						<img 
							src={logo} 
							css={css`
								width: 2em; 
								display: block;

								@media(min-width: 768px) {
									width: 3em;
								}
							`} 
							alt="Brennan McVicar Logo" 
						/>
					</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/projects">Projects</NavLink>
					<NavLink to="/contact">Contact</NavLink>
				</ul>
			</nav>
		);
	}
}

class NavLink extends PureComponent {
	render() {
		const { children, to, ariaLabelledby, isImageLink } = this.props;
		return (
			<li 
				css={css`
					padding: 0;
					margin: 0;

					@media(min-width: 768px) {
						margin: 0 1em;

						&:first-of-type {
							flex-grow: 1;
							margin: 0;
						}

						&:last-of-type {
							margin-right: 0;
						}
					}
				`}
			>
				<Link 
					to={to} 
					css={(theme) => css`
						text-decoration: none;
						color: ${theme.colors.secondary};
						border-style: solid;
						border-color: transparent;
						border-width: 0 0 ${theme.measurements.borderWidth} 0;

						@media(min-width: 768px) {
							display: inline-block;
						}
					`}
					activeStyle={{borderColor: isImageLink ? 'transparent' : '#2B2D2D'}}
					getProps={({ isPartiallyCurrent }) => isPartiallyCurrent ? ({style: {borderColor: isImageLink ? 'transparent' : '#2B2D2D'}}) : null}
					aria-labelledby={ariaLabelledby}
				>
					{children}
				</Link>
			</li>
		);
	}
}

NavLink.defaultProps = {
	isImageLink: false
};

export default Nav;
