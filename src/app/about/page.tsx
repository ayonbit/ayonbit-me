import { AboutCard } from "../../components/AboutCard";
import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata({
  title: "About Ayon Bit",
  description:
    "Learn about Ayon Bit's full-stack development experience, technical skills, education, e-commerce background, and professional journey.",
  path: "/about",
  keywords: [
    "Bangladeshi Developer",
    "Web Developer in Bangladesh",
    "Bangladeshi Full-Stack Developer",
    "Portfolio Website Developer",
  ],
  type: "profile",
});
const AboutPage = () => {
  return (
    <main className="py-10 md:py-10">
      <section className="container mx-auto px-4">
        <AboutCard />
      </section>
    </main>
  );
};

export default AboutPage;
