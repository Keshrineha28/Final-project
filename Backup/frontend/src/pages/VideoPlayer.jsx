import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [likeStatus, setLikeStatus] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch video
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/videos/${id}/`)
      .then(res => setVideo(res.data))
      .catch(err => console.error('Error fetching video:', err));
  }, [id]);

  // Fetch comments
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/videos/${id}/comments/`)
      .then(res => setComments(res.data))
      .catch(err => console.error('Error fetching comments:', err));
  }, [id]);

  // Like
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/videos/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
      setLikeStatus(res.data.message);
    } catch (err) {
      alert("Please login to like the video.");
    }
  };

  // Watch Later
  const handleWatchLater = () => {
    const saved = JSON.parse(localStorage.getItem('watchLater')) || [];
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem('watchLater', JSON.stringify(saved));
      alert('Added to Watch Later!');
    } else {
      alert('Already in Watch Later!');
    }
  };

  // Share
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/video/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Video link copied to clipboard!');
  };

  // Submit Comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/videos/${id}/comments/`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      alert('Please login to comment');
    }
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{video.title}</h2>
      <video width="600" controls>
        <source src={video.video_file} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleLike}>👍 {likeStatus === 'Liked' ? 'Unlike' : 'Like'}</button>
        <button onClick={handleWatchLater}>⏱ Watch Later</button>
        <button onClick={handleShare}>🔗 Share</button>
      </div>

      <p><strong>Description:</strong> {video.description}</p>
      <p><strong>Uploaded by:</strong> {video.user}</p>

      <hr />
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          style={{ width: '100%', marginBottom: '10px' }}
        ></textarea>
        <br />
        <button type="submit">Post Comment</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: '10px' }}>
              <strong>{comment.user}</strong> <br />
              <span>{comment.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
