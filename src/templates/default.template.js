import React from 'react';
import Layout from '../components/Layout/Layout.js';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';

const DefaultTemplate = ({ data }) => {
	const page = data.markdownRemark;
	const { title } = page.frontmatter;
	const { html } = page;

	return (
		<Layout>
			<div css={theme => css`padding: ${theme.measurements.padding};`} dangerouslySetInnerHTML={{__html: html}} />
		</Layout>
	);
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default DefaultTemplate;