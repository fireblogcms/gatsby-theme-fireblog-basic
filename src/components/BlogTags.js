import React from 'react';
import Tag from './Tag';

export default function BlogTags({ tags }) {
  if (!tags || tags.length === 0) {
    return null;
  }
  return (
    <div className="tags">
      <h3 className="block-title title is-5">Tags</h3>
      <ul>
        {tags.map(tag => (
          <Tag tag={tag} />
        ))}
      </ul>
    </div>
  );
}
