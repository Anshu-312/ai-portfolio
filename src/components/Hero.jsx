'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, Brain, Code, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  // Subtle glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center section overflow-hidden">
      {/* SUBTLE BACKGROUND */}
      <div className="absolute inset-0 dots-pattern opacity-20 sm:opacity-30"></div>

      {/* MAIN CONTENT */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ICON */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent-gradient rounded-full flex items-center justify-center glow">
              <Brain className="text-void" size={32} />
            </div>
            <motion.div
              className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-full opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* HEADLINE */}
        <motion.h1
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 ${
            glitchActive ? 'animate-pulse' : ''
          }`}
          variants={itemVariants}
        >
          <span className="text-gold-silver">I build minds</span>
          <br />
          <span className="text-silver">for machines...</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-silver/80 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2"
          variants={itemVariants}
        >
          From research prototypes to production systems — I design, engineer, and deploy 
          intelligent products that think, learn, and scale.
        </motion.p>

        {/* STATS */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12"
          variants={itemVariants}
        >
          <div className="text-center clean-card p-3 sm:p-4 hover:glow transition-all duration-300 min-w-[100px]">
            <div className="text-xl sm:text-2xl font-bold text-accent gold-text">8</div>
            <div className="text-xs text-silver/60 uppercase tracking-wider">AI Projects</div>
          </div>
          <div className="text-center clean-card p-3 sm:p-4 hover:glow transition-all duration-300 min-w-[100px]">
            <div className="text-xl sm:text-2xl font-bold text-accent gold-text">4</div>
            <div className="text-xs text-silver/60 uppercase tracking-wider">in Production</div>
          </div>
          <div className="text-center clean-card p-3 sm:p-4 hover:glow transition-all duration-300 min-w-[100px]">
            <div className="text-xl sm:text-2xl font-bold text-accent gold-text">12+</div>
            <div className="text-xs text-silver/60 uppercase tracking-wider">Tech Stack</div>
          </div>
          <div className="text-center clean-card p-3 sm:p-4 hover:glow transition-all duration-300 min-w-[100px]">
            <div className="text-xl sm:text-2xl font-bold text-accent gold-text">7+</div>
            <div className="text-xs text-silver/60 uppercase tracking-wider">Months Exp</div>
          </div>
          <div className="text-center clean-card p-3 sm:p-4 hover:glow transition-all duration-300 min-w-[100px]">
            <div className="text-xl sm:text-2xl font-bold text-accent gold-text">∞</div>
            <div className="text-xs text-silver/60 uppercase tracking-wider">Potential</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          variants={itemVariants}
        >
          <Link href="#projects" className="btn-primary w-full sm:w-auto">
            <Code className="inline-block mr-2" size={24} />
            View My Projects
          </Link>
          <Link href="#contact" className="btn-outline w-full sm:w-auto">
            <ArrowRight className="inline-block mr-2" size={24} />
            Let's Build Together
          </Link>
        </motion.div>

        {/* TESTIMONIALS */}
        <motion.div
          className="mt-12 sm:mt-16 mb-16 sm:mb-20 max-w-6xl mx-auto px-4"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Testimonial 1 */}
            <div className="clean-card p-4 sm:p-6 text-left glow relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 opacity-5">
                <div className="dots-pattern h-full"></div>
              </div>
              
              {/* Quote Icon */}
              <div className="absolute top-3 right-3 text-accent/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9z"/>
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="mb-3 sm:mb-4">
                <blockquote className="text-silver/90 text-sm sm:text-base italic leading-relaxed">
                    "Anshu's approach to AI development is 
                    <span className="text-accent font-semibold gold-text"> revolutionary</span>. 
                    He doesn't just build systems—he crafts intelligent solutions that think, learn, and evolve."
                  </blockquote>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-charcoal rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-silver text-xs sm:text-sm">Manish Patel</div>
                      <div className="text-accent text-xs">CEO, Argos Infotech</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="clean-card p-4 sm:p-6 text-left glow relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 opacity-5">
                <div className="dots-pattern h-full"></div>
              </div>
              
              {/* Quote Icon */}
              <div className="absolute top-3 right-3 text-accent/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9z"/>
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="mb-3 sm:mb-4">
                <blockquote className="text-silver/90 text-sm sm:text-base italic leading-relaxed">
                    "Working with Anshu was transformative. His 
                    <span className="text-accent font-semibold gold-text"> production-ready AI systems</span><span> </span>
                    delivered results that exceeded our wildest expectations."
                  </blockquote>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-charcoal rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-silver text-xs sm:text-sm">Shresth Tiwari</div>
                      <div className="text-accent text-xs">Business Analyst | Product Manager, iNest Web Pvt Ltd</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="clean-card p-4 sm:p-6 text-left glow relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 opacity-5">
                <div className="dots-pattern h-full"></div>
              </div>
              
              {/* Quote Icon */}
              <div className="absolute top-3 right-3 text-accent/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9z"/>
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="mb-3 sm:mb-4">
                  <blockquote className="text-silver/90 text-sm sm:text-base italic leading-relaxed">
                    "This isn't just another AI engineer. This is someone who understands that 
                    <span className="text-accent font-semibold gold-text"> intelligence is not just about algorithms</span> — 
                    it's about creating systems that truly understand and adapt."
                  </blockquote>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-charcoal rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-silver text-xs sm:text-sm">Dr. Aurobindo Kar</div>
                      <div className="text-accent text-xs">Professor, Galgotias University</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <ChevronDown className="text-accent" size={24} />
          <div className="text-xs text-silver/60 uppercase tracking-wider hidden sm:block">
            <Link href="#projects">Explore My Work</Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;