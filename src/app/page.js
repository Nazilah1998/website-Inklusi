import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import NewsGallery from '@/components/home/NewsGallery';
import Documents from '@/components/home/Documents';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import QuickLinks from '@/components/home/QuickLinks';
import Footer from '@/components/layout/Footer';
import JadwalSholat from '@/components/ui/JadwalSholat';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <JadwalSholat />
      </div>
      <NewsGallery />
      <Documents />
      <ProcessTimeline />
      <QuickLinks />
      <Footer />
    </main>
  );
}
