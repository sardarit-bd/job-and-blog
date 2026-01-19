import React, { useState } from 'react';
import { Search, ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import BlogDetailModal from '../components/BlogDetailModal';

const Blog = ({ blogs, categories, pagination, filters, heroData }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(filters.category || "");
  const [displayedBlogs, setDisplayedBlogs] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [hasMore, setHasMore] = useState(pagination.has_more);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('blogs'), {
      search: searchTerm,
      category: selectedCategory,
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        setDisplayedBlogs(page.props.blogs);
        setCurrentPage(page.props.pagination.current_page);
        setHasMore(page.props.pagination.has_more);
      }
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    router.get(route('blogs'), {
      search: searchTerm,
      category: category,
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        setDisplayedBlogs(page.props.blogs);
        setCurrentPage(page.props.pagination.current_page);
        setHasMore(page.props.pagination.has_more);
      }
    });
  };

  const loadMore = () => {
    router.get(route('blogs'), {
      search: searchTerm,
      category: selectedCategory,
      page: currentPage + 1,
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page) => {
        setDisplayedBlogs([...displayedBlogs, ...page.props.blogs]);
        setCurrentPage(page.props.pagination.current_page);
        setHasMore(page.props.pagination.has_more);
      }
    });
  };

  return (
    <AppLayout>
      <Head title="All Blogs | Job Board" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left z-10">      
              <div 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 [&_.color]:text-[var(--color)] [&_h1]:inline [&_h1]:m-0 [&_strong]:font-extrabold"
                dangerouslySetInnerHTML={{ 
                  __html: heroData?.title || 
                  '<h1><strong>Blogs Worth <span data-color="orange" class="color" style="--color: oklch(0.646 0.222 41.116); --dark-color: oklch(0.75 0.183 55.934)">Reading</span></strong></h1>' 
                }}
              />
              
              <p className="text-lg text-slate-600 font-['Inter'] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {heroData?.moto || 'You can start here with this vault that includes posts about healthcare, legal, finance, tech, and construction—plus interviews, day-in-the-life content, frequently asked questions, and more.'}
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto lg:mx-0 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#FB721B] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search for a topic ..."
                  className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl bg-white shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FB721B] focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-[#FB721B] text-white px-4 rounded-xl font-medium hover:bg-[#e5661a] transition-colors flex items-center gap-2"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                <img 
                  src={heroData?.image || 'https://images.unsplash.com/photo-1499750310159-5254f4cc1575?auto=format&fit=crop&q=80&w=1000'} 
                  alt="Blog Hero" 
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      JS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Featured Post</p>
                      <p className="font-semibold text-slate-800 text-sm truncate">10 Tips for Better Productivity</p>
                    </div>
                    <div className="ml-auto p-2 bg-slate-100 rounded-full text-slate-600">
                       <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-10 right-10 w-full h-full bg-indigo-100 rounded-[2.5rem] transform -rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
            <div className="text-center md:text-left font-['Poppins']">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Blogs</h2>
              <p className="text-slate-600">Hand-picked blogs to keep you updated.</p>
            </div>
            <div className="flex gap-2">
              <select 
                className="bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FB721B] text-sm cursor-pointer hover:border-[#FB721B] transition-colors"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    router.get(route('blogs'), {}, {
                      preserveScroll: true,
                    });
                  }}
                  className="px-4 py-2 bg-[#FB721B] cursor-pointer hover:bg-[#e5661a] text-white text-slate-700 font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {displayedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBlogs.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.color}`}>
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#FB721B] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-slate-700">{post.author}</span>
                        </div>
                        <a 
                          onClick={(e) => {
                            e.preventDefault();
                            openModal(post);
                          }}
                          href="#"
                          className="flex items-center gap-1 text-sm font-semibold text-[#FB721B] hover:text-[#e5661a] transition-colors cursor-pointer"
                        >
                          Read More <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={loadMore}
                    className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-full hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm"
                  >
                    Load More blogs
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No blogs found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your search terms.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  router.get(route('blogs'));
                }}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Blog Detail Modal */}
      <BlogDetailModal 
        isOpen={isModalOpen}
        closeModal={closeModal}
        blog={selectedBlog}
      />
    </AppLayout>
  );
};

export default Blog;