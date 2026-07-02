import { AboutCard } from "../../components/AboutCard";
import {
  breadcrumbJsonLd,
  createMetadata,
  jsonLdScript,
  siteConfig,
} from "../../lib/seo";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            name: "About Ayon Bit",
            description: metadata.description || "",
            url: `${siteConfig.url}/about`,
            mainEntity: {
              "@id": `${siteConfig.url}/#person`,
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ])}
      />
      <section className="container mx-auto px-4">
        <AboutCard />
      </section>
    </main>
  );
};

export default AboutPage;
