import Hero from '../components/sections/home/Hero';
import SelectedWork from '../components/sections/home/SelectedWork';
import FeaturedProjects from '../components/sections/home/FeaturedProjects';
import Recognition from '../components/sections/home/Recognition';
import Competencies from '../components/sections/home/Competencies';
import JapaneseSection from '../components/sections/home/JapaneseSection';
import ContactCTA from '../components/sections/home/ContactCTA';

const Home = () => (
  <>
    <Hero />
    <SelectedWork />
    <FeaturedProjects />
    <Recognition />
    <Competencies />
    <JapaneseSection />
    <ContactCTA />
  </>
);

export default Home;
