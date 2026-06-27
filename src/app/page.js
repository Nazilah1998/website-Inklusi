import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import NewsGallery from '@/components/home/NewsGallery';
import Documents from '@/components/home/Documents';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import QuickLinks from '@/components/home/QuickLinks';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <NewsGallery />
      <Documents />
      <ProcessTimeline />
      <QuickLinks />
      <Footer />
    </main>
  );
}
