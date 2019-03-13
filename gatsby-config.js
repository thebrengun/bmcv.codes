module.exports = {
  siteMetadata: {
    title: `Brennan McVicar Front End Developer`,
    name: `Brennan McVicar`,
    role: `Front End Developer`,
    description: `I am a front end developer with strong JavaScript and CSS skills and experience collaborating across disciplines while managing competing concerns to create the best possible product.`,
    author: `@thebrengun`,
  },
  plugins: [
    `gatsby-plugin-emotion`, 
    `gatsby-plugin-react-helmet`, 
    {
      resolve: `gatsby-source-filesystem`, 
      options: {
        name: `images`, 
        path: `${__dirname}/src/images`, 
      },
    },
    {
      resolve: `gatsby-source-filesystem`, 
      options: {
        name: `pages`, 
        path: `${__dirname}/src/pages`, 
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true, // CommonMark mode (default: true)
        footnotes: true,  // Footnotes mode (default: true)
        pedantic: true,   // Pedantic mode (default: true)
        gfm: true,        // GitHub Flavored Markdown mode (default: true)
        plugins: [],      // Plugins configs
      },
    },
    `gatsby-transformer-sharp`, 
    `gatsby-plugin-sharp`, 
    {
      resolve: `gatsby-plugin-manifest`, 
      options: {
        name: `Brennan McVicar Codes`, 
        short_name: `bmcv.codes`, 
        start_url: `/`, 
        background_color: `#ffffff`, 
        theme_color: `#663399`, 
        display: `minimal-ui`, 
        icon: `src/images/bmcv-icon.png`, 
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
