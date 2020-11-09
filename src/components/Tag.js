import React from 'react';

export default function Tag({ tag }) {
  return <span className="tag is-light">{tag.name}</span>;
}
