import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import HTMLMetadata from '../components/HTMLMetadata';
import Pagination from '../components/Pagination';
import ClockIcon from '../components/ClockIcon';

function PostListTemplate({ data, location, pageContext }) {
  const { postsCount, blogPath } = pageContext;
  const { blog, posts, recentPosts, tags } = data.fireblog;
  const {
    postsPerPage,
    readMoreText,
    recentPostsText,
  } = data.site.siteMetadata;

  return (
    <Layout
      recentPosts={recentPosts}
      recentPostsText={recentPostsText}
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
      image={blog.image ? blog.image.url : null}
      blogPath={blogPath}
      tags={tags}
    >
      <HTMLMetadata
        location={location}
        title={blog.name}
        image={blog.image ? blog.image.url : null}
        description={blog.description}
      />
      <div className="post-list">
        {posts.map(post => {
          return (
            <div className="post columns" key={post.slug}>
              {post.thumbnail && (
                <div className="column is-one-third">
                  <Link to={`${blogPath}/post/${post.slug}/`}>
                    <img loading="lazy" src={post.thumbnail.url} alt="" />
                  </Link>
                </div>
              )}
              <div className="column">
                <h2 className="title is-3">
                  <Link to={`${blogPath}/post/${post.slug}/`}>
                    {post.title}
                  </Link>
                </h2>
                <div className="date">
                  <small>
                    <span className="date-clock">
                      <ClockIcon />
                    </span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="post-teaser content">
                  <p>{post.teaser}</p>
                </div>
                <Link
                  className="read-more button is-light"
                  to={`${blogPath}/post/${post.slug}/`}
                >
                  {readMoreText}
                </Link>
              </div>
            </div>
          );
        })}

        <Pagination
          location={location}
          totalItems={postsCount}
          resultsPerPage={postsPerPage}
        />
      </div>
    </Layout>
  );
}

export default PostListTemplate;

export const pageQuery = graphql`
  query PostListPageQuery($limit: Int!, $skip: Int!, $blog: ID!) {
    site {
      siteMetadata {
        postsPerPage
        readMoreText
        recentPostsText
      }
    }
    fireblog {
      blog(filter: { _id: { eq: $blog } }) {
        name
        description
        image {
          url
        }
      }
      recentPosts: posts(
        limit: 5
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        ...recentPosts
      }
      tags(blog: $blog) {
        name
        slug
      }
      posts(
        limit: $limit
        skip: $skip
        filter: { blog: { eq: $blog } }
        sort: { publishedAt: desc }
      ) {
        title
        slug
        teaser
        publishedAt
        thumbnail: image(
          w: 300
          h: 250
          fit: crop
          crop: center
          auto: [compress, format]
        ) {
          url
        }
      }
    }
  }
`;
