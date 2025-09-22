'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MessageCircle, Send, Github, Linkedin, Phone, MapPin, Clock, CheckCircle, PenTool, Award } from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Custom Cloud Icon Component for Qwiklabs/GCP
const CloudIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    <path d="M8 14l4 4 4-4"/>
  </svg>
);

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using the API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      // Show error state instead of alert
      setIsSubmitted(false);
      // You could add a toast notification here instead of alert
      console.log(`Failed to send message: ${error.message}. Please contact me directly at a.bhadani0301@gmail.com`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/anshu-312', color: 'hover:text-accent' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/anshu-bhadani-255b91216', color: 'hover:text-accent' },
    { name: 'X', icon: XIcon, href: 'https://x.com/anshu_031201', color: 'hover:text-accent' },
    { name: 'Qwiklabs', icon: CloudIcon, href: 'https://www.qwiklabs.com/public_profiles/your-profile-id', color: 'hover:text-accent' },
    { name: 'Gmail', icon: Mail, href: 'mailto:a.bhadani0301@gmail.com', color: 'hover:text-accent' }
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

  return (
    <section id="contact" className="section relative">
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
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <div className="inline-flex items-center gap-3 mb-4">
              <MessageCircle className="text-accent" size={32} />
              <h2 className="text-4xl lg:text-5xl font-bold text-silver">
                Let's Build Something Amazing
              </h2>
              <Send className="text-accent" size={32} />
            </div>
            <p className="text-lg text-silver/70 max-w-4xl mx-auto">
              Ready to transform your ideas into intelligent solutions? I specialize in building production-grade AI systems 
              that deliver real business value. Let's discuss how we can create something extraordinary together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* CONTACT INFORMATION */}
            <motion.div className="space-y-6 sm:space-y-8" variants={itemVariants}>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-silver mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <Mail className="text-accent" size={24} />
                  Get in Touch
                </h3>
                <p className="text-silver/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  I'm currently available for high-impact AI projects and strategic partnerships. 
                  Let's discuss how my expertise can accelerate your next breakthrough.
                </p>
              </div>

              {/* CONTACT METHODS */}
              <div className="space-y-3 sm:space-y-4">
                <div className="clean-card p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
                      <Mail className="text-void" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-silver text-sm sm:text-base">Email</h4>
                      <p className="text-silver/70 text-xs sm:text-sm">a.bhadani0301@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="clean-card p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
                      <Clock className="text-void" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-silver text-sm sm:text-base">Response Time</h4>
                      <p className="text-silver/70 text-xs sm:text-sm">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="clean-card p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
                      <MapPin className="text-void" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-silver text-sm sm:text-base">Location</h4>
                      <p className="text-silver/70 text-xs sm:text-sm">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL LINKS */}
              <div className="clean-card p-3 sm:p-4">
                <h4 className="font-semibold text-silver mb-3 sm:mb-4 text-sm sm:text-base">
                  Connect With Me
                </h4>
                <div className="flex gap-2 sm:gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 sm:w-10 sm:h-10 clean-card flex items-center justify-center text-silver/70 transition-all duration-300 ${social.color} hover:scale-105`}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* AVAILABILITY STATUS */}
              <div className="clean-card p-3 sm:p-4 glow">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-2 h-2 bg-accent rounded-full gold-glow pulse"></div>
                  <h4 className="font-semibold text-silver text-sm sm:text-base">Current Status</h4>
                </div>
                <p className="text-silver/80 text-xs sm:text-sm">
                  <span className="text-accent font-semibold">Open for premium AI projects</span> and strategic partnerships. 
                  Currently building next-generation AI systems and seeking high-impact collaborations.
                </p>
              </div>
            </motion.div>

            {/* CONTACT FORM */}
            <motion.div variants={itemVariants} className="flex items-start">
              <div className="clean-card p-6 sm:p-8 glow w-full mt-8 lg:mt-16 flex flex-col justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-silver mb-4 sm:mb-6">
                  Ready to Work Together?
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8 sm:py-12 flex-1 flex flex-col justify-center">
                    <CheckCircle className="text-accent mx-auto mb-3 sm:mb-4" size={48} />
                    <h4 className="text-xl sm:text-2xl font-bold text-silver mb-2">Message Sent!</h4>
                    <p className="text-silver/70 text-sm sm:text-base">I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-silver font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal border border-accent/20 rounded-lg text-silver placeholder-silver/50 focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-silver font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal border border-accent/20 rounded-lg text-silver placeholder-silver/50 focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-silver font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal border border-accent/20 rounded-lg text-silver placeholder-silver/50 focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-silver font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-charcoal border border-accent/20 rounded-lg text-silver placeholder-silver/50 focus:outline-none focus:border-accent transition-colors resize-none text-sm sm:text-base"
                        placeholder="Describe your project requirements, timeline, and budget..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 text-sm sm:text-base sm:text-lg py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-void border-t-accent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;