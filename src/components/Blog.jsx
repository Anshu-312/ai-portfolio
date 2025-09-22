'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Calendar, Clock, BookOpen, PenTool, Sparkles } from 'lucide-react';
import ArticleViewer from './ArticleViewer';
import { articles } from '../data/articles';

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  // Get featured articles (first 3)
  const featuredArticles = articles.slice(0, 3);

  // Get recent posts (articles 4-6, or all if less than 6)
  const recentPosts = articles.slice(3, 6).length > 0 ? articles.slice(3, 6) : articles.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToBlog = () => {
    setSelectedArticle(null);
  };

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
      } else {
        if (data.alreadySubscribed) {
          setSubscriptionStatus('already_subscribed');
        } else {
          setSubscriptionStatus('error');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  };

  // Handle escape key to close modal and disable background scrolling
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedArticle) {
        handleBackToBlog();
      }
    };

    if (selectedArticle) {
      document.addEventListener('keydown', handleEscape);
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Add class to disable background scrolling
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollY}px`;
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
      };
    } else {
      // Clean up when modal is closed
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    }
  }, [selectedArticle]);

  // Modal for article viewing
  const ArticleModal = () => {
    if (!selectedArticle) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleBackToBlog();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl h-[90vh] sm:h-[92vh] md:h-[95vh] bg-void rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-accent/20 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <ArticleViewer article={selectedArticle} onBack={handleBackToBlog} />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {/* ARTICLE MODAL */}
      <ArticleModal />
      
      <section id="blog" className="section relative py-8 sm:py-12 lg:py-16">
        {/* Structured Data for Blog */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "AI Engineering Insights & Research",
              "description": "Deep thoughts on AI, technology, and the future of intelligent systems",
              "url": "https://ai-engineer-portfolio.vercel.app/#blog",
              "author": {
                "@type": "Person",
                "name": "Anshu Bhadani",
                "url": "https://ai-engineer-portfolio.vercel.app"
              },
              "blogPost": articles.map(article => ({
                "@type": "BlogPosting",
                "headline": article.title,
                "description": article.excerpt,
                "datePublished": article.publishDate,
                "author": {
                  "@type": "Person",
                  "name": "Anshu Bhadani"
                },
                "keywords": article.tags.join(", "),
                "articleSection": article.category
              }))
            })
          }}
        />
        {/* SUBTLE BACKGROUND */}
        <div className="absolute inset-0 dots-pattern opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-h-[400px]"
        >
          {/* HEADER */}
          <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <BookOpen className="text-accent" size={24} />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-silver">
                Insights & Research
              </h2>
              <PenTool className="text-accent" size={24} />
            </div>
            <p className="text-base sm:text-lg text-silver/70 max-w-4xl mx-auto px-4">
              Deep thoughts on AI, technology, and the future of intelligent systems. 
              Where research meets real-world application.
            </p>
          </motion.div>

          {/* FEATURED ARTICLES */}
          <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
            <h3 className="text-2xl sm:text-3xl font-bold text-silver mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <Sparkles className="text-accent" size={24} />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="card-subtle overflow-hidden group cursor-pointer flex flex-col h-full"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleArticleClick(article)}
                >
                  {/* ARTICLE IMAGE */}
                  <div className="relative h-40 sm:h-48 bg-void overflow-hidden">
                    <div className="absolute inset-0 bg-accent-gradient opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl sm:text-6xl font-bold text-accent opacity-30">
                        {article.title.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 bg-accent text-void text-xs sm:text-sm font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* ARTICLE CONTENT */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h4 className="font-semibold text-silver text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-gold-silver transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-silver/70 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base flex-grow">
                      {article.excerpt}
                    </p>
                    
                    {/* META INFORMATION */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-silver/60 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{new Date(article.publishDate).toLocaleDateString('en-US')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-charcoal text-accent text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* READ MORE */}
                    <div className="flex items-center text-accent group-hover:gap-2 transition-all mt-auto">
                      <span className="text-xs sm:text-sm font-medium">Read Article</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* RECENT POSTS */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-silver mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
              <BookOpen className="text-accent" size={20} />
              Recent Posts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentPosts.map((post, index) => (
                <motion.article
                  key={index}
                  className="card-subtle p-3 sm:p-4 md:p-6 group cursor-pointer flex flex-col"
                  whileHover={{ y: -2, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleArticleClick(post)}
                >
                  <h4 className="font-semibold text-silver mb-2 sm:mb-3 group-hover:text-gold-silver transition-colors text-sm sm:text-base md:text-lg leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-silver/70 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm text-silver/60 mb-2 sm:mb-3">
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US')}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-charcoal text-accent text-xs sm:text-sm rounded-full border border-accent/20 hover:border-accent/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* READ MORE */}
                  <div className="flex items-center text-accent group-hover:gap-2 transition-all mt-auto">
                    <span className="text-xs sm:text-sm font-medium">Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* NEWSLETTER CTA */}
          <motion.div className="text-center mt-12 sm:mt-16" variants={itemVariants}>
            <div className="card-subtle p-6 sm:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-silver mb-3 sm:mb-4">
                Stay Updated
              </h3>
              <p className="text-silver/80 mb-4 sm:mb-6 text-sm sm:text-base">
                Get notified when I publish new insights on AI, technology, and the future of intelligent systems.
              </p>
              
              {subscriptionStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">
                    Successfully subscribed! You'll receive updates about new posts.
                  </p>
                </div>
              )}
              
              {subscriptionStatus === 'already_subscribed' && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-400 text-sm font-medium">
                    This email is already subscribed to our newsletter.
                  </p>
                </div>
              )}
              
              {subscriptionStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm font-medium">
                    Subscription failed. Please try again or contact me directly.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-charcoal border border-accent/20 rounded-lg text-silver placeholder-silver/50 focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="btn-primary px-6 py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Blog;