import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/header/Header';
import Link from 'next/link';


const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/news-events');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/admin/news-events/${slug}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto py-8">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">News & Events Manager</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create New
          </button>

        </div>

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl">News & Events Admin</h1>
          <Link
            href="/admin/news-events/create"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create New Post
          </Link>
        </div>

        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {posts.map((post) => (
                <tr key={post.slug} className="border-b border-gray-200">
                  <td className="py-3 px-4">{post.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded ${post.type === 'News'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-200 text-blue-800'
                      }`}>
                      {post.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{post.date}</td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/admin/news-events/${post.slug}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;