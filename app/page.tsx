import Categories from "./components/Categories";
import FeaturedEvents from "./components/FeaturedEvents";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
     <Categories/>
     <FeaturedEvents/>
    </main>
  );
}