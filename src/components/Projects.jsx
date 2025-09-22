'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight, Code, Database, Cloud, Shield, Settings, Zap, Sparkles, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeProject, setActiveProject] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showContactModal, setShowContactModal] = useState(false);

  // Zoom and pan functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };


  const openImage = (imageSrc) => {
    setExpandedImage(imageSrc);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const closeImage = () => {
    setExpandedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Add wheel event listener when modal is open
  useEffect(() => {
    if (expandedImage) {
      const handleWheelEvent = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      };

      document.addEventListener('wheel', handleWheelEvent, { passive: false });
      
      return () => {
        document.removeEventListener('wheel', handleWheelEvent);
      };
    }
  }, [expandedImage, zoomLevel]);

  const projects = [
    {
      id: 'dost',
      title: 'D.O.S.T',
      subtitle: 'Vedic Wisdom Companion Chatbot',
      category: 'Mental Health RAG Bot',
      icon: Sparkles,
      challenge: 'The client needed an empathetic, human-like chatbot grounded in Vedic wisdom — one that could act as a companion, not a cold therapist, while still following psychological frameworks.',
      approach: 'Architected a RAG bot powered by GPT-4 Turbo, constrained strictly to its knowledge base. Designed dynamic AI configurations and fine-tuning to preserve contextual fidelity.',
      solution: 'Built a full system including:\n• Admin dashboard with shared login\n• CRUD operations for knowledge base docs\n• Document chunking + FAISS embeddings with metadata mapping\n• Dynamic AI configuration\n• Intuitive chat UI for end users',
      impact: 'Delivered a production-ready platform enabling clients to provide empathetic companionship at scale. Simplified document management reduced knowledge-base update time by 70%, while maintaining system trust and usability.',
      reflection: 'This project taught me that true intelligence is not just technical accuracy — it’s how human the system feels. The challenge was balancing psychological authenticity with technical rigor.',
      tech: ['Python',  'Flask', 'JWT', 'API Integration', 'ChatGPT-4 Turbo', 'Prompt Engineering','RAG', 'Sentence Transformers', 'all-mini-lm-l6', 'FAISS', 'MYSQL', 'Jinja2', 'Vanilla JS'],
    },
    {
      id: 'qa-chatbot',
      title: 'QA Chatbot',
      subtitle: 'Multi-tenant Chatbot Provider System',
      category: 'RAG Bot',
      icon: Sparkles,
      challenge: 'Needed to create an in-house multi-tenant chatbot API provider system that could serve multiple clients with isolated knowledge bases and prevent data leakage.',
      approach: 'Built complete system powered by Mistral 7B via OpenRouter API, with isolated FAISS indexes, multi-tenant architecture, and comprehensive admin controls.',
      solution: 'Delivered standalone chat UI, JS chat widget, admin dashboard with analytics, Confluence integration, query logs with Excel export, and superadmin dashboard with shared login.',
      impact: 'Created scalable multi-tenant system serving multiple clients with complete isolation, analytics, and easy integration via API keys and JS widgets.',
      reflection: 'The breakthrough was understanding multi-tenancy at scale. Each client needed complete isolation while sharing the same infrastructure. API design became crucial for adoption.',
      tech: ['Python', 'FastAPI', 'Uvicorn', 'JWT', 'API Integration', 'Confluence API', 'Mistral 7B Instruct', 'Prompt Engineering', 'RAG', 'Sentence Transformers', 'all-mini-lm-l6', 'Jinja2', 'Vanilla JS', 'FAISS', 'MYSQL'],
    },
    {
      id: 'drives-nexus',
      title: 'Drive Nexus AI Agent',
      subtitle: 'N8N Automation Agent',
      category: 'AI Automation',
      icon: Sparkles,
      challenge: 'Needed to create an N8N agent that could automate in-app events through natural language chat, integrating with existing Drive Nexus project.',
      approach: 'Built N8N agent using GPT-4.1-mini with custom tools, integrating Q/A chatbot as a tool via API for comprehensive automation capabilities.',
      solution: 'Created intelligent automation agent that understands natural language commands and executes complex workflows, with integrated Q/A capabilities for enhanced functionality.',
      impact: 'Delivered intelligent automation system that reduces manual work and enables natural language control of complex business processes.',
      reflection: 'This project showed me the power of AI agents in automation. The key was creating intuitive tools that users could easily understand and control through natural language.',
      tech: ['N8N', 'GPT-4.1-mini', 'Prompt Engineering','Agentic AI', 'RAG', 'Python', 'Custom Tools', 'API Integration', 'Vanilla JS'],
    },
    {
      id: 'asd-rag-bot',
      title: 'ASD RAG Bot',
      subtitle: 'ASD Assessment & Support System',
      category: 'Healthcare RAG Bot',
      icon: Sparkles,
      challenge: 'Client needed a chatbot for users potentially suffering from ASD, based on DSM framework, that could assess them and create summaries for clinician diagnosis.',
      approach: 'Built comprehensive system with proper session management, admin dashboard with analytics, patient chat mapping, and LLM-based intent tagging for knowledge base documents.',
      solution: 'Created complete healthcare AI system with chat UI, session management, admin controls, analytics, patient mapping, KB operations, and bot configuration management.',
      impact: 'Delivered production-ready healthcare AI system that assists in ASD assessment while maintaining proper session management and clinical workflow integration.',
      reflection: 'Healthcare AI requires extreme care with data privacy and clinical accuracy. The challenge was balancing AI capabilities with medical responsibility and regulatory compliance.',
      tech: ['Python', 'FastAPI', 'Uvicorn', 'JWT', 'API Integration','ChatGPT-4 Turbo', 'Prompt Engineering', 'RAG', 'Sentence Transformers', 'BGE-Embeddings', 'DSM-5 Framework', 'Jinja2', 'Vanilla JS', 'FAISS', 'MYSQL'],
    },
  ];

  const otherProjects = [
    {
      title: 'AI Portfolio Website',
      description: 'Modern responsive portfolio showcasing AI projects with interactive animations and dark theme',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'Responsive Design'],
      link: 'https://github.com/anshu-312/ai-portfolio'
    },
    {
      title: 'SentinelNLP',
      description: 'Ontology-based framework using NLP and transformers for cyber threat detection',
      tech: ['Python', 'Streamlit', 'BERT', 'Neo4j', 'NLP', 'Transformers', 'Ontology'],
      link: 'https://github.com/Anshu-312/sentinelnlp'
    },
    {
      title: 'Plant Disease Detection',
      description: 'CNN-based system for identifying plant diseases from images',
      tech: ['Python', 'Streamlit', 'TensorFlow', 'CNN', 'Image Processing'],
      link: 'https://github.com/Anshu-312/plant-disease-detection'
    },
    {
      title: 'Movie Recommendation System',
      description: 'Content-based and collaborative filtering recommendation engine',
      tech: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'NumPy'],
      link: 'https://github.com/Anshu-312/movie-recommendation-system'
    }
  ];

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
    <section id="projects" className="section">
      {/* Structured Data for Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "AI Engineering Projects",
            "description": "Featured AI and machine learning projects showcasing production-ready systems",
            "itemListElement": projects.map((project, index) => ({
              "@type": "CreativeWork",
              "position": index + 1,
              "name": project.title,
              "description": project.subtitle,
              "about": project.category,
              "keywords": project.tech.join(", "),
              "creator": {
                "@type": "Person",
                "name": "Anshu Bhadani"
              }
            }))
          })
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* HEADER */}
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-silver mb-4 sm:mb-6">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-silver/70 max-w-3xl mx-auto px-4">
              Deep-dive case studies showcasing my approach to building intelligent systems that solve real-world problems.
            </p>
          </motion.div>

          {/* PROJECT NAVIGATION */}
          <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4" variants={itemVariants}>
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(index)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    activeProject === index
                      ? 'bg-accent text-void font-semibold'
                      : 'clean-card text-silver hover:text-accent'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{project.title}</span>
                  <span className="sm:hidden">{project.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </motion.div>

          {/* ACTIVE PROJECT DETAILS */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="clean-card p-4 sm:p-6 lg:p-8 mb-12 sm:mb-16 mx-4 sm:mx-0"
          >
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-gradient rounded-xl flex items-center justify-center">
                    {(() => {
                      const Icon = projects[activeProject].icon;
                      return <Icon className="text-void" size={24} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-silver mb-1 sm:mb-2">
                      {projects[activeProject].title}
                    </h3>
                    <p className="text-accent font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                      {projects[activeProject].subtitle}
                    </p>
                    <span className="inline-block bg-charcoal px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-accent">
                      {projects[activeProject].category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-semibold text-accent mb-2 sm:mb-3 text-sm sm:text-base">Challenge</h4>
                    <p className="text-silver/80 text-sm sm:text-base">{projects[activeProject].challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-accent mb-2 sm:mb-3 text-sm sm:text-base">Approach</h4>
                    <p className="text-silver/80 text-sm sm:text-base">{projects[activeProject].approach}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-accent mb-2 sm:mb-3 text-sm sm:text-base">Solution</h4>
                    <div className="text-silver/80 text-sm sm:text-base whitespace-pre-line">
                      {projects[activeProject].solution}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-accent mb-2 sm:mb-3 text-sm sm:text-base">Impact</h4>
                    <p className="text-silver/80 text-sm sm:text-base">{projects[activeProject].impact}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-accent mb-2 sm:mb-3 text-sm sm:text-base">Reflection</h4>
                    <p className="text-silver/80 italic text-sm sm:text-base">{projects[activeProject].reflection}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-accent mb-3 sm:mb-4 text-sm sm:text-base">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {projects[activeProject].tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-charcoal rounded-full text-xs sm:text-sm text-silver"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* System Architecture Diagram for D.O.S.T */}
                {projects[activeProject].id === 'dost' && (
                  <div>
                    <h4 className="font-semibold text-accent mb-3 sm:mb-4 text-sm sm:text-base">System Architecture</h4>
                    <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-charcoal/50 p-4">
                      <img 
                        src="/D.O.S.T%20flow.png" 
                        alt="D.O.S.T System Architecture Flow Diagram"
                        className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openImage('/D.O.S.T%20flow.png')}
                      />
                    </div>
                  </div>
                )}

                {/* System Architecture Diagram for QA Chatbot */}
                {projects[activeProject].id === 'qa-chatbot' && (
                  <div>
                    <h4 className="font-semibold text-accent mb-3 sm:mb-4 text-sm sm:text-base">System Architecture</h4>
                    <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-charcoal/50 p-4">
                      <img 
                        src="/QAChatbot%20flow.png" 
                        alt="QA Chatbot System Architecture Flow Diagram"
                        className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openImage('/QAChatbot%20flow.png')}
                      />
                    </div>
                  </div>
                )}
                {/* System Architecture Diagram for Drive Nexus */}
                {projects[activeProject].id === 'drives-nexus' && (
                  <div>
                    <h4 className="font-semibold text-accent mb-3 sm:mb-4 text-sm sm:text-base">System Architecture</h4>
                    <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-charcoal/50 p-4">
                      <img 
                        src="/Drives%20Nexus%20flow.png" 
                        alt="Drive Nexus System Architecture Flow Diagram"
                        className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openImage('/Drives%20Nexus%20flow.png')}
                      />
                    </div>
                  </div>
                )}
                {/* System Architecture Diagram for ASD RAG Bot */}
                {projects[activeProject].id === 'asd-rag-bot' && (
                  <div>
                    <h4 className="font-semibold text-accent mb-3 sm:mb-4 text-sm sm:text-base">System Architecture</h4>
                    <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-charcoal/50 p-4">
                      <img 
                        src="/ASD%20flow.png" 
                        alt="ASD RAG Bot System Architecture Flow Diagram"
                        className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        onClick={() => openImage('/ASD%20flow.png')}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="relative group">
                    <button 
                      className="w-full sm:w-auto bg-gradient-to-r from-silver/20 to-silver/10 text-silver/60 border border-silver/20 rounded-lg px-6 py-3 font-semibold cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
                      disabled
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-void border border-accent/30 rounded-xl text-sm text-silver opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 shadow-xl">
                      <div className="text-center">
                        <div className="font-bold text-accent mb-2 text-base">🚧 Staging Server</div>
                        <div className="text-silver/90 leading-relaxed">
                          Deployment-ready, awaiting client UAT approval.<br/>
                          <span className="text-accent font-semibold">Public release coming soon!</span>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-void"></div>
                    </div>
                  </div>
                  <button 
                    className="w-full sm:w-auto bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-void font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/25 flex items-center justify-center gap-2"
                    onClick={() => setShowContactModal(true)}
                  >
                    <Code size={18} />
                    Request Access
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* OTHER PROJECTS */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl sm:text-3xl font-bold text-silver text-center mb-6 sm:mb-8">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {otherProjects.map((project, index) => (
                <motion.a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clean-card p-4 sm:p-6 cursor-pointer group flex flex-col h-full block"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-semibold text-silver mb-2 sm:mb-3 group-hover:text-accent transition-colors text-sm sm:text-base">
                    {project.title}
                  </h4>
                  <p className="text-silver/70 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 sm:px-2 py-1 bg-charcoal rounded text-xs text-silver/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-accent text-xs sm:text-sm group-hover:gap-2 transition-all mt-auto">
                    <span>View Project</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && closeImage()}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col">
            {/* Header with Controls */}
            <div className="flex items-center justify-between mb-4 px-2">
              {/* Zoom Level Indicator */}
              <div className="bg-void/90 border border-accent/40 text-silver px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {Math.round(zoomLevel * 100)}%
              </div>
              
              {/* Control Buttons */}
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-void/90 hover:bg-void border-2 border-accent/40 hover:border-accent text-silver hover:text-accent rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-void/90 hover:bg-void border-2 border-accent/40 hover:border-accent text-silver hover:text-accent rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                  title="Reset Zoom"
                >
                  <RotateCcw size={14} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-void/90 hover:bg-void border-2 border-accent/40 hover:border-accent text-silver hover:text-accent rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                  title="Zoom In"
                >
                  <ZoomIn size={14} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={closeImage}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-void/90 hover:bg-void border-2 border-accent/40 hover:border-accent text-silver hover:text-accent rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                  title="Close"
                >
                  <X size={14} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-charcoal/50 p-4 sm:p-6 w-full flex-1">
              <div 
                className="overflow-auto rounded-lg w-full h-full scrollbar-hide"
                style={{ 
                  cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
              >
                <div className="flex items-center justify-center min-h-full p-4">
                  <img 
                    src={expandedImage} 
                    alt="Expanded System Architecture Diagram"
                    className="max-w-none w-auto h-auto rounded-lg shadow-2xl transition-transform duration-200 object-contain"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                      transformOrigin: 'center center',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center text-silver/60 text-xs sm:text-sm px-4 py-2 mt-2">
              {zoomLevel > 1 ? 'Drag to pan • Scroll to zoom • Scroll image to navigate • Click outside to close' : 'Scroll to zoom • Scroll image to navigate • Click outside to close'}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-charcoal rounded-xl border border-accent/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-silver">
                  Request Project Access
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-silver/60 hover:text-silver transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-void/50 rounded-lg p-4 border border-accent/10">
                  <h4 className="text-lg font-semibold text-silver mb-2">
                    🚧 Why No Live Demo?
                  </h4>
                  <div className="text-silver/80 text-sm space-y-2">
                    <p>This project is currently running on a <strong className="text-accent">staging server</strong> which is also a production server, but it is accessible only to clients and team members. The project has <strong className="text-accent">passed all preliminary tests</strong> and is <strong className="text-accent">deployment-ready</strong>.</p>
                    <p>We're currently waiting for <strong className="text-accent">client approval</strong> as they are running <strong className="text-accent">User Acceptance Testing (UAT)</strong> on their end. <strong className="text-accent">Public release coming soon!</strong></p>
                  </div>
                </div>

                <div className="bg-void/50 rounded-lg p-4 border border-accent/10">
                  <h4 className="text-lg font-semibold text-silver mb-2">
                  Contact Details
                  </h4>
                  <div className="text-silver/80 text-sm space-y-2">
                    <p><strong>Email:</strong> a.bhadani0301@gmail.com</p>
                    <p><strong>Subject:</strong> Project Demo Request - {projects[activeProject]?.title}</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a 
                    href={`mailto:a.bhadani0301@gmail.com?subject=Project Demo Request - ${projects[activeProject]?.title}&body=Hi Anshu,%0A%0AI'm interested in seeing a demo of your ${projects[activeProject]?.title} project.%0A%0APlease let me know when would be a good time for a demo session.%0A%0AThanks!`}
                    className="flex-1 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-void font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/25 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Request Demo Session
                  </a>
                  <button 
                    className="flex-1 bg-transparent border-2 border-accent/30 hover:border-accent text-accent hover:text-accent-light font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 hover:bg-accent/5 flex items-center justify-center gap-2"
                    onClick={() => setShowContactModal(false)}
                  >
                    <X size={18} />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;