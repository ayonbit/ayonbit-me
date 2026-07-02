import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageTransition from "../../../components/PageTransition";
import { ServiceHeroSection } from "../../../components/ServiceHero";
import ServiceSlug from "../../../components/ServiceSlug";

import { serviceData } from "../../../lib/data";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createMetadata,
  jsonLdScript,
  siteConfig,
} from "../../../lib/seo";

type ServiceItemType = {
  title: string;
  icon: string;
  description: string[];
};

type ServiceType = {
  slug: string;
  category: string;
  description: string;
  image?: string;
  data: ServiceItemType[];
};

type ServiceSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ServiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = serviceData.find((item: ServiceType) => item.slug === slug);

  if (!service) {
    return createMetadata({
      title: "Service Not Found",
      description: "The service you are looking for does not exist.",
      path: `/service/${slug}`,
      noIndex: true,
    });
  }

  const image = service.image?.startsWith("http")
    ? service.image
    : absoluteUrl(siteConfig.ogImage);

  return createMetadata({
    title: service.category,
    description: service.description,
    path: `/service/${slug}`,
    image,
    keywords: [service.category, `${service.category} services`],
  });
}

const createServiceJsonLd = (service: ServiceType) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.category,
  description: service.description,
  url: absoluteUrl(`/service/${service.slug}`),
  image: service.image?.startsWith("http")
    ? service.image
    : absoluteUrl(siteConfig.ogImage),
  provider: {
    "@id": `${siteConfig.url}/#person`,
  },
  areaServed: "Worldwide",
  serviceType: service.category,
});

const ServiceSlugPage = async ({ params }: ServiceSlugPageProps) => {
  const { slug } = await params;

  const service = serviceData.find((item: ServiceType) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/service" },
            { name: service.category, path: `/service/${service.slug}` },
          ]),
          createServiceJsonLd(service),
        ])}
      />
      <section className="flex min-h-screen flex-col justify-center py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <ServiceHeroSection />

          <ServiceSlug service={service} key={service.slug} />
        </div>
      </section>
    </PageTransition>
  );
};

export default ServiceSlugPage;
