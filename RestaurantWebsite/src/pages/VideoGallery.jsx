import React, { useEffect, useState } from 'react';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/upload/videos')
      .then(res => res.json())
      .then(data => {
        if (data.success) setVideos(data.videos);
      })
      .catch(err => console.error('Error fetching videos:', err));
  }, []);

  return (
    <div className="p-8 space-y-10">
      <h2 className="text-3xl font-bold text-center text-yellow-600">🍽️ Signature Dishes</h2>
      {videos.map((video, index) => (
        <div key={index} className="flex justify-center">
          <video
            src={`http://localhost:5000${video.url}`}
            className="w-full md:w-2/3 rounded-xl shadow-md"
            controls
            autoPlay
            loop
            muted
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
