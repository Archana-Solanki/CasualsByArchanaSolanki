import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Navbar from "../Components/Navbar";

const BlogPage = () => {
    const blogPosts = [
        {
            id: 1,
            title: "The Art of Minimalist Fashion: Less is More",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop",
            author: "Archana",
            date: "March 15, 2024",
            category: "Style Tips",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Sustainable Fashion: Building an Eco-Conscious Wardrobe",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra venenas...",
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&h=300&fit=crop",
            author: "Archana",
            date: "March 12, 2024",
            category: "Sustainability",
            readTime: "7 min read"
        },
        {
            id: 3,
            title: "Capsule Wardrobe Essentials: 20 Pieces for Every Season",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor...",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
            author: "Archana",
            date: "March 10, 2024",
            category: "Wardrobe",
            readTime: "6 min read"
        },
        {
            id: 4,
            title: "From Day to Night: Versatile Pieces That Transform",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque...",
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop",
            author: "Archana",
            date: "March 8, 2024",
            category: "Style Tips",
            readTime: "4 min read"
        },
        {
            id: 5,
            title: "The Psychology of Color in Fashion: What Your Outfit Says",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas vestibulum...",
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=300&fit=crop",
            author: "Archana",
            date: "March 5, 2024",
            category: "Fashion Psychology",
            readTime: "8 min read"
        },
        {
            id: 6,
            title: "Accessorizing 101: The Power of Statement Pieces",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a curabitur...",
            image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&h=300&fit=crop",
            author: "Archana",
            date: "March 3, 2024",
            category: "Accessories",
            readTime: "5 min read"
        }
    ];

    const categories = ["All", "Style Tips", "Sustainability", "Wardrobe", "Fashion Psychology", "Accessories"];

    return (
        <>
            <Navbar />


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

                {/* Blog Grid */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="group cursor-pointer">
                                {/* Image */}
                                <div className="relative mb-6 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white text-black px-3 py-1 text-xs font-medium uppercase tracking-wide">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-black group-hover:text-gray-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta Information */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <User className="w-3 h-3" />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                        <span className="text-gray-400">{post.readTime}</span>
                                    </div>

                                    {/* Read More */}
                                    <div className="pt-4">
                                        <button className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors group">
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-16">
                        <button className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium">
                            Load More Articles
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default BlogPage;