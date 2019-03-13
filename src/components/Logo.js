import React, { PureComponent } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

class Logo extends PureComponent {
	render() {
		return (
			<StaticQuery
				query={graphql`
					query {
						logo: file(relativePath: {eq: "bmcv-icon.png"}) {
							childImageSharp {
								fluid(maxWidth: 200) {
									src
									srcSet
									aspectRatio
									sizes
								}
							}
						}
					}
				`}
				render={data => <Img fluid={data.logo.childImageSharp.fluid} alt="Brennan McVicar Logo" />}
			/>
		);
	}
}

export default Logo;
