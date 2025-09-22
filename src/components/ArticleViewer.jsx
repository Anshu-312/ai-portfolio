'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Tag, X } from 'lucide-react';
import { useState } from 'react';

const ArticleViewer = ({ article, onBack }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setIsSharing(true);
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => setIsSharing(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full bg-void text-silver flex flex-col"
    >
      {/* HEADER */}
      <div className="flex-shrink-0 bg-gradient-to-r from-void via-void to-void border-b border-accent/30 shadow-lg">
        <div className="max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 sm:gap-3 text-accent hover:text-gold-silver transition-all duration-300 group"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <span className="font-medium text-sm sm:text-base">Back to Blog</span>
          </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-charcoal/80 hover:bg-accent/20 rounded-lg sm:rounded-xl transition-all duration-300 border border-accent/20 hover:border-accent/40"
            >
              <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-medium text-sm sm:text-base">{isSharing ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onBack}
              className="p-2 sm:p-2.5 text-silver/60 hover:text-silver hover:bg-charcoal/80 rounded-lg sm:rounded-xl transition-all duration-300 border border-transparent hover:border-accent/20"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <article className="flex-1 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-y-auto">
        {/* ARTICLE HEADER */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent text-void text-xs sm:text-sm font-semibold rounded-full shadow-lg">
              {article.category}
            </span>
            {article.subcategory && (
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-charcoal/80 text-accent text-xs sm:text-sm rounded-full border border-accent/20">
                {article.subcategory}
              </span>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-silver mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-silver via-gold-silver to-silver bg-clip-text text-transparent">
            {article.title}
          </h1>
          
          <p className="text-base sm:text-lg text-silver/90 mb-4 sm:mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-silver/70 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="font-medium text-sm sm:text-base">{article.author || 'AI Solutions Engineer'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="font-medium text-sm sm:text-base">{new Date(article.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
              <span className="font-medium text-sm sm:text-base">{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* FEATURED IMAGE */}
        {article.featuredImage && (
          <div className="mb-12 relative">
            <div className="aspect-video bg-gradient-to-br from-accent/20 via-accent/10 to-void rounded-xl overflow-hidden border border-accent/20 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {article.featuredImage}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLE BODY */}
        <div className="prose prose-lg max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            {article.content.map((section, index) => (
              <div key={index} className="space-y-4 sm:space-y-6">
                {section.type === 'paragraph' && (
                  <p className="text-base sm:text-lg text-silver/90 leading-relaxed font-light">
                    {section.text}
                  </p>
                )}

                {section.type === 'heading' && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-silver mt-12 sm:mt-16 mb-6 sm:mb-8 bg-gradient-to-r from-silver to-gold-silver bg-clip-text text-transparent">
                    {section.text}
                  </h2>
                )}

                {section.type === 'subheading' && (
                  <h3 className="text-lg sm:text-xl font-semibold text-accent mb-3 sm:mb-4">
                    {section.text}
                  </h3>
                )}

                {section.type === 'code' && (
                  <div className="bg-charcoal/80 border border-accent/20 p-4 sm:p-6 rounded-lg sm:rounded-xl overflow-x-auto shadow-lg">
                    <code className="text-accent text-xs sm:text-sm font-mono">
                      {section.text}
                    </code>
                  </div>
                )}

                {section.type === 'callout' && (
                  <div className="bg-gradient-to-r from-accent/10 to-charcoal/50 border-l-4 border-accent p-8 my-10 rounded-r-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-accent mb-4">
                      {section.title}
                    </h3>
                    <p className="text-silver/90 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                )}

                {section.type === 'list' && (
                  <ul className="text-silver/90 space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className="text-accent mt-1.5 text-lg">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === 'grid' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-charcoal/60 border border-accent/20 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h4 className="font-semibold text-silver mb-3 text-lg">{item.title}</h4>
                        <p className="text-silver/90 leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'highlight' && (
                  <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-void border border-accent/30 rounded-2xl p-10 my-12 shadow-2xl">
                    <h3 className="text-2xl font-semibold text-accent mb-6">
                      {section.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          <h4 className="font-semibold text-silver text-lg">{item.title}</h4>
                          <p className="text-silver/90 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.type === 'steps' && (
                  <div className="space-y-6 my-12">
                    {section.items.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-6">
                        <div className="w-10 h-10 bg-accent text-void rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {stepIndex + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-silver mb-3 text-lg">{step.title}</h3>
                          <p className="text-silver/90 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'takeaways' && (
                  <div className="bg-gradient-to-r from-charcoal/80 to-charcoal/60 border border-accent/30 rounded-2xl p-8 mt-16 shadow-2xl">
                    <h3 className="text-2xl font-semibold text-accent mb-6">
                      {section.title}
                    </h3>
                    <ul className="text-silver/90 space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="text-accent mt-1.5 text-lg">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ARTICLE FOOTER */}
        <footer className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 md:pt-10 border-t border-accent/30">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-charcoal/80 text-accent text-xs sm:text-sm rounded-full border border-accent/20 hover:border-accent/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-silver/70">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                  <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span className="font-medium text-sm sm:text-base">{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                  <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span className="font-medium text-sm sm:text-base">{new Date(article.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-accent text-void rounded-lg sm:rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-medium text-sm sm:text-base">Share Article</span>
            </button>
          </div>
        </footer>
      </article>
    </motion.div>
  );
};

export default ArticleViewer;
