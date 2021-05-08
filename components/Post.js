import React from 'react';
import { DateTime } from 'luxon';
import MediaControls from './Player/MediaControls';

export const Post = ({ renderPlayer, item }) => {
  const { createdAt, message } = item.metadata;
  const renderedDate = DateTime.fromISO(createdAt).toLocaleString({ month: 'long', day: 'numeric' });
  return <div className="mb-8 pt-8">
    <div className="color-gray-700">
      {renderedDate}
    </div>
    <div className="mt-1 mb-4 text-lg">
      {message}
    </div>
    <MediaControls item={item} />
    <details>
      <summary>
        item
      </summary>
      {JSON.stringify(item)}
    </details>
  </div>;
};
