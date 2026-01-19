import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

const BlogHero = ({ heroData, searchTerm, setSearchTerm, handleSearch }) => {
  // Strip <p> tags from RichEditor output
  const cleanTitle = (html) => {
    if (!html) return 'Blogs Worth <span style="color: #FB721B;">Reading</span>';
    return html.replace(/<\/?p>/g, '');
  };

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10">      
            {/* Dynamic Title with HTML support */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 hero-title"
              dangerouslySetInnerHTML={{ __html: heroData?.title || 'Blogs Worth <span style="color: #FB721B;">Reading</span>' }}
            />
            
            {/* Dynamic Moto */}
            <p className="text-lg text-slate-600 font-['Inter'] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData?.moto || 'You can start here with this vault that includes posts about healthcare, legal, finance, tech, and construction—plus interviews, day-in-the-life content, frequently asked questions, and more.'}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto lg:mx-0 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for a topic ..."
                className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl bg-white shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
            
            <div className="absolute -top-6 -right-6 bg-white p-3 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
              <div className="bg-orange-100 p-2 rounded-xl">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;