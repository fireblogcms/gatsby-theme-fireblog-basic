module.exports = themeOptions => {
  const config = {};

  config.siteMetadata = {
    // default language of your site, also used as a html attribute
    lang: 'en',
    // how many posts are display per page on post list page
    postsPerPage: 20,
    // links for the top menu
    menuLinks: [
      {
        title: 'Home',
        props: {
          to: '/',
        },
      },
      {
        title: 'Back to site',
        props: {
          to: 'https://fireblogcms.com',
          target: '_blank',
          id: 'back-to-site',
        },
      },
    ],
    readMoreText: 'Read more',
    followUsText: 'Follow us',

    // links to your social accounts.
    // @see components/socials.js
    // Use an empty string as value to disable a specific social network
    socials: {
      linkedin: 'https://www.linkedin.com/',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://twitter.com/',
      facebook: 'https://www.facebook.com/',
      youtube: 'https://www.youtube.com/',
    },
  };

  config.plugins = [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'Fireblog',
        // This is field under which it's accessible
        fieldName: 'fireblog',
        // Url to query from. Use default demo blog if no env variable is found.
        url: themeOptions.graphqlEndpoint,
      },
    },
    // The web app manifest(part of the PWA specification) enabled by this plugin
    // allows users to add your site to their home screen
    // on most mobile browsers.
    // The manifest provides configuration and icons to the phone.
    // this plugin should be listed before the offline plugin so
    // that it can cache the created manifest.webmanifest.
    // CAUTION : icon must be defined in root site and the file must exist in the main project directory
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // icon: `static/images/logo.png`,
        name: 'Fireblog',
        short_name: 'Fireblog',
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        ...themeOptions.manifestOptions,
      },
    },
    // gatsby-plugin-offline MUST be user AFTER manifest !
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // protect .content class from Bulma
        whitelist: ['iframely-api-container'],
        whitelistPatternsChildren: [/^content$/, /^pagination$/],
        develop: false, // Enable while using `gatsby develop`
      },
    },
  ];
  if (themeOptions.analyticsTrackingId) {
    config.plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: themeOptions.analyticsTrackingId,
      },
    });
  }
  return config;
};
