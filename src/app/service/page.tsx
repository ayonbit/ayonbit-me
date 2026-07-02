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

export const metadata = createMetadata({
  title: "Professional Web Development Services",
  description:
    "Explore Ayon Bit's web development, UI/UX design, Shopify dropshipping, and administrative support services for growing businesses.",
  path: "/service",
  keywords: ["web development services", "Shopify services", "UI UX services"],
});

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
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            Professional solutions designed to meet your business requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          {serviceData.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              className="hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ServicePage;
