import React, { useState } from 'react';

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video) return alert('Please select a video');

    const formData = new FormData();
    formData.append('video', video);

    try {
      const res = await fetch('http://localhost:5000/api/upload/video', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Upload successful!');
        setVideoUrl(`http://localhost:5000${data.url}`);
      } else {
        setMessage('Upload failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error uploading video');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleChange} />
      <button
        onClick={handleUpload}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      <p className="mt-4">{message}</p>
      {videoUrl && (
        <video controls width="400" className="mt-4">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoUpload;
