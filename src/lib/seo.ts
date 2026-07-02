import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me";

export const siteConfig = {
  name: "Ayon Bit",
  url: rawSiteUrl.replace(/\/$/, ""),
  title: "Ayon Bit | Next.js Full-Stack Developer",
  titleTemplate: "%s | Ayon Bit",
  description:
    "Ayon Bit builds fast, SEO-friendly websites, Next.js apps, Shopify stores, and full-stack products for businesses worldwide.",
  ogImage: "/images/opengraph-image.png",
  ogImageAlt: "Ayon Bit full-stack developer portfolio preview",
  locale: "en_US",
  language: "en",
  email: "ayonbit@gmail.com",
  phone: "+8801686354606",
  location: "Bangladesh",
  keywords: [
    "Ayon Bit",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "Shopify Developer",
    "UI UX Designer",
    "Web Developer Bangladesh",
    "Freelance Web Developer",
    "SEO Friendly Web Developer",
  ],
  sameAs: [
    "https://github.com/ayonbit",
    "https://www.facebook.com/ayonbit",
    "https://www.instagram.com/ayonbit",
    "https://x.com/ayonbit",
    "https://www.upwork.com/freelancers/~01810425a438c4f0a7?mp_source=share",
    "https://www.fiverr.com/suprovatbit",
  ],
};

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  keywords = [],
  type = "website",
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const pageUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: title || siteConfig.title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.title,
      description,
      creator: "@ayonbit",
      images: [imageUrl],
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#person`,
    },
  };
}

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        potentialAction: {
          "@type": "ReadAction",
          target: [
            absoluteUrl("/about"),
            absoluteUrl("/service"),
            absoluteUrl("/portfolio"),
            absoluteUrl("/blog"),
            absoluteUrl("/contact"),
          ],
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl("/assets/updateprofile.png"),
        jobTitle: "Full-Stack Developer",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressCountry: "BD",
          addressLocality: siteConfig.location,
        },
        sameAs: siteConfig.sameAs,
        knowsAbout: [
          "Next.js",
          "React",
          "Node.js",
          "MongoDB",
          "Shopify",
          "UI/UX Design",
          "Search Engine Optimization",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Next.js and full-stack web development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Shopify store setup and optimization",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "UI/UX design for web applications",
            },
          },
        ],
      },
    ],
  };
}
