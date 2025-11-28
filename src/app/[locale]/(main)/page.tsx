import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import WhyUs from "@/components/home/WhyUs";
import PopularTours from "@/components/home/PopularTours";
import RecommendedTreks from "@/components/home/RecommendedTreks";
import AboutPreview from "@/components/home/AboutPreview";
import BlogPreview from "@/components/home/BlogPreview";
import CustomTours from "@/components/home/CustomTours";
import Reviews from "@/components/home/Reviews";
import Partners from "@/components/home/Partners";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <WhyUs />
      <PopularTours />
      <RecommendedTreks />
      <AboutPreview />
      <BlogPreview />
      <CustomTours />
      <Reviews />
      <Partners />
    </main>
  );
}