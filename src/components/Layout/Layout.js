import '../../css/fonts.css';
import './Layout.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from '@emotion/react';
import { css } from '@emotion/react';
import Nav from '../Nav.js';
import SEOInfo from '../seo.js';
import theme from '../../styles/theme.js';

class Layout extends PureComponent {
	render() {
		const { children } = this.props;

		return (
			<StaticQuery
				query={graphql`
					query SiteTitleQuery {
						site {
							siteMetadata {
								title
								description
							}
						}
					}
				`}
				render={data => (
					<ThemeProvider theme={theme}>
						<SEOInfo />
						<Nav />
						<main css={css`padding-top: 3em;`}>
							{children}
						</main>
					</ThemeProvider>
				)}
			/>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
