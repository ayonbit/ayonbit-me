import dynamic from "next/dynamic";
import { FaEnvelope, FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createMetadata,
  jsonLdScript,
  siteConfig,
} from "../../lib/seo";

export const metadata = createMetadata({
  title: "Contact Ayon Bit",
  description:
    "Contact Ayon Bit for web development, Next.js, React, Shopify, UI/UX, collaboration, and freelance project inquiries.",
  path: "/contact",
  keywords: ["hire web developer", "contact Ayon Bit", "freelance developer"],
});

const ContactForm = dynamic(() => import("../../components/ContactForm"));

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl md:text-2xl" />,
      title: "Email",
      description: "ayonbit@gmail.com",
      link: "mailto:ayonbit@gmail.com",
    },
    {
      icon: <FaWhatsapp className="text-xl md:text-2xl" />,
      title: "WhatsApp",
      description: "+8801686354606",
      link: "https://wa.me/+8801686354606",
    },
    {
      icon: <FaMapMarkedAlt className="text-xl md:text-2xl" />,
      title: "Location",
      description: "Incognito Solution, Bangladesh",
    },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Ayon Bit",
            description: metadata.description || "",
            url: absoluteUrl("/contact"),
            mainEntity: {
              "@id": `${siteConfig.url}/#person`,
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ])}
      />
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Contact Information - Now 50% width on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-6 md:space-y-8">
              <div className="bg-linear-to-r from-accent/10 to-transparent p-6 rounded-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4">
                  Let&apos;s Collaborate
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  I&apos;m available for new projects and would love to hear
                  your ideas. Reach out and I&apos;ll get back to you within 24
                  hours.
                </p>
              </div>

              <ul className="space-y-4 md:space-y-6">
                {contactInfo.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-lg transition-colors duration-200"
                  >
                    <div className="shrink-0 bg-white/5 p-3 rounded-lg text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider mb-1">
                        {item.title}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-base sm:text-lg md:text-xl text-white hover:text-accent transition-colors"
                        >
                          {item.description}
                        </a>
                      ) : (
                        <p className="text-base sm:text-lg md:text-xl text-white">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form - Now 50% width on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 p-6 sm:p-8 rounded-xl border border-white/10 shadow-lg">
              <div className="mb-6 md:mb-8">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                  Send me a message
                </h3>
                <p className="text-white/60">Fill out the form</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
