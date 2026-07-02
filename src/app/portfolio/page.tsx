import PortfolioClient from "../../components/PortfolioClient";
import { projectData } from "../../lib/data";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  createMetadata,
  jsonLdScript,
} from "../../lib/seo";

export const metadata = createMetadata({
  title: "Portfolio Projects",
  description:
    "Explore Ayon Bit's portfolio of responsive websites, e-commerce interfaces, chat apps, dashboards, and full-stack web applications.",
  path: "/portfolio",
  keywords: ["web development portfolio", "Next.js projects", "React projects"],
});

const PortfolioPage = () => {
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ayon Bit portfolio projects",
    itemListElement: projectData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: project.live,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        image: absoluteUrl(project.image),
        url: project.live,
        codeRepository: project.github,
        programmingLanguage: project.stack,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          collectionPageJsonLd({
            name: "Portfolio Projects",
            description: metadata.description || "",
            path: "/portfolio",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
          portfolioJsonLd,
        ])}
      />
      <section className="container mx-auto">
        <PortfolioClient />
      </section>
    </>
  );
};

export default PortfolioPage;
