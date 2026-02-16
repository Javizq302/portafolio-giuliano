import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import StillFrames from './components/StillFrames';
import CreativeCuts from './components/CreativeCuts';
import CreativeCuts2 from './components/CreativeCuts2';
import Gallery from './components/Gallery';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import LiveMoments from './components/LiveMoments';
import FoodMood from './components/FoodMood';
import PersonalBrands from './components/PersonalBrands';
import GradeLab from './components/GradeLab';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
      <Navbar />
      <main className="w-full">
        <Hero />
        <Brands />
        <CreativeCuts />
        <StillFrames />
        <Gallery />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
