import { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video_file', video);
    formData.append('title', title);
    formData.append('description', description);


    try {
      const res = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload successful!');
    } catch (err) {
      alert('Upload failed. Are you logged in?');
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  /><br />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  /><br />

  <input
    type="file"
    onChange={(e) => setVideo(e.target.files[0])}
  /><br />

  <button type="submit">Upload</button>
</form>

    </div>
  );
}

export default Upload;
