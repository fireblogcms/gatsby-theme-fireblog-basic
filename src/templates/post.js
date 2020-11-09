import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import HTMLMetadata from '../components/HTMLMetadata';
import ClockIcon from '../components/ClockIcon';
import Tag from '../components/Tag';

function PostTemplate({ data, location, pageContext }) {
  const { blogPath } = pageContext;
  const { blog, post, recentPosts, tags } = data.fireblog;
  const { recentPostsText } = data.site.siteMetadata;

  return (
    <Layout
      recentPosts={recentPosts}
      recentPostsText={recentPostsText}
      location={location}
      headerTitle={blog.name}
      headerSubtitle={blog.description}
      blogPath={blogPath}
      tags={tags}
    >
      <HTMLMetadata
        title={post.title}
        description={post.teaser}
        location={location}
        image={post.image.url}
      />
      <div className="post-detail">
        <h1 className="title is-1">{post.title}</h1>
        <div className="date">
          <span className="date-clock">
            <ClockIcon />
          </span>
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        {post.image && (
          <div className="post-image">
            <img loading="lazy" src={post.image.url} alt="" />
          </div>
        )}
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="tags are-medium">
          {post.tags && post.tags.map(tag => <Tag tag={tag} />)}
        </div>
      </div>
    </Layout>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlugPageQuery($slug: String!, $blog: ID!) {
    site {
      siteMetadata {
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
      post(filter: { slug: { eq: $slug }, blog: { eq: $blog } }) {
        title
        publishedAt
        teaser
        content
        publishedAt
        image(w: 900, fit: crop, crop: center, auto: [compress, format]) {
          url
        }
        tags {
          name
          slug
        }
      }
    }
  }
`;
