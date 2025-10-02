import React, { useState, useEffect } from "react";
import { Calendar, User, Clock } from "lucide-react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const location = useLocation();
  const blogID = location.state?.blogId; // ✅ you’re already sending it via state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (blogID) {
          const res = await axios.get(`${apiUrl}/blogs/${blogID}`);
          // if your endpoint returns an array, pick the first item
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          setBlog(data);
        } else {
          console.warn("No blog ID passed in state");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogID]);

  // show loading until blog arrives
  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading blog…</p>
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
          <img
            src={blog.image1}
            alt={blog.blogHeading}
            className="w-full h-[70vh] object-cover filter grayscale transition-transform duration-1000"
          />
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
          {/* Floating Header Card */}
          <div className="bg-white/98 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-16 border border-gray-200">
            <header>
              <h1 className="text-4xl md:text-6xl font-light text-black mb-6 leading-tight">
                {blog.blogHeading}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-light">
                {blog.blogSubheading1}
              </p>
              
              {/* Enhanced Meta Section */}
              <div className="flex items-center justify-between py-6 border-t border-gray-100 flex-wrap gap-4">
                <div className="flex items-center space-x-8 flex-wrap gap-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-black">Archana</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(blog.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{blog.minutesRead} min read</span>
                  </div>
                </div>
              </div>
            </header>
          </div>

          {/* Enhanced Article Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-200">
            <div className="prose prose-xl max-w-none" style={{ color: "#374151", lineHeight: "1.9" }}>
              {blog.para1Heading && (
                <h2 className="text-3xl font-light mb-6 text-black relative pl-6">
                  <span className="absolute left-0 top-0 w-1 h-full bg-black rounded-full"></span>
                  {blog.para1Heading}
                </h2>
              )}
              {blog.para1Content && (
                <p className="mb-8 text-lg leading-relaxed first-letter:text-6xl first-letter:font-light first-letter:text-black first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                  {blog.para1Content}
                </p>
              )}

              {blog.para2Heading && (
                <h2 className="text-3xl font-light mb-6 text-black relative pl-6">
                  <span className="absolute left-0 top-0 w-1 h-full bg-gray-700 rounded-full"></span>
                  {blog.para2Heading}
                </h2>
              )}
              {blog.para2Content && (
                <p className="mb-8 text-lg leading-relaxed">{blog.para2Content}</p>
              )}

              {blog.image2 && (
                <div className="my-12 group">
                  <img 
                    src={blog.image2} 
                    alt="second blog visual" 
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl filter grayscale group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}

              {blog.closingHeading && (
                <h2 className="text-3xl font-light mb-6 text-black relative pl-6">
                  <span className="absolute left-0 top-0 w-1 h-full bg-gray-500 rounded-full"></span>
                  {blog.closingHeading}
                </h2>
              )}
              {blog.closingContent && (
                <p className="text-lg leading-relaxed">{blog.closingContent}</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogDetailPage;
