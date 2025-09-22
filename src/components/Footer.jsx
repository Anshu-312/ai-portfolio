import { Github, Linkedin, Mail, Award } from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 20, className = "" }) => (
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
const CloudIcon = ({ size = 20, className = "" }) => (
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

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/anshu-312' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/anshu-bhadani-255b91216' },
    { name: 'X', icon: XIcon, href: 'https://x.com/anshu_031201' },
    { name: 'Qwiklabs', icon: CloudIcon, href: 'https://www.qwiklabs.com/public_profiles/your-profile-id' },
    { name: 'Email', icon: Mail, href: 'mailto:a.bhadani0301@gmail.com' },
  ];

  return (
    <footer className="bg-accent1 border-t border-accent3/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-textPrimary/70 text-sm">
              © 2025 AI Engineer Portfolio. Built with ❤️ by Anshu Bhadani.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-textPrimary/70 hover:text-accent3 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
