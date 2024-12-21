// pages/admin/news-events/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});

const mdParser = new MarkdownIt();

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState({
    title: '',
    type: '',
    image: '',
    content: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (slug) {
      fetch(`/api/admin/news-events/${slug}`)
        .then(res => res.json())
        .then(data => {
          setPost(data);
          if (data.image) setPreview(`${data.image}`);
        });
    }
  }, [slug]);

  const handleEditorChange = ({ text }) => {
    setPost({ ...post, content: text });
  };


  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload({ target: { files: [file] } });
  }

  function handleDragOver(e) {
    e.preventDefault();
  }


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const { filename } = await res.json();
        setPost({ ...post, image: filename });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/news-events/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (res.ok) router.push('/admin/news-events');
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={e => setPost({ ...post, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={post.type}
                  onChange={e => setPost({ ...post, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="news">News</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div
                className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">Drag & drop an image here, or click to select one</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <MdEditor
                style={{ height: '500px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                value={post.content}
                className="border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/admin/news-events')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}