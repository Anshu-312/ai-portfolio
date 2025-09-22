'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Zap, Target, Award, Users, TrendingUp, Download } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anshu_Bhadani_AI_Engineer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <section id="about" className="section relative">
      {/* SUBTLE BACKGROUND */}
      <div className="absolute inset-0 dots-pattern opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* PORTRAIT */}
          <motion.div
            className="relative order-2 lg:order-1"
            variants={itemVariants}
          >
            <div className="relative">
              <div className="clean-card p-6 sm:p-8 lg:p-10 xl:p-12 relative overflow-hidden">
                {/* BACKGROUND PATTERN */}
                <div className="absolute inset-0 opacity-20">
                  <div className="dots-pattern h-full"></div>
                </div>
                
                {/* PORTRAIT */}
                <div className="relative z-10 flex items-center justify-center h-72 sm:h-80 lg:h-96 xl:h-[28rem]">
                  <div className="relative">
                    {/* GLOW EFFECT */}
                    <div className="absolute inset-0 bg-accent-gradient rounded-full blur-lg opacity-20 scale-105"></div>
                    
                    {/* MAIN IMAGE CONTAINER */}
                    <motion.div 
                      className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-accent/50 shadow-2xl"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* IMAGE WITH OVERLAY EFFECTS */}
                      <div className="relative w-full h-full">
                        <img 
                          src="/profile.png" 
                          alt="Anshu Bhadani - AI Solutions Engineer"
                          className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                        />
                        {/* GRADIENT OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-void/20 via-transparent to-transparent"></div>
                      </div>
                    </motion.div>
                    
                    {/* FLOATING ELEMENTS */}
                    <motion.div
                      className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-void/20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Zap className="text-void" size={14} />
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-success rounded-full flex items-center justify-center shadow-lg border-2 border-void/20"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        y: [0, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Target className="text-void" size={12} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            className="space-y-4 lg:space-y-6 order-1 lg:order-2"
            variants={itemVariants}
          >
            {/* HEADER */}
            <div>
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-silver mb-4 sm:mb-6"
                variants={itemVariants}
              >
                About Me
              </motion.h2>
              
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-gradient rounded-full flex items-center justify-center">
                  <Award className="text-void" size={20} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-accent">Anshu Bhadani</div>
                  <div className="text-silver/60 text-sm sm:text-base">AI Solutions Engineer and Product Builder</div>
                </div>
              </div>
            </div>

            {/* NARRATIVE */}
            <motion.div
              className="space-y-4 sm:space-y-6 text-base sm:text-lg text-silver/80 leading-relaxed"
              variants={itemVariants}
            >
              <p>
              I am 24, <span className="text-accent font-bold">an architect of intelligence in its many forms.</span> My work is not just about training models or writing code — it is about weaving meaning into systems, building companions that reflect empathy, and designing technologies that honor the human spirit.
              </p>

              <p>
              Across 8 projects, from the solitude of research labs to the complexity of enterprise deployments, I have learned a simple truth:<br></br> 
              <span className="text-accent font-bold">The most powerful AI is not only measured by accuracy or speed, but also by its ability to connect, to guide, to be trusted.</span>
              </p>
              <p>
              I’m now focused on building AI systems that are not only technically sound but profoundly human — solutions that transform businesses while respecting the complexity of human experience.
              </p>

              {/* TESTIMONIAL */}
              <div className="clean-card p-6 sm:p-8 relative overflow-hidden glow">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="dots-pattern h-full"></div>
                </div>
                
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-accent/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9z"/>
                  </svg>
                </div>
                
                <div className="relative z-10">
                  {/* Quote Text */}
                  <blockquote className="text-silver/90 text-base sm:text-lg italic leading-relaxed mb-4 sm:mb-6">
                    "True intelligence is <span className="text-accent font-bold">not in the algorithms we perfect</span>, but in the <span className="text-accent font-bold">empathy we design into them</span>."
                  </blockquote>
                  
                  
                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-gradient rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-void">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-silver text-sm sm:text-base">Anshu Bhadani</div>
                      <div className="text-accent text-xs sm:text-sm">AI Solutions Engineer and Product Builder</div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
              When I am not shaping these digital beings, I am searching the liminal space between human psychology and machine intelligence — a frontier where curiosity and consciousness intertwine, and where technology becomes not just useful, but meaningful.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              variants={itemVariants}
            >
              <Link href="#projects" className="btn-primary w-full sm:w-auto">
                <Users className="inline-block mr-2" size={24} />
                Explore My Work
              </Link>
              <Link href="#contact" className="btn-secondary w-full sm:w-auto">
                <TrendingUp className="inline-block mr-2" size={24} />
                Partner With Me
              </Link>
              <button className="btn-outline w-full sm:w-auto" onClick={handleDownloadResume}>
                <Download className="inline-block mr-2" size={24} />
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;