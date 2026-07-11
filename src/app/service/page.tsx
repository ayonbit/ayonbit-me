export const metadata = createMetadata({
  title: "Services - Web Development, UI/UX, Shopify & More",
  description:
    "Explore Ayon Bit's web development, UI/UX design, Shopify dropshipping, and administrative support services for growing businesses.",
  path: "/service",
  keywords: ["web development services", "Shopify services", "UI UX services"],
});

import { ServiceCard } from "../../components/ServiceCard";
import { serviceData } from "../../lib/data";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  createMetadata,
  jsonLdScript,
  siteConfig,
} from "../../lib/seo";

const ServicePage = () => {
  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web development and digital services by Ayon Bit",
    itemListElement: serviceData.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/service/${service.slug}`),
      item: {
        "@type": "Service",
        name: service.category,
        description: service.description,
        provider: {
          "@id": `${siteConfig.url}/#person`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          collectionPageJsonLd({
            name: "Professional Web Development Services",
            description: metadata.description || "",
            path: "/service",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/service" },
          ]),
          serviceListJsonLd,
        ])}
      />
      <section className="container mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">My Services</h1>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional solutions designed to meet your business requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {serviceData.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              className="hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>

        <div className="text-center mt-8 mb-12 max-w-3xl mx-auto text-white/70">
          <p className="text-sm leading-relaxed">
            I offer professional web development, UI/UX design, Shopify
            dropshipping, and administrative support services. Whether you need
            a custom Next.js application, a responsive website design, a fully
            managed Shopify store, or virtual assistance, I deliver high-quality
            results tailored to your needs. Contact me to discuss how I can help
            bring your project to life.
          </p>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
