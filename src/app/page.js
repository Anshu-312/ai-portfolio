import Navigation from '../components/Navigation.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Projects from '../components/Projects.jsx';
import Skills from '../components/Skills.jsx';
import Blog from '../components/Blog.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import CursorTrail from '../components/CursorTrail.jsx';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <CursorTrail />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
