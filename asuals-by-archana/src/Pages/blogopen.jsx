import React, { useState } from 'react';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Bookmark, Clock } from 'lucide-react';

const BlogDetailPage = () => {
    const [currentPostId, setCurrentPostId] = useState(1);
    
    const blogPosts = [
        {
            id: 1,
            title: "The Art of Minimalist Fashion: Less is More",
            excerpt: "Discover how to create a timeless wardrobe with fewer, better pieces that reflect your personal style and values.",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
            author: "Archana",
            date: "March 15, 2024",
            category: "Style Tips",
            readTime: "5 min read",
            content: `
                <p>In a world obsessed with fast fashion and constantly changing trends, minimalist fashion offers a refreshing alternative. The philosophy of "less is more" isn't just about reducing clutter in your closet—it's about making intentional choices that reflect your values and personal style.</p>

                <h2>What is Minimalist Fashion?</h2>
                <p>Minimalist fashion is characterized by clean lines, neutral colors, and timeless pieces that can be mixed and matched effortlessly. It's about investing in quality over quantity and choosing pieces that serve multiple purposes in your wardrobe.</p>

                <h2>The Benefits of a Minimalist Wardrobe</h2>
                <p>Adopting a minimalist approach to fashion offers numerous benefits:</p>
                <ul>
                    <li><strong>Reduced decision fatigue:</strong> With fewer options, getting dressed becomes simpler and faster</li>
                    <li><strong>Better quality pieces:</strong> Investing in fewer, higher-quality items means your clothes will last longer</li>
                    <li><strong>Versatility:</strong> Each piece can be styled in multiple ways, maximizing your outfit possibilities</li>
                    <li><strong>Sustainability:</strong> Buying less contributes to a more sustainable fashion industry</li>
                </ul>

                <h2>Building Your Minimalist Wardrobe</h2>
                <p>Start by assessing your current wardrobe. Keep pieces that you love, fit well, and align with your lifestyle. Focus on neutral colors like black, white, gray, navy, and beige that can be easily mixed and matched.</p>

                <p>Essential pieces for a minimalist wardrobe include:</p>
                <ul>
                    <li>A well-fitted white button-down shirt</li>
                    <li>Quality denim in a classic cut</li>
                    <li>A versatile blazer</li>
                    <li>Comfortable, stylish shoes in neutral tones</li>
                    <li>A little black dress that can be dressed up or down</li>
                </ul>

                <h2>Styling Tips for Minimalist Fashion</h2>
                <p>The key to successful minimalist styling is in the details. Focus on fit, fabric quality, and subtle variations in texture. A simple outfit can be elevated with the right accessories—think a classic watch, quality leather bag, or statement jewelry piece.</p>

                <p>Remember, minimalist fashion isn't about being boring or restrictive. It's about being intentional with your choices and finding beauty in simplicity. When you curate a wardrobe of pieces you truly love, getting dressed becomes an act of self-expression rather than a daily struggle.</p>

                <p>Embrace the minimalist mindset and discover how less truly can be more when it comes to fashion. Your future self—and your closet—will thank you.</p>
            `
        },
        {
            id: 2,
            title: "Sustainable Fashion: Building an Eco-Conscious Wardrobe",
            excerpt: "Learn how to make environmentally responsible fashion choices without compromising on style.",
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=400&fit=crop",
            author: "Archana",
            date: "March 12, 2024",
            category: "Sustainability",
            readTime: "7 min read",
            content: `
                <p>The fashion industry is one of the world's most polluting industries, but as consumers, we have the power to drive change through our purchasing decisions. Building an eco-conscious wardrobe doesn't mean sacrificing style—it means making thoughtful choices that benefit both you and the planet.</p>

                <h2>Understanding Sustainable Fashion</h2>
                <p>Sustainable fashion encompasses various practices aimed at reducing the environmental and social impact of clothing production. This includes using eco-friendly materials, ethical labor practices, and designing for durability and longevity.</p>

                <h2>How to Build an Eco-Conscious Wardrobe</h2>
                <p>Start by shopping your own closet. Often, we have forgotten gems that can be restyled or repurposed. Next, consider these sustainable shopping strategies:</p>
                
                <ul>
                    <li><strong>Buy less, choose well:</strong> Invest in high-quality pieces that will last for years</li>
                    <li><strong>Support sustainable brands:</strong> Research brands that prioritize environmental responsibility</li>
                    <li><strong>Choose natural fibers:</strong> Opt for organic cotton, linen, wool, and other biodegradable materials</li>
                    <li><strong>Shop secondhand:</strong> Thrift stores and vintage shops offer unique pieces with lower environmental impact</li>
                </ul>

                <p>Remember, sustainable fashion is a journey, not a destination. Every conscious choice you make contributes to a more sustainable future for the fashion industry.</p>
            `
        },
        {
            id: 3,
            title: "Capsule Wardrobe Essentials: 20 Pieces for Every Season",
            excerpt: "Master the art of the capsule wardrobe with these essential pieces that work for any season.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
            author: "Archana",
            date: "March 10, 2024",
            category: "Wardrobe",
            readTime: "6 min read",
            content: `
                <p>A capsule wardrobe is a curated collection of essential items that can be mixed and matched to create numerous outfits. The concept, popularized by Susie Faux in the 1970s, focuses on quality over quantity and timeless style over fleeting trends.</p>

                <h2>The Philosophy Behind Capsule Wardrobes</h2>
                <p>The goal of a capsule wardrobe is to have a smaller selection of clothes that you absolutely love and that work well together. This approach simplifies decision-making, reduces clutter, and ensures that everything in your closet serves a purpose.</p>

                <h2>The Essential 20 Pieces</h2>
                <p>Here are the foundational pieces that form the backbone of any versatile capsule wardrobe:</p>

                <h3>Tops (7 pieces):</h3>
                <ul>
                    <li>Classic white button-down shirt</li>
                    <li>Striped long-sleeve tee</li>
                    <li>Black turtleneck</li>
                    <li>Cashmere sweater in neutral tone</li>
                    <li>Silk blouse</li>
                    <li>Basic white t-shirt</li>
                    <li>Lightweight cardigan</li>
                </ul>

                <h3>Bottoms (5 pieces):</h3>
                <ul>
                    <li>Dark wash straight-leg jeans</li>
                    <li>Black trousers</li>
                    <li>Midi skirt</li>
                    <li>Tailored shorts</li>
                    <li>Leggings</li>
                </ul>

                <p>Building a capsule wardrobe is an investment in both your style and your lifestyle. Take time to identify your personal aesthetic and choose pieces that reflect your authentic self.</p>
            `
        }
    ];

    const currentPost = blogPosts.find(post => post.id === currentPostId);
    const currentIndex = blogPosts.findIndex(post => post.id === currentPostId);
    const nextPost = blogPosts[currentIndex + 1];
    const prevPost = blogPosts[currentIndex - 1];

    const navigateToPost = (postId) => {
        setCurrentPostId(postId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                {/* Article Header */}
                <header className="mb-12">
                    <div className="mb-6">
                        <span className="bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide">
                            {currentPost.category}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-light text-black mb-6 leading-tight">
                        {currentPost.title}
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        {currentPost.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-black">{currentPost.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{currentPost.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{currentPost.readTime}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-12">
                    <img
                        src={currentPost.image}
                        alt={currentPost.title}
                        className="w-full h-96 object-cover grayscale"
                    />
                </div>

                {/* Article Content */}
                <div 
                    className="prose prose-lg max-w-none"
                    style={{
                        color: '#374151',
                        lineHeight: '1.8'
                    }}
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />
            </article>

            <style jsx>{`
                .prose h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #000;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }
                
                .prose h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #000;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                
                .prose p {
                    margin-bottom: 1.5rem;
                    font-size: 1.125rem;
                }
                
                .prose ul {
                    margin: 1.5rem 0;
                    padding-left: 1.5rem;
                }
                
                .prose li {
                    margin-bottom: 0.75rem;
                    font-size: 1.125rem;
                }
                
                .prose strong {
                    font-weight: 600;
                    color: #000;
                }
            `}</style>
        </div>
    );
};

export default BlogDetailPage;