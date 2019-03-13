const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;

	if(node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: `pages` });
		createNodeField({
			node,
			name: `slug`,
			value: slug,
		});
	}
};

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;
	return graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							template
						}
					}
				}
			}
		}
	`).then(
		(result) => {
				result.data.allMarkdownRemark.edges.forEach(
					({ node }) => {
						const { slug } = node.fields;
						const { template } = node.frontmatter;

						createPage({
								path: node.fields.slug,
								component: path.resolve(`./src/templates/${template || 'default'}.template.js`),
								context: {
							slug: node.fields.slug,
								}
						});
					}
				);
		}
	);
};