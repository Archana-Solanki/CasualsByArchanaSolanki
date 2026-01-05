import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react';
// Note: You'll need to import useNavigate from react-router-dom in your actual implementation
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
const apiUrl = import.meta.env.VITE_API_URL;

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Note: In your actual implementation, uncomment this line:
    const navigate = useNavigate();

    // Fetch blogs from backend
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/blogs`);

            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const data = await response.json();
            setBlogPosts(Array.isArray(data) ? data : []);
            setFilteredPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    // Extract unique categories from blog posts based on your schema
    // Since your schema doesn't have a category field, you might want to add one
    // For now, we'll create categories based on blog content or add a default
    const extractCategories = () => {
        const cats = ['All'];
        blogPosts.forEach(post => {
            // You can categorize based on blog heading keywords or add category field to schema
            if (post.blogHeading) {
                if (post.blogHeading.toLowerCase().includes('fashion')) cats.push('Fashion');
                if (post.blogHeading.toLowerCase().includes('style')) cats.push('Style');
                if (post.blogHeading.toLowerCase().includes('trend')) cats.push('Trends');
            }
        });
        return [...new Set(cats)];
    };

    const categories = extractCategories();

    // Filter posts by category
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredPosts(blogPosts);
        } else {
            setFilteredPosts(blogPosts.filter(post =>
                post.blogHeading && post.blogHeading.toLowerCase().includes(selectedCategory.toLowerCase())
            ));
        }
    }, [selectedCategory, blogPosts]);

    const slugify = (str) => str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    const handleClick = (blog) => {
        // Note: In your actual implementation, uncomment this line:
        navigate(`/blog/${slugify(blog.blogHeading)}`, {
            state: { blogId: blog._id }
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Create excerpt from blog content
    const createExcerpt = (post) => {
        if (post.blogSubheading1) return post.blogSubheading1;
        if (post.para1Content) return post.para1Content.substring(0, 150) + '...';
        return 'Click to read more...';
    };

    // Loading state
    if (loading) {
        return (
            <>
                <Navbar />
                <Helmet>
                    <title>Fashion Journal | Style, Trends & Insights | Casuals by Archana Solanki</title>
                    <meta
                        name="description"
                        content="Explore fashion insights, styling tips, and trend stories from Casuals by Archana Solanki. Read our latest blogs on contemporary style and everyday fashion."
                    />
                    <link rel="canonical" href="https://yourdomain.com/blog" />
                </Helmet>
                <div className="min-h-screen bg-white">
                    <section className="bg-black text-white py-20">
                        <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-5xl md:text-6xl font-light mb-6">
                                Fashion Journal
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Discover the latest trends, styling tips, and sustainable fashion insights from our design studio
                            </p>
                        </div>
                    </section>
                    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="flex justify-center items-center min-h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                            <span className="ml-4 text-gray-600">Loading blog posts...</span>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    // Error state
    if (error) {
        return (
            <>
                <Navbar />
                <Helmet>
                    <title>Fashion Journal | Style, Trends & Insights | Casuals by Archana Solanki</title>
                    <meta
                        name="description"
                        content="Explore fashion insights, styling tips, and trend stories from Casuals by Archana Solanki. Read our latest blogs on contemporary style and everyday fashion."
                    />
                    <link rel="canonical" href="https://casualsbyarchanasolanki.in/blogs" />
                </Helmet>
                <div className="min-h-screen bg-white">
                    <section className="bg-black text-white py-20">
                        <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-5xl md:text-6xl font-light mb-6">
                                Fashion Journal
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Discover the latest trends, styling tips, and sustainable fashion insights from our design studio
                            </p>
                        </div>
                    </section>
                    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                                <h3 className="text-red-800 font-semibold mb-2">Error Loading Blog Posts</h3>
                                <p className="text-red-600 mb-4">{error}</p>
                                <button
                                    onClick={fetchBlogs}
                                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Fashion Journal | Style, Trends & Insights | Casuals by Archana Solanki</title>
                <meta
                    name="description"
                    content="Explore fashion insights, styling tips, and trend stories from Casuals by Archana Solanki. Read our latest blogs on contemporary style and everyday fashion."
                />
                <link rel="canonical" href="https://casualsbyarchanasolanki.in/blogs" />
            </Helmet>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="bg-black text-white py-20">
                    <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-light mb-6">
                            Fashion Journal
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Discover the latest trends, styling tips, and sustainable fashion insights from our design studio
                        </p>
                    </div>
                </section>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 text-sm font-medium transition-colors uppercase tracking-wide ${selectedCategory === category
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-gray-500 text-sm">
                                {selectedCategory === 'All' ? blogPosts.length : filteredPosts.length} posts
                                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                            </p>
                        </div>
                    </section>
                )}

                {/* Blog Grid */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-gray-50 rounded-lg p-12">
                                <div className="text-gray-400 mb-4">
                                    <FileText className="w-16 h-16 mx-auto mb-4" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Blog Posts Found</h3>
                                <p className="text-gray-500 mb-6">
                                    {selectedCategory === 'All'
                                        ? "No blog posts are available yet. Check back soon for new content!"
                                        : `No posts found in the "${selectedCategory}" category. Try selecting a different category.`
                                    }
                                </p>
                                {selectedCategory !== 'All' && (
                                    <button
                                        onClick={() => setSelectedCategory('All')}
                                        className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
                                    >
                                        View All Posts
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <article key={post._id} className="group cursor-pointer" onClick={() => handleClick(post)}>
                                    {/* Image */}
                                    <div className="relative mb-6 overflow-hidden bg-gray-200">
                                        <img
                                            src={post.image1}
                                            alt={`${post.blogHeading} - fashion blog by Casuals by Archana Solanki`}
                                            className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-500"></div>

                                        {/* Reading time badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-black bg-opacity-75 text-white px-3 py-1 text-xs font-medium flex items-center space-x-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{post.minutesRead} min</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold text-black group-hover:text-gray-600 transition-colors leading-tight">
                                            {post.blogHeading}
                                        </h2>

                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                            {createExcerpt(post)}
                                        </p>

                                        {/* Meta Information */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-1">
                                                    <User className="w-3 h-3" />
                                                    <span>Admin</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{formatDate(post.date)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Read More */}
                                        <div className="pt-4">
                                            <div className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors group-hover:translate-x-1 transform duration-200">
                                                Read More
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Blog Stats */}
                    {filteredPosts.length > 0 && (
                        <div className="text-center mt-16 pt-8 border-t border-gray-100">
                            <p className="text-gray-500 text-sm">
                                Showing {filteredPosts.length} of {blogPosts.length} blog post{blogPosts.length !== 1 ? 's' : ''}
                                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                            </p>
                            <div className="mt-4 flex justify-center space-x-8 text-xs text-gray-400">
                                <span>Total Reading Time: {blogPosts.reduce((total, post) => total + (post.minutesRead || 0), 0)} minutes</span>
                                <span>Latest: {blogPosts.length > 0 ? formatDate(Math.max(...blogPosts.map(p => new Date(p.date)))) : 'N/A'}</span>
                            </div>
                        </div>
                    )}
                </main>

                {/* API Connection Note */}
                <div className="bg-blue-50 border-t border-blue-100 py-4">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-blue-700 text-sm">
                            <span className="font-medium">API Endpoint:</span> This page connects to <code>/api/blogs</code> for blog data
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;