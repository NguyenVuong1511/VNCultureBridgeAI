import styles from './Container.module.css';
import Hero from './Hero.jsx';
import AboutSection from './AboutSection.jsx';
import CategorySection from './CategorySection.jsx';
import EthnicGroupSection from './EthnicGroupSection.jsx';
import AIExplainIntro from './AIExplainIntro.jsx';
import Feedback from './Feedback.jsx';
import Contact from './Contact.jsx';
import PlaceSection from './PlaceSection.jsx';
import FeaturedArticles from './FeaturedArticles.jsx';

export default function Container() {
  return (
    <div className={styles.container}>
      <Hero></Hero>
      <AboutSection></AboutSection>
      <FeaturedArticles></FeaturedArticles>
      <CategorySection></CategorySection>
      <PlaceSection></PlaceSection>
      <EthnicGroupSection></EthnicGroupSection>
      <AIExplainIntro></AIExplainIntro>
      <Feedback></Feedback>
      <Contact></Contact>
    </div>
  );
}
