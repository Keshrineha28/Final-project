import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/videos/')
      .then(res => {
        setVideos(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch videos:', err);
      });
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>All Videos</h2>

      <input
        type="text"
        placeholder="Search videos..."
        className='search-input'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredVideos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="video-grid">
          {filteredVideos.map(video => (
            <div key={video.id} className="video-card">
              <Link to={`/video/${video.id}`} style={{ textDecoration: 'none' }}>
                <video width="100%" height="180" style={{ borderRadius: '10px' }} controls>
                  <source src={video.video_file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h4>{video.title}</h4>
              </Link>
              <p className="uploader">
                Uploaded by: <strong>{video.user}</strong>
              </p>
              <p style={{ fontSize: '14px', color: '#555' }}>{video.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
