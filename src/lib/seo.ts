import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayonbit.me";

export const siteConfig = {
  name: "Ayon Bit",
  url: rawSiteUrl.replace(/\/$/, ""),
  title: "Ayon Bit - Full-Stack Developer",
  titleTemplate: "%s | Ayon Bit",
  description:
    "Ayon Bit is a full-stack developer specializing in React, Next.js, Node.js, MongoDB, Shopify, UI/UX design, and SEO-friendly web applications.",
  ogImage: "/images/opengraph-image.png",
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
          alt: title || siteConfig.title,
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
      },
    ],
  };
}
