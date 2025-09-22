import { Inter, Playfair_Display_SC, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display_SC({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "AI Engineer Portfolio | Anshu Bhadani - AI Solutions Engineer and Product Builder",
  description: "AI Solutions Engineer and Product Builder building intelligent systems from scalable prototype to production deployments. Specializing in RAG systems, machine learning, and AI-powered applications.",
  keywords: [
    "AI Engineer", "Machine Learning Engineer", "Artificial Intelligence", "Deep Learning", 
    "NLP", "Computer Vision", "RAG Systems", "Python Developer", "FastAPI", "React Developer",
    "Next.js", "Product Manager", "AI Consultant", "Machine Learning Consultant",
    "Portfolio", "Anshu Bhadani", "AI Systems", "Production AI", "AI Applications"
  ],
  authors: [{ name: "Anshu Bhadani", url: "https://ai-engineer-portfolio.vercel.app" }],
  creator: "Anshu Bhadani",
  publisher: "Anshu Bhadani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ai-engineer-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Add if needed
    yahoo: "your-yahoo-verification-code", // Add if needed
  },
  openGraph: {
    title: "AI Engineer Portfolio | Anshu Bhadani - AI Solutions Engineer and Product Builder",
    description: "AI Solutions Engineer and Product Builder building intelligent systems from scalable prototype to production deployments. Specializing in RAG systems, machine learning, and AI-powered applications.",
    url: "https://ai-engineer-portfolio.vercel.app",
    siteName: "AI Engineer Portfolio",
    images: [
      {
        url: "https://ai-engineer-portfolio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Engineer Portfolio - Building Minds for Machines | Anshu Bhadani",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineer Portfolio | Anshu Bhadani - AI Solutions Engineer and Product Builder",
    description: "AI Solutions Engineer and Product Builder building intelligent systems from scalable prototype to production deployments. Specializing in RAG systems, machine learning, and AI-powered applications.",
    images: ["https://ai-engineer-portfolio.vercel.app/og-image.jpg"],
    creator: "@your-x-handle", // Add your X handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0C0E1B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Anshu Bhadani",
              "jobTitle": "AI Solutions Engineer and Product Builder",
              "description": "AI Solutions Engineer and Product Builder building intelligent systems from scalable prototype to production deployments.",
              "url": "https://ai-engineer-portfolio.vercel.app",
              "image": "https://ai-engineer-portfolio.vercel.app/og-image.jpg",
              "sameAs": [
                "https://github.com",
                "https://linkedin.com",
                "https://x.com"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Natural Language Processing",
                "Computer Vision",
                "RAG Systems",
                "Python",
                "FastAPI",
                "React",
                "Next.js",
                "Product Management"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "AI Engineer",
                "description": "Building intelligent systems and AI-powered applications"
              },
              "alumniOf": "Galgotias University",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance AI Engineer"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
