'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Brain, Cpu, Database, Cloud, Settings, Zap, Code, Layers, Palette, ChevronLeft, ChevronRight } from 'lucide-react';

const Skills = () => {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollAdjusted = useRef(false);

  // Center the initial card when component comes into view
  useEffect(() => {
    if (isInView) {
      scrollAdjusted.current = false; // Reset flag when component comes into view
    }
  }, [isInView]);

  // Center the card when currentIndex changes - but only if not already adjusted
  useEffect(() => {
    if (scrollRef.current && isInView && !scrollAdjusted.current) {
      setTimeout(() => {
        const cards = scrollRef.current.querySelectorAll('[data-card-index]');
        const targetCard = cards[currentIndex];

        if (targetCard) {
          const containerRect = scrollRef.current.getBoundingClientRect();
          const cardRect = targetCard.getBoundingClientRect();

          // Calculate the center position accounting for actual transforms
          const containerCenter = containerRect.width / 2;
          const cardCenter = cardRect.left - containerRect.left + (cardRect.width / 2);

          // Adjust scrollAmount to ensure the center card stays in focus
          const scrollAmount = cardCenter - containerCenter;
          const newScrollLeft = scrollRef.current.scrollLeft + scrollAmount;


          scrollRef.current.scrollTo({ 
            left: Math.max(0, newScrollLeft), 
            behavior: 'smooth' 
          });

          scrollAdjusted.current = true; // Flag that the scroll has been adjusted
        }
      }, 100); // Delay to ensure transforms are applied
    }
  }, [currentIndex, isInView]); // Trigger when currentIndex changes AND component is in view

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      scrollAdjusted.current = false; // Reset flag on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      scrollAdjusted.current = false; // Reset scroll adjustment flag
      
      // Adjust scroll position dynamically after state update
      setTimeout(() => {
        const cards = scrollRef.current.querySelectorAll('[data-card-index]');
        const targetCard = cards[newIndex];
        
        if (targetCard) {
          const containerRect = scrollRef.current.getBoundingClientRect();
          const cardRect = targetCard.getBoundingClientRect();
          const containerCenter = containerRect.width / 2;
          const cardCenter = cardRect.left - containerRect.left + (cardRect.width / 2);
          const scrollAmount = cardCenter - containerCenter;
          const newScrollLeft = scrollRef.current.scrollLeft + scrollAmount;
          
          
          scrollRef.current.scrollTo({ 
            left: Math.max(0, newScrollLeft), 
            behavior: 'smooth' 
          });
        }
      }, 100);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const totalCards = Object.keys(skillCategories).length;
      const newIndex = Math.min(totalCards - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
      scrollAdjusted.current = false; // Reset scroll adjustment flag
      
      // Adjust scroll position dynamically after state update
      setTimeout(() => {
        const cards = scrollRef.current.querySelectorAll('[data-card-index]');
        const targetCard = cards[newIndex];
        
        if (targetCard) {
          const containerRect = scrollRef.current.getBoundingClientRect();
          const cardRect = targetCard.getBoundingClientRect();
          const containerCenter = containerRect.width / 2;
          const cardCenter = cardRect.left - containerRect.left + (cardRect.width / 2);
          const scrollAmount = cardCenter - containerCenter;
          const newScrollLeft = scrollRef.current.scrollLeft + scrollAmount;
          
          
          scrollRef.current.scrollTo({ 
            left: Math.max(0, newScrollLeft), 
            behavior: 'smooth' 
          });
        }
      }, 100);
    }
  };

  const skillCategories = {
    'Code Alchemy': {
      icon: Cpu,
      color: 'accent',
      description: 'Transforming abstract ideas into working systems',
      skills: [
        'Python',
        'FastAPI + Uvicorn',
        'Flask',
        'Node.js',
        'JavaScript'
      ]
    },
    'LLM Ecosystems': {
      icon: Brain,
      color: 'accent',
      description: 'Working across the major families of large language models',
      skills: [
        'ChatGPT (3.5 / 4 / 4.1 / 5)',
        'Claude (3.5 / 3.7 / 4)',
        'Mistral (7B / Mixtral)',
        'Gemini (2.0 / 2.5 Pro)',
        'Qwen 2.5 Coder',
        ''
      ]
    },
    'Vector Consciousness': {
      icon: Database,
      color: 'accent',
      description: 'Where knowledge is embedded, stored, and retrieved',
      skills: [
        'LangChain',
        'FAISS',
        'Sentence Transformers',
        'RAG Architectures',
        'Knowledge Base Management',
        'Prompt Engineering'
      ]
    },
    'Data Sanctuaries': {
      icon: Database,
      color: 'accent',
      description: 'Where data finds its home',
      skills: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Neo4j',
        'SQLite',
        'MS SQL Server',
        'Redis'
      ]
    },
    'Learning Machines': {
      icon: Cloud,
      color: 'accent',
      description: 'Teaching computers to learn, adapt, and predict',
      skills: [
        'TensorFlow',
        'PyTorch',
        'Scikit-learn',
        'NumPy/Pandas',
        'Matplotlib/Seaborn',
        'Hugging Face',
        'Custom Models',
      ]
    },
    'Digital Experiences': {
      icon: Code,
      color: 'accent',
      description: 'Where humans meet technology',
      skills: [
        'React',
        'Next.js',
        'Bootstrap',
        'Tailwind CSS',
        'Framer Motion',
        'Responsive Design',
        'User Psychology'
      ]
    },
    'DevOps & Infrastructure': {
      icon: Settings,
      color: 'accent',
      description: 'Deploying, scaling, and automating systems',
      skills: [
        'Docker',
        'Kubernetes',
        'Linux',
        'GCP',
        'N8N',
        'Git',
      ]
    },
    'Security & Authentication': {
      icon: Zap,
      color: 'accent',
      description: 'Designing systems that are safe and trustworthy',
      skills: [
        'JWT / OAuth',
        'bcrypt',
        'Fernet Encryption',
        'python-jose',
        'ASGI / WSGI',
        'OWASP Top 10 Security Practices'
      ]
    },
    'Async & Workflow Orchestration': {
      icon: Layers,
      color: 'accent',
      description: 'Orchestrating distributed and asynchronous systems',
      skills: [
        'Celery',
        'Asyncio',
        'Pydantic',
        'httpx',
        'Sentry'
      ]
    },
    'System Architecture': {
      icon: Settings,
      color: 'accent',
      description: 'Designing scalable, resilient system architectures',
      skills: [
        'Microservices',
        'Event-driven Architecture',
        'API Design',
        'Load Balancing',
        'Caching Strategies',
        'Database Optimization',
      ]
    },
    'Product Management': {
      icon: Zap,
      color: 'accent',
      description: 'From vision to reality — managing the entire product lifecycle',
      skills: [
        'Requirement Gathering',
        'Project Planning',
        'User Research',
        'Agile Methodologies',
        'Cross-functional Collaboration',
        'Quality Assurance'
      ]
    },
    'Design & Collaboration': {
      icon: Palette,
      color: 'accent',
      description: 'Crafting experiences and enabling teamwork',
      skills: [
        'Canva',
        'Miro',
        'Lovable',
        'Jira',
        'Confluence'
      ]
    }
  };
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="section relative">
      {/* SUBTLE BACKGROUND */}
      <div className="absolute inset-0 dots-pattern opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* HEADER */}
          <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
            <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="text-accent" size={32} />
              </motion.div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-silver bg-gradient-to-r from-silver via-accent to-silver bg-clip-text text-transparent">
                Domains of Mastery
              </h2>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="text-accent" size={32} />
              </motion.div>
            </div>
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-lg sm:text-xl text-silver/80 mb-4 leading-relaxed">
                Where <span className="text-accent font-semibold">artificial intelligence</span> meets 
                <span className="text-accent font-semibold"> human creativity</span>
              </p>
              <p className="text-base sm:text-lg text-silver/60 italic">
                Each technology is a brushstroke in the masterpiece of tomorrow's digital landscape
              </p>
            </div>
          </motion.div>

          {/* SKILLS CAROUSEL */}
          <motion.div className="relative mb-12 sm:mb-16" variants={itemVariants}>
            {/* Horizontal Scrollable Container - 3 Cards View */}
            <div className="relative overflow-visible px-2 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 sm:py-12 mt-4 sm:mt-8">
              {/* Navigation Arrows - Positioned relative to carousel container */}
              <button
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                className={`absolute left-0 sm:left-2 md:left-4 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-sm ${
                  currentIndex === 0 
                    ? 'bg-void/50 border-2 border-accent/20 text-silver/40 cursor-not-allowed' 
                    : 'bg-void/95 hover:bg-void border-2 border-accent/40 text-silver hover:text-accent cursor-pointer'
                }`}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              
              <button
                onClick={scrollRight}
                disabled={currentIndex >= Object.keys(skillCategories).length - 1}
                className={`absolute right-0 sm:right-2 md:right-4 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-sm ${
                  currentIndex >= Object.keys(skillCategories).length - 1 
                    ? 'bg-void/50 border-2 border-accent/20 text-silver/40 cursor-not-allowed' 
                    : 'bg-void/95 hover:bg-void border-2 border-accent/40 text-silver hover:text-accent cursor-pointer'
                }`}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <ChevronRight size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <motion.div
                ref={scrollRef}
                className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide pt-2 pb-2 sm:pt-4 sm:pb-4 pl-8 pr-8 sm:pl-12 sm:pr-12"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                variants={containerVariants}
              >
                {Object.entries(skillCategories).map(([category, data], index) => {
                  const Icon = data.icon;
                  const totalCards = Object.keys(skillCategories).length;
                  
                  // Determine how many cards to show and which is center
                  let isVisible = false;
                  let isCenter = false;
                  
                  if (currentIndex === 0) {
                    // At start: show first 3 cards, center is index 0 (first card)
                    isVisible = index < 3;
                    isCenter = index === 0;
                  } else if (currentIndex === totalCards - 1) {
                    // At end: show last 3 cards, center is last card
                    isVisible = index >= totalCards - 3;
                    isCenter = index === totalCards - 1;
                  } else {
                    // In middle: show 3 cards with currentIndex as center
                    isVisible = index >= currentIndex - 1 && index <= currentIndex + 1;
                    isCenter = index === currentIndex;
                  }
                  
                  if (!isVisible) return null;
                  
                  return (
                    <motion.div
                      key={category}
                      data-card-index={index}
                      className="relative flex-shrink-0 w-60 sm:w-72 md:w-80"
                      variants={itemVariants}
                      style={{
                        zIndex: isCenter ? 30 : 10,
                        opacity: isCenter ? 1 : 0.5,
                        filter: isCenter ? 'none' : 'brightness(0.6)',
                        transform: isCenter 
                          ? 'scale(1.05) translateY(0) translateZ(20px)' 
                          : index < currentIndex + 1 
                            ? 'scale(0.9) translateY(8px) translateX(-30px) translateZ(0px)' 
                            : 'scale(0.9) translateY(8px) translateX(30px) translateZ(0px)',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    >
                      <div 
                        className={`relative clean-card p-2 sm:p-4 md:p-6 h-72 sm:h-96 md:h-[28rem] border flex flex-col ${
                          isCenter ? 'border-accent/80 shadow-2xl' : 'border-accent/20'
                        }`}
                        style={{
                          boxShadow: isCenter 
                            ? '0 20px 40px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.2)' 
                            : '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 3px 10px -2px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                      {/* CATEGORY HEADER */}
                      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-4">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-accent-gradient rounded-lg sm:rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0">
                          <Icon className="text-void relative z-10" size={14} />
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-silver mb-1 leading-tight">
                            {category}
                          </h3>
                          <p className="text-xs sm:text-sm text-silver/70 italic leading-relaxed">
                            {data.description}
                          </p>
                        </div>
                      </div>

                      {/* SKILLS LIST */}
                      <div className="space-y-1 sm:space-y-2 flex-grow overflow-hidden">
                        {data.skills.map((skill, skillIndex) => (
                          <div 
                            key={skillIndex} 
                            className="flex items-center justify-between p-1 sm:p-2 rounded-lg"
                          >
                            <span className="text-silver font-medium text-xs sm:text-sm flex-1 truncate">
                              {skill}
                            </span>
                            <div className="flex items-center gap-0.5 sm:gap-1 ml-2 flex-shrink-0">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                                    i < 4 ? 'bg-accent' : 'bg-charcoal/50'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </motion.div>
            </div>
          </motion.div>

          {/* TESTIMONIAL SECTION */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            <motion.div
              className="md:col-span-2 lg:col-span-3"
              variants={itemVariants}
            >
              <div className="clean-card p-6 sm:p-8 h-full relative overflow-hidden text-left border border-accent/5">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="dots-pattern h-full"></div>
                </div>
                
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-accent/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9z"/>
                  </svg>
                </div>
                
                <div className="relative z-10">
                <blockquote className="text-silver/90 text-base sm:text-lg italic leading-relaxed mb-4 sm:mb-6">
                    "<span className="text-accent font-semibold">Every line of code is a question:</span> not just what a machine can do, but what it means for us to trust it. — Every project is a step toward mastering the art."
                  </blockquote>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-void">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-silver text-sm sm:text-base">Anshu Bhadani</div>
                      <div className="text-accent text-xs sm:text-sm">AI Solutions Engineer and Product Builder</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;