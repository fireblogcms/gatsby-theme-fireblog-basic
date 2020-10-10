const report = require(`gatsby-cli/lib/reporter`);
require('dotenv').config();

/**
 * Create programmatically static pages for
 * our paginated post list and each post.
 */
exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const { createPage, createRedirect } = actions;
  const config = require('./gatsby-config')(themeOptions);
  const blogPost = require.resolve(`./src/templates/post.js`);
  const blogPostList = require.resolve(`./src/templates/post-list.js`);
  const blogPath =
    !themeOptions.blogPath || themeOptions.blogPath === '/'
      ? ''
      : themeOptions.blogPath;

  const postsFilter = { blog: { eq: themeOptions.blogId } };
  const { data } = await graphql(
    `
      query postsCount($filter: Fireblog_PostFilter) {
        fireblog {
          postsCount(filter: $filter)
        }
      }
    `,
    { filter: postsFilter }
  );
  if (!data || !data.fireblog.postsCount) {
    if (!themeOptions.blogId) {
      report.error(
        `Fireblog: No blog id provided, please check your theme options or ".env" file configuration ! (https://github.com/fireblogcms/gatsby-theme-fireblog-basic#theme-options)`
      );
      return;
    }
    report.error(
      `Fireblog: no posts found for blog "${themeOptions.blogId}", please check your theme options or ".env" file configuration ! (https://github.com/fireblogcms/gatsby-theme-fireblog-basic#theme-options)`
    );
    return;
  }
  const postsCount = data.fireblog.postsCount;

  let limit = config.siteMetadata.postsPerPage;
  let page = 1;
  let skip = 0;
  let totalPages = Math.ceil(postsCount / limit);
  while (page <= totalPages) {
    const { data } = await graphql(
      `
        query posts($filter: Fireblog_PostFilter, $limit: Int!, $skip: Int) {
          fireblog {
            posts(
              limit: $limit
              skip: $skip
              filter: $filter
              sort: { publishedAt: desc }
            ) {
              teaser
              slug
              title
              content
              publishedAt
              updatedAt
              image(auto: [compress, format]) {
                url
              }
              imagePostList: image(
                w: 400
                h: 220
                fit: crop
                crop: center
                auto: [compress, format]
              ) {
                url
              }
            }
          }
        }
      `,
      { limit, skip, filter: postsFilter, blog: themeOptions.blogId }
    );

    /**
     * Create a pagination page for this post list
     */
    let pagePath = page === 1 ? `${blogPath}/` : `${blogPath}/pages/${page}/`;
    let fullUrl = `${process.env.GATSBY_SITE_URL}${
      pagePath === '/' ? '' : pagePath
    }`;

    // create post listing page for current page.
    createPage({
      path: pagePath,
      component: blogPostList,
      context: {
        skip: skip,
        limit: limit,
        postsCount: postsCount,
        blog: themeOptions.blogId,
        page: page,
        url: fullUrl,
        blogPath,
      },
    });

    /**
     * Create a page for each retrieved post.
     */
    const { posts } = data.fireblog;
    posts.forEach(post => {
      const pagePath = `${blogPath}/post/${post.slug}/`;
      createPage({
        path: pagePath,
        component: blogPost,
        context: {
          blog: themeOptions.blogId,
          slug: post.slug,
          url: `${process.env.GATSBY_SITE_URL}${pagePath}`,
          blogPath,
        },
      });
    });

    skip = page * limit;
    page++;
  }

  createRedirect({
    fromPath: `${blogPath}/pages/1`,
    isPermanent: false,
    redirectInBrowser: true,
    toPath: blogPath,
  });
};

// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
// @see also "./src/components/MenuLink.js" component.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadataMenuLinksProps {
      to: String!
      title: String
      rel: String
      target: String
      id: String
      className: String
    }
  `;
  createTypes(typeDefs);
};
