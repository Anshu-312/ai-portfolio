'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, Brain } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. Ask me about Anshu's projects, skills, or AI expertise!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses = {
    'projects': "Anshu has built 8 production AI systems including D.O.S.T (Vedic wisdom chatbot), QA Chatbot API, Drives Nexus AI Agent, and SentinelNLP threat detection framework. All projects are solo-built and 4 are currently in production!",
    'skills': "His expertise spans AI/ML (GPT-4, Mistral 7B, LangChain), Full-Stack Development (Python, FastAPI, React), Databases (PostgreSQL, FAISS, Neo4j), and Automation (N8N, API Integration).",
    'experience': "He's a fresh MCA graduate with 7 months industry experience, having built 8 AI projects solo - 4 academic and 4 in production on staging servers.",
    'contact': "You can reach Anshu through the contact form below or download his resume. He's currently available for premium AI projects and strategic partnerships.",
    'ai': "Anshu specializes in building production-grade AI systems that deliver real business value. From RAG bots to threat detection, he creates intelligent solutions that scale.",
    'resume': "You can download Anshu's resume by clicking the 'Download Resume' button in the About section. It contains his complete technical background and project portfolio.",
    'dost': "D.O.S.T is a Vedic wisdom companion chatbot built with GPT-4 Turbo, FAISS vector database, and FastAPI. It provides empathetic guidance based on psychological frameworks without sounding robotic.",
    'qa': "The QA Chatbot API is a multi-tenant system powered by Mistral 7B via OpenRouter. It features isolated FAISS indexes, Confluence integration, and comprehensive analytics for multiple clients.",
    'sentinel': "SentinelNLP is a cyber threat detection framework using BERT transformers and Neo4j graph database. It's a production-grade prototype for identifying complex threat patterns through ontology-based analysis.",
    'default': "I can help you learn about Anshu's AI projects, technical skills, work experience, or how to contact him. What would you like to know?"
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('dost') || lowerMessage.includes('vedic')) return responses.dost;
    if (lowerMessage.includes('qa') || lowerMessage.includes('chatbot api')) return responses.qa;
    if (lowerMessage.includes('sentinel') || lowerMessage.includes('threat')) return responses.sentinel;
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) return responses.projects;
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) return responses.skills;
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) return responses.experience;
    if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) return responses.contact;
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) return responses.resume;
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) return responses.ai;
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Chat Button */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 bg-accent-gradient rounded-full flex items-center justify-center shadow-2xl z-[9999] group"
        onClick={() => setIsOpen(!isOpen)}
         whileHover={{ 
           scale: 1.05,
           y: -2
         }}
         whileTap={{ scale: 0.95 }}
         animate={{ 
           boxShadow: [
             "0 0 15px rgba(212, 175, 55, 0.3)",
             "0 0 25px rgba(212, 175, 55, 0.5)",
             "0 0 15px rgba(212, 175, 55, 0.3)"
           ]
         }}
         transition={{ 
           boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
           scale: { duration: 0.2 },
           y: { duration: 0.2 }
         }}
        style={{ zIndex: 9999 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="text-void" size={20} />
        </motion.div>
        
         {/* Subtle floating ring around button */}
         <motion.div
           className="absolute inset-0 rounded-full border border-accent/20"
           animate={{
             scale: [1, 1.1, 1],
             opacity: [0.2, 0.4, 0.2]
           }}
           transition={{
             duration: 4,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
        
         {/* Notification dot */}
         {messages.length === 1 && (
           <motion.div
             className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-success rounded-full flex items-center justify-center"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 1, type: "spring", stiffness: 200 }}
           >
             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-void rounded-full"></div>
           </motion.div>
         )}
      </motion.button>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-2 sm:bottom-24 sm:right-6 w-[calc(100vw-1rem)] sm:w-96 max-w-sm sm:max-w-none h-[500px] sm:h-[500px] bg-void/95 backdrop-blur-xl border border-accent/20 rounded-2xl shadow-2xl z-[9998] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ zIndex: 9998 }}
          >
            {/* Enhanced Header */}
            <div className="relative p-4 sm:p-6 border-b border-accent/20 bg-gradient-to-r from-void to-charcoal">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                   <motion.div 
                     className="relative w-10 h-10 sm:w-12 sm:h-12 bg-accent-gradient rounded-full flex items-center justify-center"
                     animate={{ 
                       scale: [1, 1.02, 1],
                       rotate: [0, 1, -1, 0]
                     }}
                     transition={{ 
                       duration: 6, 
                       repeat: Infinity, 
                       ease: "easeInOut" 
                     }}
                   >
                     <Brain className="text-void" size={16} />
                     <motion.div
                       className="absolute inset-0 rounded-full border border-accent/20"
                       animate={{
                         scale: [1, 1.1, 1],
                         opacity: [0.3, 0.6, 0.3]
                       }}
                       transition={{
                         duration: 3,
                         repeat: Infinity,
                         ease: "easeInOut"
                       }}
                     />
                   </motion.div>
                  <div>
                    <h3 className="text-silver font-bold text-base sm:text-lg">AI Assistant</h3>
                    <div className="text-xs text-silver/60 flex items-center gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="hidden sm:inline">Online • Ask about Anshu's work</span>
                      <span className="sm:hidden">Online</span>
                    </div>
                  </div>
                </div>
                 <motion.button
                   onClick={() => setIsOpen(false)}
                   className="text-silver/60 hover:text-silver transition-colors p-2 hover:bg-charcoal rounded-lg"
                   whileHover={{ 
                     scale: 1.05, 
                     rotate: 90,
                     backgroundColor: "rgba(26, 27, 35, 0.8)"
                   }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                 >
                   <X size={20} />
                 </motion.button>
              </div>
            </div>

            {/* Enhanced Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-void to-charcoal/50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ 
                     duration: 0.3, 
                     delay: index * 0.05,
                     ease: [0.25, 0.46, 0.45, 0.94]
                   }}
                >
                  <div className={`flex items-start gap-2 sm:gap-3 max-w-[90%] sm:max-w-[85%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                     <motion.div 
                       className={`flex items-center justify-center ${
                         message.sender === 'user' 
                           ? 'bg-accent text-void' 
                           : 'bg-accent-gradient text-void'
                       }`}
                       style={{ 
                         width: '28px',
                         height: '28px',
                         borderRadius: '50%',
                         minWidth: '28px',
                         minHeight: '28px',
                         flexShrink: 0
                       }}
                       whileHover={{ 
                         scale: 1.1,
                         rotate: message.sender === 'bot' ? [0, -5, 5, 0] : 0
                       }}
                       transition={{ duration: 0.3 }}
                     >
                       {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                     </motion.div>
                     <motion.div 
                       className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                         message.sender === 'user'
                           ? 'bg-accent text-void rounded-br-md'
                           : 'bg-charcoal/80 text-silver rounded-bl-md border border-accent/10'
                       }`}
                       whileHover={{ 
                         scale: 1.01,
                         y: -1
                       }}
                       transition={{ duration: 0.2, ease: "easeOut" }}
                     >
                       <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                       <div className={`text-xs mt-1 ${
                         message.sender === 'user' ? 'text-void/60' : 'text-silver/40'
                       }`}>
                         {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                     </motion.div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                   <div className="flex items-center gap-2 sm:gap-3">
                     <div 
                       className="bg-accent-gradient flex items-center justify-center"
                       style={{ 
                         width: '28px',
                         height: '28px',
                         borderRadius: '50%',
                         minWidth: '28px',
                         minHeight: '28px',
                         flexShrink: 0
                       }}
                     >
                       <Bot className="text-void" size={14} />
                     </div>
                    <div className="bg-charcoal/80 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-bl-md border border-accent/10">
                      <div className="flex space-x-1">
                         <motion.div 
                           className="w-2 h-2 bg-accent rounded-full"
                           animate={{ 
                             scale: [1, 1.3, 1], 
                             opacity: [0.4, 1, 0.4],
                             y: [0, -2, 0]
                           }}
                           transition={{ 
                             duration: 0.8, 
                             repeat: Infinity, 
                             delay: 0,
                             ease: "easeInOut"
                           }}
                         />
                         <motion.div 
                           className="w-2 h-2 bg-accent rounded-full"
                           animate={{ 
                             scale: [1, 1.3, 1], 
                             opacity: [0.4, 1, 0.4],
                             y: [0, -2, 0]
                           }}
                           transition={{ 
                             duration: 0.8, 
                             repeat: Infinity, 
                             delay: 0.2,
                             ease: "easeInOut"
                           }}
                         />
                         <motion.div 
                           className="w-2 h-2 bg-accent rounded-full"
                           animate={{ 
                             scale: [1, 1.3, 1], 
                             opacity: [0.4, 1, 0.4],
                             y: [0, -2, 0]
                           }}
                           transition={{ 
                             duration: 0.8, 
                             repeat: Infinity, 
                             delay: 0.4,
                             ease: "easeInOut"
                           }}
                         />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input */}
            <div className="p-4 sm:p-6 border-t border-accent/20 bg-gradient-to-r from-void to-charcoal">
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about projects, skills..."
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-charcoal/50 border border-accent/20 rounded-xl text-silver placeholder-silver/50 focus:outline-none focus:border-accent focus:bg-charcoal/70 transition-all duration-300 text-xs sm:text-sm"
                  />
                  <motion.div
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
                    animate={{ opacity: inputValue ? 1 : 0.3 }}
                  >
                    <Sparkles className="text-accent" size={14} />
                  </motion.div>
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-3 py-2 sm:px-4 sm:py-3 bg-accent text-void rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-dark transition-all duration-300 flex items-center gap-1 sm:gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send size={14} />
                </motion.button>
              </div>
              
              {/* Quick suggestions */}
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {['Projects', 'Skills', 'Experience', 'Contact'].map((suggestion) => (
                   <motion.button
                     key={suggestion}
                     onClick={() => setInputValue(suggestion.toLowerCase())}
                     className="px-2 py-1 sm:px-3 sm:py-1 bg-charcoal/30 text-silver/70 text-xs rounded-lg hover:bg-accent/20 hover:text-accent transition-all duration-300"
                     whileHover={{ 
                       scale: 1.05,
                       y: -1
                     }}
                     whileTap={{ scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                   >
                     {suggestion}
                   </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;