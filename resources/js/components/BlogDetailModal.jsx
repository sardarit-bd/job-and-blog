import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Calendar, Clock, User, Tag } from 'lucide-react';

const BlogDetailModal = ({ isOpen, closeModal, blog }) => {
  if (!blog) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl max-h-[90vh] transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all flex flex-col">
                
                {/* Header with Image */}
                <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${blog.color} backdrop-blur-sm`}>
                      {blog.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 leading-tight line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                  <div 
                    className="prose prose-sm sm:prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:mb-3 sm:prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-[#FB721B] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:list-disc prose-ol:list-decimal"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-slate-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FB721B] to-orange-600 flex items-center justify-center text-white font-bold">
                        {blog.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{blog.author}</p>
                        <p className="text-xs text-slate-500">Author</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BlogDetailModal;