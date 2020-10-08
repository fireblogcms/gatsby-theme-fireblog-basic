# Gatsby blog theme for Fireblog CMS with PWA support

Combine Gatbsy (a modern static site generator ideal for JAMstack architectures) and Fireblog CMS to create a new blog experience: a super fast and simple back-office with a super fast and modern front-end!

Fireblog (https://fireblogcms.com) is a new headless CMS dedicated to blogging, with a very simple but powerful writing interface. Try it for free (one month trial): https://app.fireblogcms.com.

## Features

- Fast and SEO friendly
- Offline mode
- Images optimization with Fireblog API
- Responsive
- Pagination
- Easy to customize with Sass & Bulma (https://bulma.io). See section "Customize theme for your brand"
- Google Analytics

# Installation

## Requirements

node.js >= 12.00 is required. Make sure you have a compatible version running `node -v` command in your terminal.

If you have to install `node`, you might be interested in using `nvm` to install and switch easily between any node version.

## For a new site

If you're creating a new site and want to use the blog theme, you can use the blog theme starter. This will generate a new site that pre-configures use of the blog theme.

```shell
gatsby new my-themed-fireblog https://github.com/fireblogcms/gatsby-starter-fireblog-basic
cd my-themed-fireblog
```

## For an existing site

If you already have a site you'd like to add the blog theme to, you can manually configure it.

1. Install the blog theme

```shell
npm install gatsby-theme-fireblog-basic
```

2. Add the configuration to your `gatsby-config.js` file

```js
// gatsby-config.js
require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: process.env.GATSBY_SITE_URL,
  },
  plugins: [
    {
      resolve: `gatsby-theme-fireblog-basic`,
      options: {
        graphqlEndpoint: process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT, // required
        blogId: process.env.GATSBY_BLOG_ID, // required
        analyticsTrackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID, // optinonal
      },
    },
  ],
};
```

3. Run your site using `gatsby develop` and navigate to your blog posts. If you used the above configuration, your URL will be `http://localhost:8000/`

# Usage

## Theme options

| Key                   | Default value | Description                                                                            |
| --------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `graphqlEndpoint`     | `''`          | Endpoint to your graphql account (see https://fireblogcms) => required                 |
| `blogId`              | `''`          | Blog id to publich => required                                                         |
| `analyticsTrackingId` | `''`          | Google Analytics Tracking ID (UA-xxxx) => optional                                     |
| `manifestOptions`     | `''`          | PWA manifest customization from "gatsby-plugin-manifest" (example bellow) => optionnal |

### Example configuration

```js
// gatsby-config.js
require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: process.env.GATSBY_SITE_URL,
  },
  plugins: [
    {
      resolve: `gatsby-theme-fireblog-basic`,
      options: {
        graphqlEndpoint: process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT, // required
        blogId: process.env.GATSBY_BLOG_ID, // required
        analyticsTrackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID, // optinonal
      },
    },
  ],
};
```

## Customize theme for your brand

### Brand

- Put your own logo to `static/images/logo.png`
- Configure top menu links, Progressive Web App name, and more by editing `./gatsby-config.js` file

```js
// gatsby-config.js
require('dotenv').config();

module.exports = {
  siteMetadata: {
    // absolute url of your site, e.g https://example.com. Required
    // to build some absolute links.
    siteUrl: process.env.GATSBY_SITE_URL,
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
  },
  plugins: [
    {
      resolve: `gatsby-theme-fireblog-basic`,
      options: {
        graphqlEndpoint: process.env.GATSBY_FIREBLOG_GRAPHQL_ENDPOINT, // required
        blogId: process.env.GATSBY_BLOG_ID, // required
        analyticsTrackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID, // optinonal
        manifestOptions: {
          icon: `static/images/logo.png`,
          // name of the application when site
          // is installed as an application (PWA)
          name: 'Coolest Fireblog',
          short_name: 'Fireblog',
          start_url: `/`,
          background_color: `#ffffff`,
          theme_color: `#663399`,
          display: `minimal-ui`,
        },
      },
    },
  ],
};
```

### CSS

To customize scss you have to override `gatsby-browser.js` and make sure you import your own files (an example is given in starter https://github.com/fireblogcms/gatsby-starter-fireblog-basic)

- Override style variables from `src/scss/_variables.scss` file
- Override css theme by editing `src/scss/_theme.scss`
